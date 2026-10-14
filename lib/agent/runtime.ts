// ════════════════════════════════════════════════════════════════════════════
// Runtime agentique — boucle Claude + outils, streamée en SSE
// ----------------------------------------------------------------------------
// Une seule boucle pour tous les agents de l'app :
//   1. Claude répond en streaming (texte relayé token par token)
//   2. S'il appelle des outils locaux, on les exécute et on renvoie les résultats
//   3. Les outils serveur (web_search) sont exécutés par l'API Anthropic
//   4. On recommence jusqu'à une réponse finale (ou MAX_STEPS)
// Chaque étape émet des événements typés que l'UI transforme en cartes.
// ════════════════════════════════════════════════════════════════════════════

import Anthropic from '@anthropic-ai/sdk'

export const AGENT_MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5'
const MAX_STEPS = 8

/** Événements envoyés au client */
export type AgentEvent =
  | { type: 'text'; text: string }
  | { type: 'tool_start'; id: string; name: string; label: string }
  | { type: 'tool_end'; id: string; name: string; ok: boolean }
  | { type: 'card'; kind: string; data: unknown }
  | { type: 'sources'; items: { title: string; url: string }[] }
  | { type: 'error'; message: string }
  | { type: 'done' }

export interface ToolContext {
  emit: (e: AgentEvent) => void
}

export interface LocalTool {
  definition: Anthropic.Tool
  /** Libellé affiché pendant l'exécution, ex. « Consulte la météo » */
  label: (input: Record<string, unknown>) => string
  run: (input: Record<string, unknown>, ctx: ToolContext) => Promise<unknown>
}

export interface AgentConfig {
  system: string
  tools: LocalTool[]
  /** Outils serveur Anthropic (web_search…) passés tels quels */
  serverTools?: Record<string, unknown>[]
  maxTokens?: number
}

export interface ChatTurn {
  role: 'user' | 'assistant'
  content: string
}

/** Construit une Response SSE qui exécute la boucle agentique */
export function streamAgent(config: AgentConfig, history: ChatTurn[]): Response {
  const encoder = new TextEncoder()

  const readable = new ReadableStream({
    async start(controller) {
      const emit = (e: AgentEvent) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(e)}\n\n`))

      try {
        await runLoop(config, history, emit)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erreur inconnue'
        emit({ type: 'error', message })
      } finally {
        emit({ type: 'done' })
        controller.close()
      }
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  })
}

async function runLoop(
  config: AgentConfig,
  history: ChatTurn[],
  emit: (e: AgentEvent) => void,
) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const toolsByName = new Map(config.tools.map((t) => [t.definition.name, t]))

  const messages: Anthropic.MessageParam[] = history
    .filter((m) => m.content.trim())
    .slice(-20)
    .map((m) => ({ role: m.role, content: m.content }))
  // L'API exige que la conversation commence par l'utilisateur
  while (messages.length && messages[0].role !== 'user') messages.shift()

  const tools = [
    ...config.tools.map((t) => t.definition),
    ...(config.serverTools ?? []),
  ] as Anthropic.ToolUnion[]

  const seenSources = new Set<string>()

  for (let step = 0; step < MAX_STEPS; step++) {
    const stream = client.messages.stream({
      model: AGENT_MODEL,
      max_tokens: config.maxTokens ?? 2048,
      system: config.system,
      tools,
      messages,
    })

    stream.on('text', (delta) => emit({ type: 'text', text: delta }))

    // Signale les recherches web lancées par l'API
    stream.on('streamEvent', (ev) => {
      if (ev.type === 'content_block_start' && ev.content_block.type === 'server_tool_use') {
        emit({
          type: 'tool_start',
          id: ev.content_block.id,
          name: 'web_search',
          label: 'Vérifie sur des sources officielles',
        })
      }
    })

    const final = await stream.finalMessage()

    // Sources issues de la recherche web → affichées en pied de réponse
    const sources: { title: string; url: string }[] = []
    for (const block of final.content) {
      if (block.type === 'web_search_tool_result') {
        emit({ type: 'tool_end', id: block.tool_use_id, name: 'web_search', ok: Array.isArray(block.content) })
        if (Array.isArray(block.content)) {
          for (const r of block.content) {
            if (!seenSources.has(r.url) && sources.length < 6) {
              seenSources.add(r.url)
              sources.push({ title: r.title, url: r.url })
            }
          }
        }
      }
    }
    if (sources.length) emit({ type: 'sources', items: sources })

    messages.push({ role: 'assistant', content: final.content })

    // L'API a mis en pause une longue suite d'outils serveur : on relance
    if (final.stop_reason === 'pause_turn') continue

    if (final.stop_reason !== 'tool_use') return

    // Exécution des outils locaux (en parallèle)
    const calls = final.content.filter(
      (b): b is Anthropic.ToolUseBlock => b.type === 'tool_use',
    )
    if (!calls.length) return

    // Séparateur visuel entre le texte d'avant-outil et la suite
    emit({ type: 'text', text: '\n\n' })

    const results = await Promise.all(
      calls.map(async (call) => {
        const tool = toolsByName.get(call.name)
        const input = (call.input ?? {}) as Record<string, unknown>
        if (!tool) {
          return toolResult(call.id, { erreur: `Outil inconnu : ${call.name}` }, true)
        }
        emit({ type: 'tool_start', id: call.id, name: call.name, label: tool.label(input) })
        try {
          const out = await tool.run(input, { emit })
          emit({ type: 'tool_end', id: call.id, name: call.name, ok: true })
          return toolResult(call.id, out, false)
        } catch (err) {
          emit({ type: 'tool_end', id: call.id, name: call.name, ok: false })
          const message = err instanceof Error ? err.message : String(err)
          return toolResult(call.id, { erreur: message }, true)
        }
      }),
    )

    messages.push({ role: 'user', content: results })
  }

  emit({ type: 'text', text: "\n\n_(J'ai atteint ma limite d'étapes pour cette demande — reformulez si besoin.)_" })
}

function toolResult(id: string, data: unknown, isError: boolean): Anthropic.ToolResultBlockParam {
  return {
    type: 'tool_result',
    tool_use_id: id,
    content: typeof data === 'string' ? data : JSON.stringify(data),
    is_error: isError || undefined,
  }
}
