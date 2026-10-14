// Outils de Clara exécutés dans le navigateur (aucun serveur, aucune IA),
// démarches associées à chaque aide, et scénarios de démonstration.

import { CLARA_TOOLS, type Profil, type Asso } from './aides'
import type { DemoScript, Results, ToolRunner } from './demoPlayer'

export const runClaraTool: ToolRunner = async (tool, input) => {
  const def = CLARA_TOOLS.find((t) => t.definition.name === tool)
  if (!def) throw new Error(`Outil inconnu : ${tool}`)
  const cards: { kind: string; data: unknown }[] = []
  const result = await def.run(input, { emit: (e) => { if (e.type === 'card') cards.push({ kind: e.kind, data: e.data }) } })
  return { cards, result }
}

/** Démarche à proposer pour chaque aide : recherche de formulaire + liste de pièces */
export const DEMARCHE: Record<string, { forms: string; pieces?: string }> = {
  rsa: { forms: 'rsa', pieces: 'caf' },
  prime: { forms: 'prime activite', pieces: 'caf' },
  apl: { forms: 'logement', pieces: 'caf' },
  css: { forms: 'complementaire sante', pieces: 'css' },
  af: { forms: 'simulateur', pieces: 'caf' },
  ars: { forms: 'simulateur', pieces: 'caf' },
  paje: { forms: 'simulateur', pieces: 'caf' },
  aah: { forms: 'mdph', pieces: 'mdph' },
  apa: { forms: 'apa autonomie' },
  crous: { forms: 'bourse crous', pieces: 'crous' },
  are: { forms: 'france travail' },
  aspa: { forms: 'simulateur' },
  fdva: { forms: 'association fdva', pieces: 'association' },
  subv: { forms: 'subvention association', pieces: 'association' },
}

interface Verdict { id: string; nom: string; statut: string }
interface EvalResult { aides: { nom: string; statut: string; raisons: string[] }[] }

const liste = (noms: string[]) => (noms.length <= 1 ? noms.join('') : `${noms.slice(0, -1).join(', ')} et ${noms[noms.length - 1]}`)
function synthese(r: Results, key = 'eval') {
  const e = r[key] as EvalResult
  const prob = e.aides.filter((a) => a.statut === 'probable').map((a) => `**${a.nom.split(' — ')[0].split(' (')[0]}**`)
  const verif = e.aides.filter((a) => a.statut !== 'probable').length
  return prob.length
    ? `Bonne nouvelle : ${prob.length} droit${prob.length > 1 ? 's' : ''} probable${prob.length > 1 ? 's' : ''} — ${liste(prob)}${verif ? `, et ${verif} autre${verif > 1 ? 's' : ''} à vérifier` : ''}. Chaque fiche renvoie au site officiel et au simulateur pour le montant exact.`
    : `Aucun droit national évident avec ces éléments${verif ? `, mais ${verif} piste${verif > 1 ? 's' : ''} à vérifier` : ''}. Pensez aussi au CCAS de votre commune.`
}

export const PROFILS: { id: string; titre: string; texte: string; profil?: Profil; asso?: Asso }[] = [
  { id: 'famille', titre: 'Famille', texte: 'Couple, 2 enfants (4 et 9 ans), locataires, 2 400 € nets par mois.', profil: { situation_familiale: 'couple', age: 38, enfants: 2, ages_enfants: [4, 9], activite: 'salarie', revenus_mensuels_foyer: 2400, logement: 'locataire' } },
  { id: 'etudiant', titre: 'Étudiant', texte: '20 ans, étudiant à Toulouse, studio en location, petit job à 450 € par mois.', profil: { situation_familiale: 'seul', age: 20, enfants: 0, activite: 'etudiant', revenus_mensuels_foyer: 450, logement: 'locataire' } },
  { id: 'senior', titre: 'Senior', texte: '82 ans, vit seule chez elle avec 1 050 € de retraite, se déplace difficilement.', profil: { situation_familiale: 'seul', age: 82, enfants: 0, activite: 'retraite', revenus_mensuels_foyer: 1050, logement: 'proprietaire', perte_autonomie: true } },
  { id: 'association', titre: 'Association', texte: 'Aide aux devoirs, sans salarié, reconnue d’intérêt général.', asso: { salaries: 0, interet_general: true, recrutement: false } },
]

const prof = (id: string) => PROFILS.find((p) => p.id === id)!

export const CLARA_DEMOS: DemoScript[] = [
  {
    id: 'famille', title: 'Famille', icon: '👨‍👩‍👧',
    steps: [
      { user: 'Nous sommes un couple avec 2 enfants de 4 et 9 ans, locataires, environ 2 400 € nets par mois à deux. À quoi avons-nous droit ?' },
      { say: 'J’ai ce qu’il faut pour un premier diagnostic : composition du foyer, revenus et logement.' },
      { tool: 'evaluer_situation', label: 'Analyse votre situation', input: prof('famille').profil as Record<string, unknown>, key: 'eval' },
      { say: (r: Results) => `${synthese(r)}\n\nLe plus rentable à lancer en premier : la demande CAF, qui couvre à la fois le logement et la prime d’activité.` },
      { tool: 'trouver_formulaire', label: 'Cherche le formulaire officiel', input: { demarche: 'logement prime activite' } },
      { tool: 'liste_pieces', label: 'Prépare la liste des pièces', input: { dossier: 'caf' } },
      { say: 'Cochez les pièces au fur et à mesure : la progression reste enregistrée sur votre appareil.' },
    ],
  },
  {
    id: 'etudiant', title: 'Étudiant', icon: '🎓',
    steps: [
      { user: 'J’ai 20 ans, je suis étudiant à Toulouse, locataire d’un studio, et je travaille 10 h par semaine pour environ 450 €.' },
      { tool: 'evaluer_situation', label: 'Analyse votre situation', input: prof('etudiant').profil as Record<string, unknown>, key: 'eval' },
      { say: (r: Results) => `${synthese(r)}\n\nPriorité absolue : le **Dossier social étudiant**. Une seule demande ouvre à la fois la bourse et le logement CROUS.` },
      { tool: 'trouver_formulaire', label: 'Cherche le formulaire officiel', input: { demarche: 'bourse crous etudiant' } },
      { tool: 'liste_pieces', label: 'Prépare la liste des pièces', input: { dossier: 'crous' } },
    ],
  },
  {
    id: 'senior', title: 'Senior', icon: '🧓',
    steps: [
      { user: 'Ma grand-mère a 82 ans, vit seule chez elle avec 1 050 € de retraite et a du mal à se déplacer. Quelles aides pour elle ?' },
      { tool: 'evaluer_situation', label: 'Analyse sa situation', input: prof('senior').profil as Record<string, unknown>, key: 'eval' },
      { say: (r: Results) => `${synthese(r)}\n\nPour la perte d’autonomie, c’est le **département** qui évalue le besoin à domicile : l’APA peut financer une aide à domicile, du portage de repas ou des aménagements.` },
      { tool: 'trouver_formulaire', label: 'Cherche le formulaire officiel', input: { demarche: 'apa autonomie personne agee' } },
    ],
  },
  {
    id: 'association', title: 'Association', icon: '🏛️',
    steps: [
      { user: 'Nous sommes une association d’aide aux devoirs, sans salarié, reconnue d’intérêt général. Quels financements demander ?' },
      { tool: 'evaluer_association', label: 'Analyse les financements de votre association', input: prof('association').asso as Record<string, unknown>, key: 'eval' },
      { say: 'Trois leviers prioritaires pour vous : le **FDVA** (pensé pour les petites associations), les **subventions des collectivités**, et le **mécénat**, puisque vous pouvez émettre des reçus fiscaux.' },
      { tool: 'trouver_formulaire', label: 'Cherche le formulaire officiel', input: { demarche: 'subvention association compte asso' } },
      { tool: 'liste_pieces', label: 'Prépare la liste des pièces', input: { dossier: 'association' } },
    ],
  },
]

export type { Verdict }
