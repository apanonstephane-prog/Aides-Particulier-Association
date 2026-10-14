'use client'

// Lecteur de démonstration : rejoue une conversation d'agent scénarisée,
// mais avec de VRAIS appels d'outils (données réelles, à jour) et un texte
// calculé à partir de leurs résultats. Aucun modèle d'IA n'est appelé.

import { useCallback, useRef, useState } from 'react'
import type { AgentMessage } from './useAgentChat'

export type Results = Record<string, unknown>

export type DemoStep =
  | { user: string }
  | { say: string | ((r: Results) => string) }
  | { tool: string; label: string; input: Record<string, unknown>; key?: string }

export interface DemoScript { id: string; title: string; icon: string; steps: DemoStep[] }

export type ToolRunner = (tool: string, input: Record<string, unknown>) => Promise<{ cards: { kind: string; data: unknown }[]; result: unknown }>

const uid = () => Math.random().toString(36).slice(2, 10)
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function useDemoPlayer(runTool: ToolRunner, onCard?: (c: { id: string; kind: string; data: unknown }) => void) {
  const [messages, setMessages] = useState<AgentMessage[]>([])
  const [playing, setPlaying] = useState(false)
  const runId = useRef(0)

  const play = useCallback(async (script: DemoScript) => {
    const id = ++runId.current
    const alive = () => runId.current === id
    setMessages([])
    setPlaying(true)
    const results: Results = {}
    let aid: string | null = null

    const patch = (fn: (m: AgentMessage) => AgentMessage) =>
      setMessages((prev) => prev.map((m) => (m.id === aid ? fn(m) : m)))
    const ensureAssistant = () => {
      if (aid) return
      aid = uid()
      const msg: AgentMessage = { id: aid, role: 'assistant', content: '', tools: [], cards: [], sources: [], streaming: true }
      setMessages((prev) => [...prev, msg])
    }

    try {
      for (const step of script.steps) {
        if (!alive()) return
        if ('user' in step) {
          if (aid) patch((m) => ({ ...m, streaming: false }))
          aid = null
          await sleep(350)
          setMessages((prev) => [...prev, { id: uid(), role: 'user', content: step.user, tools: [], cards: [], sources: [] }])
          await sleep(700)
        } else if ('say' in step) {
          ensureAssistant()
          const text = typeof step.say === 'function' ? step.say(results) : step.say
          const words = text.split(/(\s+)/)
          for (let i = 0; i < words.length; i += 3) {
            if (!alive()) return
            const chunk = words.slice(i, i + 3).join('')
            patch((m) => ({ ...m, content: m.content + chunk }))
            await sleep(28)
          }
        } else {
          ensureAssistant()
          const tid = uid()
          patch((m) => ({ ...m, tools: [...m.tools, { id: tid, name: step.tool, label: step.label, status: 'running' }] }))
          try {
            const [out] = await Promise.all([runTool(step.tool, step.input), sleep(650)])
            if (!alive()) return
            results[step.key ?? step.tool] = out.result
            const cards = out.cards.map((c) => ({ id: uid(), kind: c.kind, data: c.data }))
            patch((m) => ({ ...m, cards: [...m.cards, ...cards], tools: m.tools.map((t) => (t.id === tid ? { ...t, status: 'ok' } : t)) }))
            cards.forEach((c) => onCard?.(c))
          } catch (err) {
            patch((m) => ({ ...m, tools: m.tools.map((t) => (t.id === tid ? { ...t, status: 'error' } : t)), error: (err as Error).message }))
            return
          }
          await sleep(250)
        }
      }
    } finally {
      if (alive()) {
        setMessages((prev) => prev.map((m) => ({ ...m, streaming: false })))
        setPlaying(false)
      }
    }
  }, [runTool, onCard])

  const stop = useCallback(() => {
    runId.current++
    setPlaying(false)
    setMessages((prev) => prev.map((m) => ({ ...m, streaming: false })))
  }, [])

  return { messages, playing, play, stop }
}
