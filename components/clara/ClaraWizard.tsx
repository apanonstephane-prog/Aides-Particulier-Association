'use client'

// Diagnostic guidé — gratuit, sans compte, calculé dans le navigateur.
// Questions courtes → droits probables → démarche prioritaire → pièces à réunir.

import { useEffect, useState } from 'react'
import type { Profil, Asso } from '@/lib/agent/aides'
import { runClaraTool, DEMARCHE } from '@/lib/agent/claraLocal'
import { ClaraCardView } from './ClaraCards'
import type { AgentCard } from '@/lib/agent/useAgentChat'

type Kind = 'particulier' | 'association'
const uid = () => Math.random().toString(36).slice(2, 10)

function Chips<T extends string>({ value, onChange, options }: { value: T | undefined; onChange: (v: T) => void; options: [T, string][] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(([v, l]) => (
        <button key={v} type="button" onClick={() => onChange(v)} className={`wchip ${value === v ? 'wchip--on' : ''}`}>{l}</button>
      ))}
    </div>
  )
}

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button type="button" onClick={() => onChange(!value)} className={`wtoggle ${value ? 'wtoggle--on' : ''}`} aria-pressed={value}>
      <span className="wtoggle-dot" /> {label}
    </button>
  )
}

function Q({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5">
      <div>
        <p className="font-semibold text-[#0B1B3A]">{title}</p>
        {hint && <p className="text-xs text-slate-500">{hint}</p>}
      </div>
      {children}
    </div>
  )
}

export default function ClaraWizard({ initialKind, initialProfil, initialAsso }: { initialKind?: Kind; initialProfil?: Profil; initialAsso?: Asso }) {
  const preset = !!(initialProfil || initialAsso)
  const [kind, setKind] = useState<Kind | undefined>(initialKind ?? (initialAsso ? 'association' : initialProfil ? 'particulier' : undefined))
  const [step, setStep] = useState(preset ? 99 : initialKind ? 1 : 0)
  const [p, setP] = useState<Profil>(initialProfil ?? { situation_familiale: 'seul', enfants: 0, ages_enfants: [] })
  const [a, setA] = useState<Asso>(initialAsso ?? { salaries: 0, interet_general: false, recrutement: false })
  const set = (patch: Partial<Profil>) => setP((x) => ({ ...x, ...patch }))

  const steps = kind === 'association' ? 1 : 3
  const canNext =
    step === 1 ? kind === 'association' || (p.situation_familiale && p.age != null) :
    step === 2 ? p.activite && p.revenus_mensuels_foyer != null :
    step === 3 ? !!p.logement : true

  // Résultats calculés localement (synchrones en pratique)
  const [cards, setCards] = useState<AgentCard[]>([])
  const [computedFor, setComputedFor] = useState<string>('')
  const signature = JSON.stringify({ kind, p, a, step })

  async function compute() {
    const out: AgentCard[] = []
    const push = (cs: { kind: string; data: unknown }[]) => cs.forEach((c) => out.push({ id: uid(), kind: c.kind, data: c.data }))
    const ev = kind === 'association'
      ? await runClaraTool('evaluer_association', a as Record<string, unknown>)
      : await runClaraTool('evaluer_situation', p as Record<string, unknown>)
    push(ev.cards)
    const aides = ((ev.cards[0]?.data as { aides?: { id: string; statut: string }[] })?.aides ?? [])
    const ordered = [...aides.filter((x) => x.statut === 'probable'), ...aides.filter((x) => x.statut !== 'probable')]
    const queries = [...new Set(ordered.slice(0, 3).map((x) => DEMARCHE[x.id]?.forms).filter(Boolean))] as string[]
    if (queries.length) {
      const forms = await runClaraTool('trouver_formulaire', { demarche: queries.join(' ') })
      push(forms.cards)
    }
    const dossier = ordered.map((x) => DEMARCHE[x.id]?.pieces).find(Boolean)
    if (dossier) push((await runClaraTool('liste_pieces', { dossier })).cards)
    setCards(out)
    setComputedFor(signature)
  }

  const showResults = step === 99
  useEffect(() => { if (showResults && computedFor !== signature) void compute() }, [showResults, signature]) // eslint-disable-line react-hooks/exhaustive-deps

  const progress = showResults ? 100 : step === 0 ? 0 : Math.round((step / (steps + 1)) * 100)
  const next = () => setStep((s) => (s >= steps ? 99 : s + 1))
  const back = () => setStep((s) => (s === 99 ? steps : Math.max(0, s - 1)))

  const field = 'w-full sm:w-48 px-4 py-2.5 rounded-xl border-[1.5px] border-[#e6e1d7] bg-white text-[#0B1B3A] outline-none focus:border-[#E8962E]'

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="h-1 bg-[#F1ECE3]"><div className="h-full bg-[#E8962E] transition-all duration-500" style={{ width: `${progress}%` }} /></div>

      <div className="flex-1 overflow-y-auto cscroll px-5 sm:px-7 py-6">
        {step === 0 && (
          <div className="space-y-5 cfade">
            <div>
              <p className="ckicker">Diagnostic gratuit · 1 minute</p>
              <h2 className="text-2xl font-extrabold text-[#0B1B3A]">Pour qui cherchez-vous des aides ?</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {([['particulier', '👤', 'Pour moi ou mon foyer', 'Logement, revenus, famille, santé, études…'], ['association', '🏛️', 'Pour une association', 'Subventions, FDVA, mécénat, emploi…']] as const).map(([k, i, t, d]) => (
                <button key={k} onClick={() => { setKind(k); setStep(1) }} className="cprofil !items-start !p-5 flex-col !gap-2">
                  <span className="text-3xl">{i}</span>
                  <span className="font-bold text-[#0B1B3A]">{t}</span>
                  <span className="text-sm text-slate-500">{d}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400">Vos réponses restent dans votre navigateur : rien n’est envoyé ni enregistré.</p>
          </div>
        )}

        {step === 1 && kind === 'particulier' && (
          <div className="space-y-6 cfade">
            <h2 className="text-xl font-extrabold text-[#0B1B3A]">Votre foyer</h2>
            <Q title="Vous vivez…"><Chips value={p.situation_familiale} onChange={(v) => set({ situation_familiale: v })} options={[['seul', 'Seul(e)'], ['couple', 'En couple']]} /></Q>
            <Q title="Votre âge"><input type="number" min={16} max={110} inputMode="numeric" value={p.age ?? ''} onChange={(e) => set({ age: e.target.value ? Number(e.target.value) : undefined })} className={field} placeholder="Ex. 34" /></Q>
            <Q title="Enfants à charge">
              <Chips value={String(Math.min(p.enfants ?? 0, 4))} onChange={(v) => { const n = Number(v); set({ enfants: n, ages_enfants: (p.ages_enfants ?? []).slice(0, n).concat(Array(Math.max(0, n - (p.ages_enfants?.length ?? 0))).fill(5)) }) }} options={[['0', 'Aucun'], ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4 et +']]} />
            </Q>
            {(p.enfants ?? 0) > 0 && (
              <Q title="Âge des enfants" hint="Utile pour la rentrée scolaire et la petite enfance">
                <div className="flex flex-wrap gap-2">
                  {(p.ages_enfants ?? []).map((ag, i) => (
                    <input key={i} type="number" min={0} max={25} value={ag} onChange={(e) => { const arr = [...(p.ages_enfants ?? [])]; arr[i] = Number(e.target.value); set({ ages_enfants: arr }) }} className="w-20 px-3 py-2 rounded-xl border-[1.5px] border-[#e6e1d7] text-center" aria-label={`Âge enfant ${i + 1}`} />
                  ))}
                </div>
              </Q>
            )}
          </div>
        )}

        {step === 1 && kind === 'association' && (
          <div className="space-y-6 cfade">
            <h2 className="text-xl font-extrabold text-[#0B1B3A]">Votre association</h2>
            <Q title="Nombre de salariés"><input type="number" min={0} value={a.salaries ?? 0} onChange={(e) => setA({ ...a, salaries: Number(e.target.value) })} className={field} /></Q>
            <div className="flex flex-wrap gap-2">
              <Toggle value={!!a.interet_general} onChange={(v) => setA({ ...a, interet_general: v })} label="Reconnue d’intérêt général" />
              <Toggle value={!!a.recrutement} onChange={(v) => setA({ ...a, recrutement: v })} label="Projet de recrutement" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 cfade">
            <h2 className="text-xl font-extrabold text-[#0B1B3A]">Activité et revenus</h2>
            <Q title="Votre situation principale">
              <Chips value={p.activite} onChange={(v) => set({ activite: v })} options={[['salarie', 'Salarié(e)'], ['independant', 'Indépendant(e)'], ['sans_emploi', 'Sans emploi'], ['etudiant', 'Étudiant(e)'], ['retraite', 'Retraité(e)'], ['autre', 'Autre']]} />
            </Q>
            {p.activite === 'sans_emploi' && <Toggle value={!!p.inscrit_france_travail} onChange={(v) => set({ inscrit_france_travail: v })} label="Inscrit(e) à France Travail" />}
            <Q title="Revenus nets du foyer, par mois" hint="Un ordre de grandeur suffit (salaires, allocations, pensions)">
              <div className="flex items-center gap-4">
                <input type="range" min={0} max={5000} step={50} value={p.revenus_mensuels_foyer ?? 1500} onChange={(e) => set({ revenus_mensuels_foyer: Number(e.target.value) })} className="flex-1 accent-[#E8962E]" aria-label="Revenus mensuels" />
                <span className="w-28 text-right font-bold text-[#0B1B3A] tabular-nums">{p.revenus_mensuels_foyer == null ? '—' : `${(p.revenus_mensuels_foyer).toLocaleString('fr-FR')} €${p.revenus_mensuels_foyer >= 5000 ? '+' : ''}`}</span>
              </div>
            </Q>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 cfade">
            <h2 className="text-xl font-extrabold text-[#0B1B3A]">Logement et santé</h2>
            <Q title="Votre logement">
              <Chips value={p.logement} onChange={(v) => set({ logement: v })} options={[['locataire', 'Locataire'], ['proprietaire_credit', 'Propriétaire avec crédit'], ['proprietaire', 'Propriétaire'], ['heberge', 'Hébergé(e)']]} />
            </Q>
            <div className="flex flex-wrap gap-2">
              <Toggle value={!!p.handicap} onChange={(v) => set({ handicap: v })} label="Situation de handicap dans le foyer" />
              {(p.age ?? 0) >= 60 && <Toggle value={!!p.perte_autonomie} onChange={(v) => set({ perte_autonomie: v })} label="Perte d’autonomie" />}
            </div>
          </div>
        )}

        {showResults && (
          <div className="space-y-4 cfade">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-extrabold text-[#0B1B3A]">Vos résultats</h2>
              <button onClick={() => setStep(kind ? 1 : 0)} className="text-sm font-semibold text-[#B8691A] hover:underline">Modifier mes réponses</button>
            </div>
            {cards.map((c) => <ClaraCardView key={c.id} card={c} />)}
            <p className="text-xs text-slate-400">Orientation indicative, calculée sur votre appareil. Les montants exacts et la décision relèvent de l’organisme compétent : utilisez les simulateurs officiels.</p>
          </div>
        )}
      </div>

      {step > 0 && !showResults && (
        <div className="flex items-center justify-between gap-3 px-5 sm:px-7 py-4 border-t border-[#0B1B3A]/8 bg-white/70">
          <button onClick={back} className="text-sm font-semibold text-slate-500 hover:text-[#0B1B3A] px-3 py-2">← Retour</button>
          <span className="text-xs text-slate-400">Étape {step} sur {steps}</span>
          <button onClick={next} disabled={!canNext} className="px-6 py-3 rounded-xl bg-[#0B1B3A] text-white font-bold disabled:opacity-30 hover:bg-[#1F3B73] transition">
            {step >= steps ? 'Voir mes aides →' : 'Continuer →'}
          </button>
        </div>
      )}
    </div>
  )
}
