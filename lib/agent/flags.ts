// Conversation Groq directe, activable uniquement par le nouveau drapeau dédié.
// Le mode gratuit local reste toujours disponible.
export const AGENT_LIVE = process.env.NEXT_PUBLIC_AGENT_PROVIDER === 'groq'
