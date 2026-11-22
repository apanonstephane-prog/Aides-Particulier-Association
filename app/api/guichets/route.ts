// Annuaire officiel DILA + API Découpage administratif. Aucune clé, aucune IA.
import { NextResponse } from 'next/server'

type Commune = { nom: string; code: string; codeDepartement: string; codesPostaux?: string[] }
const GEO = 'https://geo.api.gouv.fr/communes'
const DIRECTORY = 'https://api-lannuaire.service-public.gouv.fr/api/explore/v2.1/catalog/datasets/api-lannuaire-administration/records'
const fields = 'nom,code,codeDepartement,codesPostaux'
const normalize = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/[-’']/g, ' ').trim()
const parseArray = (value: unknown): Record<string, unknown>[] => {
  try { const a = typeof value === 'string' ? JSON.parse(value) : value; return Array.isArray(a) ? a.filter(x => !!x && typeof x === 'object') : [] }
  catch { return [] }
}
const str = (v: unknown) => typeof v === 'string' ? v : ''
const validCode = (s: string) => /^(?:\d{5}|2[AB]\d{3})$/.test(s)
const officialLink = (s: unknown) => {
  try { const u = new URL(str(s)); return u.protocol === 'https:' && u.hostname === 'lannuaire.service-public.gouv.fr' ? u.href : '' }
  catch { return '' }
}

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams
  const code = (params.get('code') ?? '').toUpperCase().trim()
  const q = (params.get('q') ?? '').trim()
  if ((!code && !/^(?:\d{5}|[\p{L}\p{M}\s'’\-]{2,60})$/u.test(q)) || (code && !validCode(code))) return NextResponse.json({ error: 'Indiquez uniquement le nom de la commune ou son code postal.' }, { status: 400 })
  try {
    const geoParams = new URLSearchParams({ fields, boost: 'population', limit: '8', ...( /^\d{5}$/.test(q) ? { codePostal: q } : { nom: q }) })
    const geoUrl = code ? `${GEO}/${encodeURIComponent(code)}?fields=${fields}` : `${GEO}?${geoParams}`
    const g = await fetch(geoUrl, { signal: AbortSignal.timeout(8000), next: { revalidate: 86400 } })
    if (!g.ok) throw new Error('geo')
    const raw = await g.json()
    const choices: Commune[] = (code ? [raw] : Array.isArray(raw) ? raw : []).filter((x: Commune) => typeof x?.nom === 'string' && validCode(x.code))
    if (!choices.length) return NextResponse.json({ error: 'Commune introuvable. Vérifiez le nom ou le code postal.' }, { status: 404 })
    let municipality: Commune | undefined
    if (code) municipality = choices[0]
    else {
      const exact = choices.filter(c => normalize(c.nom) === normalize(q))
      if (exact.length === 1) municipality = exact[0]
      else if (choices.length === 1) municipality = choices[0]
      else return NextResponse.json({ choices })
    }
    if (!municipality) return NextResponse.json({ choices })
    const dparams = new URLSearchParams({ where: `code_insee_commune="${municipality.code}" AND (nom LIKE "France services%" OR nom LIKE "Centre communal%" OR nom LIKE "Mairie%" OR nom LIKE "Centre intercommunal%")`, select: 'nom,adresse,telephone,url_service_public,date_modification_datetime', limit: '20' })
    const d = await fetch(`${DIRECTORY}?${dparams}`, { signal: AbortSignal.timeout(8000), next: { revalidate: 3600 } })
    if (!d.ok) throw new Error('directory')
    const records = await d.json() as { results?: Record<string, unknown>[] }
    const services = (records.results ?? []).map(row => {
      const address = parseArray(row.adresse)[0] ?? {}
      const tel = parseArray(row.telephone)[0] ?? {}
      const name = str(row.nom)
      const url = officialLink(row.url_service_public)
      return { name, type: name.toLowerCase().startsWith('france services') ? 'France services' : /communal|intercommunal/i.test(name) ? 'Action sociale' : 'Mairie', address: [address.numero_voie, address.code_postal, address.nom_commune].map(str).filter(Boolean).join(' · '), phone: str(tel.valeur), url, updated: str(row.date_modification_datetime) }
    }).filter(x => /^(?:france services|mairie|centre communal|centre intercommunal)/i.test(x.name) && x.url)
    return NextResponse.json({ municipality, services, source: 'Annuaire de l’administration, DILA / Service Public', fetchedAt: new Date().toISOString() })
  } catch {
    return NextResponse.json({ error: 'L’annuaire officiel est momentanément indisponible. Consultez le lien de recherche officiel ci-dessous.' }, { status: 503 })
  }
}
