'use client'

// Clara — diagnostic guidé (gratuit), démonstrations rejouées,
// et conversation en direct si l'agent est activé.

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useAgentChat, type AgentMessage } from '@/lib/agent/useAgentChat'
import { useDemoPlayer } from '@/lib/agent/demoPlayer'
import { runClaraTool, CLARA_DEMOS, PROFILS } from '@/lib/agent/claraLocal'
import { AGENT_LIVE } from '@/lib/agent/flags'
import { ClaraCardView } from '@/components/clara/ClaraCards'
import ClaraWizard from '@/components/clara/ClaraWizard'
import { VISUALS } from '@/lib/visuals'

const WELCOME =
  "Bonjour, je suis **Clara**. Racontez-moi votre situation avec vos mots : je repère vos droits probables, je vérifie les montants sur les sites officiels et je prépare votre démarche."

const PROFIL_IMG: Record<string, string> = { famille: VISUALS.hero, etudiant: VISUALS.etudiant, senior: VISUALS.senior, association: VISUALS.association }

type Mode = 'diagnostic' | 'demo' | 'live'

export default function ClaraStudio() {
  const params = useSearchParams()
  const chat = useAgentChat('/api/conseil', { welcome: WELCOME })
  const demo = useDemoPlayer(runClaraTool)
  const [mode, setMode] = useState<Mode>(params.get('demo') ? 'demo' : AGENT_LIVE && params.get('q') ? 'live' : 'diagnostic')
  const [demoId, setDemoId] = useState<string | null>(null)
  const [wizardKey, setWizardKey] = useState(0)
  const [preset, setPreset] = useState<string | null>(params.get('profil'))
  const started = useRef(false)

  const playDemo = (id: string) => {
    const s = CLARA_DEMOS.find((d) => d.id === id) ?? CLARA_DEMOS[0]
    setMode('demo'); setDemoId(s.id); demo.play(s)
  }

  useEffect(() => {
    if (started.current) return
    started.current = true
    const d = params.get('demo')
    if (d) { setTimeout(() => playDemo(d), 0); return }
    const q = params.get('q')
    if (q && AGENT_LIVE) chat.send(q)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pickProfil = (id: string) => { setPreset(id); setWizardKey((k) => k + 1); setMode('diagnostic'); demo.stop() }
  const presetProfil = PROFILS.find((p) => p.id === preset)
  const kindParam = params.get('type')

  const modes: { id: Mode; label: string }[] = [
    { id: 'diagnostic', label: 'Diagnostic guidé' },
    { id: 'demo', label: 'Clara en action' },
    ...(AGENT_LIVE ? [{ id: 'live' as Mode, label: 'Discuter' }] : []),
  ]

  return (
    <div className="min-h-screen bg-[#FBF7F0] pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10 grid lg:grid-cols-[1fr_340px] gap-8">
        <section className="cshell">
          <header className="flex flex-wrap items-center gap-3 px-5 sm:px-6 py-4 border-b border-[#0B1B3A]/8">
            <div className={`cavatar ${chat.loading || demo.playing ? 'cavatar--live' : ''}`}>
              <Image src={VISUALS.clara} alt="" width={96} height={96} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-[#0B1B3A] leading-tight">Clara · aides & démarches</h1>
              <p className="text-xs text-slate-500">Gratuit · sans compte · liens vers les sources officielles</p>
            </div>
            <div className="flex w-full sm:w-auto gap-1 p-1 rounded-xl bg-[#F3EEE5]">
              {modes.map((m) => (
                <button key={m.id} onClick={() => { if (m.id === 'demo') playDemo(demoId ?? CLARA_DEMOS[0].id); else { setMode(m.id); demo.stop() } }} className={`flex-1 sm:flex-none text-[13px] px-3.5 py-2 rounded-lg transition ${mode === m.id ? 'bg-white text-[#0B1B3A] font-semibold shadow-sm' : 'text-slate-500 hover:text-[#0B1B3A]'}`}>
                  {m.label}
                </button>
              ))}
            </div>
          </header>

          <div className="flex-1 min-h-0 flex flex-col">
            {mode === 'diagnostic' && (
              <ClaraWizard
                key={wizardKey}
                initialKind={kindParam === 'association' || kindParam === 'particulier' ? kindParam : undefined}
                initialProfil={presetProfil?.profil}
                initialAsso={presetProfil?.asso}
              />
            )}

            {mode === 'demo' && (
              <>
                <div className="px-5 sm:px-6 py-3 border-b border-[#0B1B3A]/8">
                  <p className="text-[11.5px] text-slate-500 mb-2">Conversations rejouées : les outils de Clara tournent réellement, le texte est généré à partir de leurs résultats.</p>
                  <div className="flex gap-1.5 overflow-x-auto pb-1">
                    {CLARA_DEMOS.map((d) => (
                      <button key={d.id} onClick={() => playDemo(d.id)} className={`shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition ${demoId === d.id ? 'border-[#E8962E] text-[#B8691A] bg-[#FFF4E5]' : 'border-[#e6e1d7] text-slate-600 hover:border-[#E8962E]'}`}>
                        {d.icon} {d.title}
                      </button>
                    ))}
                  </div>
                </div>
                <Thread messages={demo.messages} />
              </>
            )}

            {mode === 'live' && <LiveChat chat={chat} />}
          </div>
        </section>

        <aside className="hidden lg:flex flex-col gap-5 lg:sticky lg:top-24 self-start">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl shadow-[#0B1B3A]/15">
            <Image src={VISUALS.clara} alt="Des formulaires qui se transforment en chemin lumineux" fill sizes="340px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3A] via-[#0B1B3A]/20 to-transparent" />
            <div className="absolute bottom-0 p-5 text-white">
              <p className="text-xs uppercase tracking-[0.18em] text-[#F2B55F] font-semibold">Comment ça marche</p>
              <p className="font-bold text-lg leading-snug mt-1">Situation → droits probables → formulaires officiels → dossier prêt</p>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 mb-3">Essayer avec un profil type</p>
            <div className="grid gap-2.5">
              {PROFILS.map((p) => (
                <button key={p.id} onClick={() => pickProfil(p.id)} className="cprofil group text-left">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={PROFIL_IMG[p.id]} alt="" fill sizes="64px" className="object-cover group-hover:scale-110 transition duration-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#0B1B3A] text-sm">{p.titre}</p>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-snug mt-0.5">{p.texte}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <ul className="text-[13px] text-slate-600 space-y-2 bg-white rounded-2xl p-4 ring-1 ring-[#0B1B3A]/8">
            <li className="flex gap-2"><span>🔒</span>Diagnostic calculé dans votre navigateur : rien n’est envoyé</li>
            <li className="flex gap-2"><span>🏛️</span>Chaque aide renvoie à sa fiche et à son simulateur officiels</li>
            <li className="flex gap-2"><span>⚖️</span>Orientation, pas décision : l’organisme tranche</li>
          </ul>
        </aside>
      </div>
    </div>
  )
}

function Thread({ messages }: { messages: AgentMessage[] }) {
  const bottomRef = useRef<HTMLDivElement>(null)
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [messages])
  return (
    <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6 cscroll">
      {messages.map((m) =>
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
      <div ref={bottomRef} />
    </div>
  )
}

function LiveChat({ chat }: { chat: ReturnType<typeof useAgentChat> }) {
  const [input, setInput] = useState('')
  const submit = (t: string) => { if (t.trim() && !chat.loading) { chat.send(t); setInput('') } }
  return (
    <>
      <Thread messages={chat.messages} />
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
        <p className="text-[11px] text-slate-400 text-center mt-2">Ne partagez jamais votre n° de sécurité sociale, RIB ou mot de passe.</p>
      </form>
    </>
  )
}
