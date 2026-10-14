'use client'

// Hook client générique : envoie l'historique, lit le flux SSE d'AgentEvent,
// et reconstruit des messages riches (texte + activité outils + cartes + sources).

import { useCallback, useRef, useState } from 'react'
import type { AgentEvent } from './runtime'

export interface ToolActivity { id: string; name: string; label: string; status: 'running' | 'ok' | 'error' }
export interface AgentCard { id: string; kind: string; data: unknown }

export interface AgentMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  tools: ToolActivity[]
  cards: AgentCard[]
  sources: { title: string; url: string }[]
  streaming?: boolean
  error?: string
  /** Messages d'accueil : affichés mais jamais renvoyés à l'API */
  local?: boolean
}

const uid = () => Math.random().toString(36).slice(2, 10)

export function useAgentChat(endpoint: string, opts: { welcome?: string; onCard?: (c: AgentCard) => void } = {}) {
  const [messages, setMessages] = useState<AgentMessage[]>(() =>
    opts.welcome
      ? [{ id: 'welcome', role: 'assistant', content: opts.welcome, tools: [], cards: [], sources: [], local: true }]
      : [],
  )
  const [loading, setLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const messagesRef = useRef(messages)
  messagesRef.current = messages
  const onCardRef = useRef(opts.onCard)
  onCardRef.current = opts.onCard

  const patch = (id: string, fn: (m: AgentMessage) => AgentMessage) =>
    setMessages((prev) => prev.map((m) => (m.id === id ? fn(m) : m)))

  const send = useCallback(async (text: string) => {
    const content = text.trim()
    if (!content || loading) return

    const user: AgentMessage = { id: uid(), role: 'user', content, tools: [], cards: [], sources: [] }
    const aid = uid()
    const history = [...messagesRef.current.filter((m) => !m.local && !m.error), user]
      .map((m) => ({ role: m.role, content: m.content }))

    setMessages((prev) => [...prev, user, { id: aid, role: 'assistant', content: '', tools: [], cards: [], sources: [], streaming: true }])
    setLoading(true)
    abortRef.current = new AbortController()

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: abortRef.current.signal,
      })
      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error ?? `Erreur ${res.status}`)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const frames = buffer.split('\n\n')
        buffer = frames.pop() ?? ''
        for (const frame of frames) {
          const line = frame.trim()
          if (!line.startsWith('data:')) continue
          let ev: AgentEvent
          try { ev = JSON.parse(line.slice(5).trim()) } catch { continue }
          apply(aid, ev)
        }
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        patch(aid, (m) => ({ ...m, error: (err as Error).message || 'Erreur de connexion' }))
      }
    } finally {
      patch(aid, (m) => ({ ...m, streaming: false, tools: m.tools.map((t) => (t.status === 'running' ? { ...t, status: 'ok' } : t)) }))
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, loading])

  function apply(aid: string, ev: AgentEvent) {
    switch (ev.type) {
      case 'text':
        patch(aid, (m) => ({ ...m, content: m.content + ev.text }))
        break
      case 'tool_start':
        patch(aid, (m) => ({ ...m, tools: [...m.tools, { id: ev.id, name: ev.name, label: ev.label, status: 'running' }] }))
        break
      case 'tool_end':
        patch(aid, (m) => ({ ...m, tools: m.tools.map((t) => (t.id === ev.id ? { ...t, status: ev.ok ? 'ok' : 'error' } : t)) }))
        break
      case 'card': {
        const card = { id: uid(), kind: ev.kind, data: ev.data }
        patch(aid, (m) => ({ ...m, cards: [...m.cards, card] }))
        onCardRef.current?.(card)
        break
      }
      case 'sources':
        patch(aid, (m) => ({ ...m, sources: [...m.sources, ...ev.items] }))
        break
      case 'error':
        patch(aid, (m) => ({ ...m, error: ev.message }))
        break
    }
  }

  const stop = useCallback(() => abortRef.current?.abort(), [])
  const reset = useCallback(() => {
    abortRef.current?.abort()
    setMessages((prev) => prev.filter((m) => m.local))
  }, [])

  return { messages, loading, send, stop, reset }
}
