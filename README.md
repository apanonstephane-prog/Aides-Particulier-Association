# Aides Connect

Orientation gratuite vers les aides, subventions et démarches — particuliers et associations.

## Clara — conseillère IA (v2)

Boucle agentique Claude streamée en SSE (`lib/agent/runtime.ts`), outils dans `lib/agent/aides.ts` :

| Outil | Rôle | Rendu |
|---|---|---|
| `evaluer_situation` | pré-diagnostic sur 13 dispositifs nationaux (règles explicites, seuils prudents) | carte « droits probables / à vérifier » |
| `evaluer_association` | financements et dispositifs associatifs | même carte |
| `trouver_formulaire` | catalogue de formulaires et services en ligne officiels | liens directs |
| `liste_pieces` | pièces justificatives par démarche | checklist interactive (progression mémorisée localement) |
| `web_search` | outil serveur Anthropic, **limité aux domaines publics** (service-public.fr, caf.fr, ameli.fr…) | sources affichées |

Règle centrale : aucun montant cité de mémoire — chaque chiffre vient d'une source officielle consultée, sinon renvoi au simulateur.

- Page : `/conseil` (`/conseil?q=...` lance directement une demande).
- Variables : `ANTHROPIC_API_KEY` (obligatoire), `ANTHROPIC_MODEL` (défaut `claude-sonnet-5-5`).
- Visuels de marque générés avec Higgsfield : `lib/visuals.ts`.

## Développement

```bash
npm install
npm run dev
```
