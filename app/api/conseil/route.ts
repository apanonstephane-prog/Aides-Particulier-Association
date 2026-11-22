// Agent OBSIDIAN — conversation Groq directe, protocole SSE conservé.
import { NextRequest } from 'next/server'
import { streamAgent, type ChatTurn } from '@/lib/agent/runtime'
import { CLARA_TOOLS, claraSystemPrompt, claraDirectAnswer, claraGuardText } from '@/lib/agent/aides'
import { AGENT_LIVE } from '@/lib/agent/flags'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  if (!AGENT_LIVE) return Response.json({ error: 'Conversation indisponible : utilisez les outils gratuits.' }, { status: 503 })
  let messages: unknown[]
  try {
    const body = await req.json()
    messages = Array.isArray(body?.messages) ? body.messages : []
  } catch {
    return Response.json({ error: 'Requête invalide' }, { status: 400 })
  }
  const history = messages.slice(-6).filter((m): m is ChatTurn => !!m && typeof m === 'object' &&
    (('role' in m && m.role === 'user') || ('role' in m && m.role === 'assistant')) &&
    'content' in m && typeof m.content === 'string')
    .map(m => ({ role: m.role, content: m.content.slice(0, 1800) }))
  if (!history.length || history[history.length - 1].role !== 'user' || !history[history.length - 1].content.trim())
    return Response.json({ error: 'Message manquant' }, { status: 400 })
  // Ne pas transmettre d'identifiants manifestes au fournisseur IA.
  const confidential = /(?:\bFR\d{2}(?:[\s-]*[A-Z0-9]){23}\b|\b[12][\s.]?\d{2}[\s.]?\d{2}[\s.]?\d{2}[\s.]?\d{3}[\s.]?\d{3}[\s.]?\d{2}\b|[\w.+-]+@[\w.-]+\.[a-z]{2,}|(?:\+33|0)[1-9](?:[\s.-]*\d{2}){4})/i;
  if (history.some(m => confidential.test(m.content))) return Response.json({ error: 'N’envoyez pas de numéro personnel ni de coordonnées. Reformulez avec une situation anonyme ou utilisez le diagnostic guidé.' }, { status: 400 });
  return streamAgent({ system: claraSystemPrompt(), tools: CLARA_TOOLS, directAnswer: claraDirectAnswer, guardText: claraGuardText, maxTokens: 1100, fallback: "La conversation gratuite est momentanément indisponible. Le diagnostic guidé et les formulaires officiels restent accessibles." }, history)
}
