'use client'

import { useState } from 'react'

type Commune = { nom: string; code: string; codeDepartement: string; codesPostaux?: string[] }
type Service = { name: string; type: string; address: string; phone: string; url: string; updated: string }
type Result = { municipality?: Commune; services?: Service[]; choices?: Commune[]; error?: string; fetchedAt?: string }

export default function ObsidianServiceFinder({ theme }: { theme: 'jules' | 'clara' }) {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  async function search(code?: string) {
    if (loading || (!code && !query.trim())) return
    setLoading(true); setResult(null)
    try {
      const res = await fetch('/api/guichets?' + new URLSearchParams(code ? { code } : { q: query.trim() }))
      const data = await res.json() as Result
      setResult(data)
    } catch { setResult({ error: 'Connexion indisponible. Réessayez ou ouvrez l’annuaire officiel.' }) }
    finally { setLoading(false) }
  }
  return <div className={'ob-directory ob-directory--' + theme}>
    <form className="ob-dir-form" onSubmit={e => { e.preventDefault(); void search() }}>
      <label htmlFor="ob-commune">Commune ou code postal</label>
      <div className="ob-dir-input"><input id="ob-commune" value={query} onChange={e => setQuery(e.target.value)} maxLength={60} placeholder="Ex. Toulouse, 32600…" required autoComplete="off"/><button type="submit" disabled={loading || !query.trim()}>{loading ? 'Recherche…' : 'Trouver les guichets →'}</button></div>
      <p>Recherche publique par commune uniquement. Ne saisissez pas votre adresse personnelle.</p>
    </form>
    <div aria-live="polite" className="ob-dir-results">
      {loading && <p role="status">Interrogation de l’annuaire officiel en cours…</p>}
      {result?.error && <p role="alert">{result.error}</p>}
      {result?.choices && <div className="ob-dir-choices"><h2>Quelle commune recherchez-vous ?</h2>{result.choices.map(c => <button type="button" key={c.code} onClick={() => void search(c.code)}>{c.nom} · {c.codeDepartement} {c.codesPostaux?.[0] && `(${c.codesPostaux[0]})`} →</button>)}</div>}
      {result?.municipality && <><div className="ob-dir-result-head"><h2>{result.municipality.nom} · {result.municipality.codeDepartement}</h2><span>{result.services?.length ?? 0} fiche(s) officielle(s)</span></div>
        {!result.services?.length && <p>Aucun guichet correspondant n’est répertorié dans cette commune. Consultez les sites officiels ci-dessous pour élargir la recherche autour de vous.</p>}
        <div className="ob-dir-grid">{result.services?.map(s => <article key={s.url} className="ob-dir-card"><span className="ob-dir-type">{s.type}</span><h3>{s.name}</h3>{s.address && <p>{s.address}</p>}{s.phone && <p>Tél. {s.phone}</p>}<a href={s.url} target="_blank" rel="noreferrer noopener">Coordonnées et horaires officiels ↗</a></article>)}</div>
        <p className="ob-dir-source">Source : annuaire de l’administration (DILA), interrogé {result.fetchedAt && new Date(result.fetchedAt).toLocaleDateString('fr-FR')}. Horaires à confirmer sur la fiche officielle.</p></>}
      {!result && !loading && <p>Retrouvez les France services, mairies et centres communaux d’action sociale répertoriés dans votre commune.</p>}
    </div>
    <div className="ob-dir-links"><a href="https://lannuaire.service-public.gouv.fr/" target="_blank" rel="noopener noreferrer">Annuaire Service Public ↗</a><a href="https://www.france-services.gouv.fr/" target="_blank" rel="noopener noreferrer">Trouver un France services ↗</a></div>
  </div>
}
