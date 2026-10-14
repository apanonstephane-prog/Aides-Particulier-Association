// Conseillère IA en direct (payant : appels de modèle). Désactivée par défaut :
// le site propose un diagnostic guidé gratuit et rejoue des démonstrations.
// Pour l'activer : NEXT_PUBLIC_AGENT_LIVE=1 (et un budget plafonné sur Vercel AI Gateway).
export const AGENT_LIVE = process.env.NEXT_PUBLIC_AGENT_LIVE === '1'
