'use client'

// Cartes produites par les outils de Clara : éligibilité, formulaires, pièces.

import { useEffect, useState } from 'react'
import type { AgentCard } from '@/lib/agent/useAgentChat'

type Statut = 'probable' | 'a_verifier' | 'peu_probable'
interface Aide { id: string; nom: string; organisme: string; categorie: string; statut: Statut; raisons: string[]; info: string; simulateur?: string }
interface Form { nom: string; ref: string; url: string }

const STATUT: Record<Statut, { label: string; cls: string; dot: string }> = {
  probable: { label: 'Droit probable', cls: 'bg-emerald-50 text-emerald-800 ring-emerald-200', dot: 'bg-emerald-500' },
  a_verifier: { label: 'À vérifier', cls: 'bg-amber-50 text-amber-800 ring-amber-200', dot: 'bg-amber-500' },
  peu_probable: { label: 'Peu probable', cls: 'bg-slate-100 text-slate-600 ring-slate-200', dot: 'bg-slate-400' },
}

const CAT_ICON: Record<string, string> = {
  Revenus: '💶', Logement: '🏠', Santé: '🩺', Famille: '👨‍👩‍👧', Handicap: '♿', Études: '🎓', Énergie: '⚡', Emploi: '💼', Retraite: '🧓', Autonomie: '🤝',
  'Fonctionnement / projets': '🏛️', Projets: '📁', 'Financement privé': '🤲', 'Ressources humaines': '🙋', 'Emploi associatif': '💼',
}

export function ClaraCardView({ card }: { card: AgentCard }) {
  switch (card.kind) {
    case 'eligibility': return <EligibilityCard data={card.data as { aides: Aide[]; association?: boolean }} />
    case 'forms': return <FormsCard data={card.data as { forms: Form[] }} />
    case 'checklist': return <Checklist data={card.data as { titre: string; pieces: string[] }} />
  }
  return null
}

function EligibilityCard({ data }: { data: { aides: Aide[]; association?: boolean } }) {
  const probables = data.aides.filter((a) => a.statut === 'probable').length
  if (!data.aides.length) {
    return <div className="ccard"><p className="text-sm text-slate-600">Aucune aide nationale évidente avec ces éléments. Les aides locales (CCAS, département, Région) restent à explorer.</p></div>
  }
  return (
    <div className="ccard">
      <div className="flex items-end justify-between gap-3 mb-4">
        <div>
          <p className="ckicker">Pré-diagnostic {data.association ? 'association' : ''}</p>
          <p className="text-xl font-bold text-[#0B1B3A] leading-tight">
            {probables} droit{probables > 1 ? 's' : ''} probable{probables > 1 ? 's' : ''}
            <span className="text-slate-400 font-medium"> · {data.aides.length - probables} à vérifier</span>
          </p>
        </div>
        <div className="cmeter" aria-hidden>
          {data.aides.map((a) => <span key={a.id} className={STATUT[a.statut].dot} />)}
        </div>
      </div>
      <div className="grid gap-2.5">
        {data.aides.map((a, i) => (
          <details key={a.id} className="caide group" open={i === 0} style={{ animationDelay: `${i * 60}ms` }}>
            <summary>
              <span className="caide-icon">{CAT_ICON[a.categorie] ?? '📌'}</span>
              <span className="flex-1 min-w-0">
                <span className="block font-semibold text-[#0B1B3A] text-[15px] leading-snug">{a.nom}</span>
                <span className="block text-xs text-slate-500">{a.organisme}</span>
              </span>
              <span className={`cbadge ring-1 ${STATUT[a.statut].cls}`}>{STATUT[a.statut].label}</span>
            </summary>
            <div className="pl-12 pr-2 pb-3 pt-1">
              <ul className="space-y-1 text-[13.5px] text-slate-600">
                {a.raisons.map((r) => <li key={r} className="flex gap-2"><span className="text-[#E8962E]">›</span>{r}</li>)}
              </ul>
              <div className="flex flex-wrap gap-2 mt-3">
                <a href={a.info} target="_blank" rel="noopener noreferrer" className="clink">Fiche officielle ↗</a>
                {a.simulateur && <a href={a.simulateur} target="_blank" rel="noopener noreferrer" className="clink clink--solid">Simuler mon montant ↗</a>}
              </div>
            </div>
          </details>
        ))}
      </div>
      <p className="text-[11px] text-slate-400 mt-4">Orientation indicative. La décision appartient à l’organisme compétent.</p>
    </div>
  )
}

function FormsCard({ data }: { data: { forms: Form[] } }) {
  return (
    <div className="ccard">
      <p className="ckicker">Formulaires officiels</p>
      <div className="grid gap-2 mt-2">
        {data.forms.map((f) => (
          <a key={f.url} href={f.url} target="_blank" rel="noopener noreferrer" className="cform">
            <span className="w-10 h-10 rounded-xl bg-[#0B1B3A] text-white grid place-items-center text-lg flex-shrink-0">📄</span>
            <span className="flex-1 min-w-0">
              <span className="block font-semibold text-[#0B1B3A] text-sm">{f.nom}</span>
              <span className="block text-xs text-slate-500">{f.ref}</span>
            </span>
            <span className="text-[#E8962E] font-bold">↗</span>
          </a>
        ))}
      </div>
    </div>
  )
}

function Checklist({ data }: { data: { titre: string; pieces: string[] } }) {
  const key = `aides-checklist:${data.titre}`
  const [done, setDone] = useState<Record<number, boolean>>({})
  useEffect(() => {
    try { const raw = localStorage.getItem(key); if (raw) setDone(JSON.parse(raw)) } catch { /* stockage indisponible */ }
  }, [key])
  const toggle = (i: number) => setDone((d) => {
    const next = { ...d, [i]: !d[i] }
    try { localStorage.setItem(key, JSON.stringify(next)) } catch { /* ignore */ }
    return next
  })
  const n = Object.values(done).filter(Boolean).length
  const pct = Math.round((n / data.pieces.length) * 100)
  return (
    <div className="ccard">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="ckicker">Pièces à préparer</p>
          <p className="font-bold text-[#0B1B3A]">{data.titre}</p>
        </div>
        <div className="cring" style={{ ['--p' as string]: `${pct}%` }}><span>{n}/{data.pieces.length}</span></div>
      </div>
      <ul className="mt-4 grid gap-1.5">
        {data.pieces.map((p, i) => (
          <li key={p}>
            <label className={`ccheck ${done[i] ? 'ccheck--done' : ''}`}>
              <input type="checkbox" checked={!!done[i]} onChange={() => toggle(i)} />
              <span className="cbox">✓</span>
              <span>{p}</span>
            </label>
          </li>
        ))}
      </ul>
      {pct === 100 && <p className="mt-3 text-sm font-semibold text-emerald-700">Dossier complet — vous pouvez déposer votre demande. 🎉</p>}
    </div>
  )
}
