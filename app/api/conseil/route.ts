// Clara — conseillère IA d'Aides Connect (boucle agentique Claude, SSE)
import { NextRequest } from 'next/server'
import { streamAgent, type ChatTurn } from '@/lib/agent/runtime'
import { CLARA_TOOLS, CLARA_SERVER_TOOLS, claraSystemPrompt } from '@/lib/agent/aides'
import { AGENT_LIVE } from '@/lib/agent/flags'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  // Coupe-circuit : aucun appel de modèle (donc aucun coût) tant que Clara n'est pas activée
  if (!AGENT_LIVE) {
    return Response.json({ error: 'Conseillère en direct désactivée : utilisez le diagnostic guidé.' }, { status: 503 })
  }
  let messages: ChatTurn[] = []
  try {
    const body = await req.json()
    messages = Array.isArray(body.messages) ? body.messages : []
  } catch {
    return Response.json({ error: 'Requête invalide' }, { status: 400 })
  }
  const history = messages
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.slice(0, 8000) }))
  if (!history.length || history[history.length - 1].role !== 'user') {
    return Response.json({ error: 'Message manquant' }, { status: 400 })
  }
  return streamAgent({ system: claraSystemPrompt(), tools: CLARA_TOOLS, serverTools: CLARA_SERVER_TOOLS, maxTokens: 3000 }, history)
}
