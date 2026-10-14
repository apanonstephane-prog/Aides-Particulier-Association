'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useAgentChat } from '@/lib/agent/useAgentChat'
import { ClaraCardView } from '@/components/clara/ClaraCards'
import { VISUALS } from '@/lib/visuals'

const WELCOME =
  "Bonjour, je suis **Clara**. En quelques questions, je repère les aides auxquelles vous avez probablement droit, je vérifie les montants sur les sites officiels et je vous prépare la démarche.\n\nRacontez-moi votre situation avec vos mots — ou choisissez un profil à côté."

const PROFILS = [
  { img: VISUALS.hero, titre: 'Famille', texte: "Nous sommes un couple avec 2 enfants (4 et 9 ans), locataires, environ 2 400 € nets par mois à deux. À quoi avons-nous droit ?" },
  { img: VISUALS.etudiant, titre: 'Étudiant', texte: "J'ai 20 ans, je suis étudiant à Toulouse, locataire d'un studio, je travaille 10 h par semaine (environ 450 € par mois). Quelles aides ?" },
  { img: VISUALS.senior, titre: 'Senior', texte: "Ma grand-mère a 82 ans, vit seule chez elle avec 1 050 € de retraite et a du mal à se déplacer. Quelles aides pour elle ?" },
  { img: VISUALS.association, titre: 'Association', texte: "Nous sommes une association loi 1901 d'aide aux devoirs, sans salarié, reconnue d'intérêt général. Quels financements demander ?" },
]

export default function ClaraStudio() {
  const params = useSearchParams()
  const chat = useAgentChat('/api/conseil', { welcome: WELCOME })
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const q = params.get('q')
    if (q && !started.current) { started.current = true; chat.send(q) }
  }, [params, chat])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [chat.messages])

  const submit = (t: string) => { if (t.trim() && !chat.loading) { chat.send(t); setInput('') } }
  const fresh = chat.messages.filter((m) => !m.local).length === 0

  return (
    <div className="min-h-screen bg-[#FBF7F0] pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 grid lg:grid-cols-[1fr_340px] gap-8">
        {/* ── Conversation ─────────────────────────────────────────── */}
        <section className="cshell">
          <header className="flex items-center gap-3 px-5 sm:px-6 py-4 border-b border-[#0B1B3A]/8">
            <div className={`cavatar ${chat.loading ? 'cavatar--live' : ''}`}>
              <Image src={VISUALS.clara} alt="" width={96} height={96} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-[#0B1B3A] leading-tight">Clara · conseillère aides & démarches</h1>
              <p className="text-xs text-slate-500">Vérifie sur service-public.fr, caf.fr, ameli.fr… en direct</p>
            </div>
            <button onClick={chat.reset} className="text-xs font-semibold text-slate-500 hover:text-[#0B1B3A] px-3 py-1.5 rounded-lg hover:bg-[#0B1B3A]/5">Recommencer</button>
          </header>

          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6 cscroll">
            {chat.messages.map((m) =>
              m.role === 'user' ? (
                <div key={m.id} className="flex justify-end cfade"><div className="cuser">{m.content}</div></div>
              ) : (
                <div key={m.id} className="flex gap-3 cfade">
                  <div className="cavatar cavatar--sm"><Image src={VISUALS.clara} alt="" width={64} height={64} className="w-full h-full object-cover" /></div>
                  <div className="flex-1 min-w-0 space-y-3">
                    {m.tools.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {m.tools.map((t) => (
                          <span key={t.id} className={`ctool ctool--${t.status}`}>
                            {t.status === 'running' ? <span className="cspin" /> : t.status === 'ok' ? '✓' : '!'} {t.label}
                          </span>
                        ))}
                      </div>
                    )}
                    {m.content && (
                      <div className="cmd">
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: (p) => <a {...p} target="_blank" rel="noopener noreferrer" /> }}>{m.content}</ReactMarkdown>
                        {m.streaming && <span className="ccaret" />}
                      </div>
                    )}
                    {!m.content && m.streaming && m.tools.length === 0 && <div className="flex gap-1 py-2"><span className="cdot" /><span className="cdot" /><span className="cdot" /></div>}
                    {m.cards.map((c) => <ClaraCardView key={c.id} card={c} />)}
                    {m.sources.length > 0 && (
                      <div className="csources">
                        <span>Vérifié sur</span>
                        {m.sources.map((s) => <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" title={s.title}>{new URL(s.url).hostname.replace('www.', '')}</a>)}
                      </div>
                    )}
                    {m.error && <p className="cerror">⚠️ {m.error}</p>}
                  </div>
                </div>
              ),
            )}
            {fresh && (
              <div className="grid sm:grid-cols-2 gap-3 pt-2 lg:hidden">
                {PROFILS.map((p) => <ProfilCard key={p.titre} p={p} onPick={submit} />)}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); submit(input) }} className="p-3 sm:p-4 border-t border-[#0B1B3A]/8 bg-white/70">
            <div className="ccomposer">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(input) } }}
                rows={1}
                placeholder="Décrivez votre situation : famille, travail, logement, revenus…"
                className="flex-1 bg-transparent resize-none outline-none text-[15px] text-[#0B1B3A] placeholder:text-slate-400 py-2 max-h-36"
                aria-label="Votre message à Clara"
              />
              {chat.loading
                ? <button type="button" onClick={chat.stop} className="csend csend--stop" aria-label="Arrêter">■</button>
                : <button type="submit" disabled={!input.trim()} className="csend" aria-label="Envoyer">↑</button>}
            </div>
            <p className="text-[11px] text-slate-400 text-center mt-2">Ne partagez jamais votre n° de sécurité sociale, RIB ou mot de passe. Pré-diagnostic indicatif, non contractuel.</p>
          </form>
        </section>

        {/* ── Colonne profils & garanties ─────────────────────────── */}
        <aside className="hidden lg:flex flex-col gap-5 lg:sticky lg:top-24 self-start">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl shadow-[#0B1B3A]/15">
            <Image src={VISUALS.clara} alt="Des formulaires qui se transforment en chemin lumineux" fill sizes="340px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A] via-[#0B1B3A]/20 to-transparent" />
            <div className="absolute bottom-0 p-5 text-white">
              <p className="text-xs uppercase tracking-[0.18em] text-[#F2B55F] font-semibold">Comment ça marche</p>
              <p className="font-bold text-lg leading-snug mt-1">Situation → droits probables → montants vérifiés → dossier prêt</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 mb-3">Commencer avec un exemple</p>
            <div className="grid gap-2.5">
              {PROFILS.map((p) => <ProfilCard key={p.titre} p={p} onPick={submit} compact />)}
            </div>
          </div>
          <ul className="text-[13px] text-slate-600 space-y-2 bg-white rounded-2xl p-4 ring-1 ring-[#0B1B3A]/8">
            <li className="flex gap-2"><span>🔒</span>Aucune inscription · conversation non enregistrée par Aides Connect (traitée par l’IA Claude d’Anthropic)</li>
            <li className="flex gap-2"><span>🏛️</span>Recherches limitées aux sites publics officiels</li>
            <li className="flex gap-2"><span>⚖️</span>Orientation, pas décision : l’organisme tranche</li>
          </ul>
        </aside>
      </div>
    </div>
  )
}

function ProfilCard({ p, onPick, compact }: { p: (typeof PROFILS)[number]; onPick: (t: string) => void; compact?: boolean }) {
  return (
    <button onClick={() => onPick(p.texte)} className="cprofil group text-left">
      <div className={`relative ${compact ? 'w-16 h-16' : 'w-20 h-20'} rounded-xl overflow-hidden flex-shrink-0`}>
        <Image src={p.img} alt="" fill sizes="80px" className="object-cover group-hover:scale-110 transition duration-500" />
      </div>
      <div className="min-w-0">
        <p className="font-semibold text-[#0B1B3A] text-sm">{p.titre}</p>
        <p className="text-xs text-slate-500 line-clamp-2 leading-snug mt-0.5">{p.texte}</p>
      </div>
    </button>
  )
}
