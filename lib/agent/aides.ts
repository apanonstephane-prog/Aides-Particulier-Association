// ════════════════════════════════════════════════════════════════════════════
// Clara — conseillère IA d'Aides Connect
// Pré-diagnostic d'éligibilité (règles explicites, prudentes), formulaires
// officiels, listes de pièces, et vérification des montants en ligne
// sur les seuls domaines publics.
// ════════════════════════════════════════════════════════════════════════════

import type { LocalTool } from './runtime'

type Statut = 'probable' | 'a_verifier' | 'peu_probable'

interface Verdict {
  id: string
  nom: string
  organisme: string
  categorie: string
  statut: Statut
  raisons: string[]
  simulateur?: string
  info: string
}

// ── Référentiel des dispositifs (liens officiels) ─────────────────────────
const SP = 'https://www.service-public.fr/particuliers/vosdroits'
const DISPOSITIFS = {
  rsa: { nom: 'RSA — revenu de solidarité active', organisme: 'CAF / MSA', categorie: 'Revenus', info: `${SP}/N19775`, simulateur: 'https://www.caf.fr/allocataires/mes-services-en-ligne/estimer-vos-droits' },
  prime: { nom: "Prime d'activité", organisme: 'CAF / MSA', categorie: 'Revenus', info: `${SP}/F2882`, simulateur: 'https://www.caf.fr/allocataires/mes-services-en-ligne/estimer-vos-droits' },
  apl: { nom: 'Aide au logement (APL / ALS / ALF)', organisme: 'CAF / MSA', categorie: 'Logement', info: `${SP}/F12006`, simulateur: 'https://www.caf.fr/allocataires/mes-services-en-ligne/estimer-vos-droits' },
  css: { nom: 'Complémentaire santé solidaire', organisme: 'Assurance maladie', categorie: 'Santé', info: `${SP}/F10027`, simulateur: 'https://www.ameli.fr/assure/droits-demarches/difficultes-acces-droits-soins/complementaire-sante' },
  af: { nom: 'Allocations familiales', organisme: 'CAF / MSA', categorie: 'Famille', info: `${SP}/F13213` },
  ars: { nom: 'Allocation de rentrée scolaire', organisme: 'CAF / MSA', categorie: 'Famille', info: `${SP}/F1878` },
  paje: { nom: 'PAJE — jeune enfant (naissance, base, garde)', organisme: 'CAF / MSA', categorie: 'Famille', info: 'https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/famille' },
  aah: { nom: 'AAH — allocation aux adultes handicapés', organisme: 'MDPH puis CAF', categorie: 'Handicap', info: `${SP}/F12242`, simulateur: 'https://www.monparcourshandicap.gouv.fr' },
  crous: { nom: 'Bourse sur critères sociaux (CROUS)', organisme: 'CROUS', categorie: 'Études', info: 'https://www.etudiant.gouv.fr/fr/bourse-et-logement-1', simulateur: 'https://simulateur.lescrous.fr' },
  cheque: { nom: 'Chèque énergie', organisme: 'État (envoi automatique)', categorie: 'Énergie', info: 'https://www.chequeenergie.gouv.fr' },
  are: { nom: "Allocation chômage (ARE)", organisme: 'France Travail', categorie: 'Emploi', info: 'https://www.francetravail.fr/candidat/mes-droits-aux-aides-et-allocati.html' },
  aspa: { nom: 'ASPA — minimum vieillesse', organisme: 'Caisse de retraite', categorie: 'Retraite', info: `${SP}/F16871` },
  apa: { nom: "APA — allocation personnalisée d'autonomie", organisme: 'Département', categorie: 'Autonomie', info: `${SP}/F10009` },
} as const

const ASSO_DISPOSITIFS = [
  { id: 'fdva', nom: 'FDVA — fonds pour le développement de la vie associative', organisme: 'État (SDJES du département)', categorie: 'Fonctionnement / projets', info: 'https://www.associations.gouv.fr/fdva.html', condition: (p: Asso) => !p.salaries || p.salaries <= 10, raison: 'Priorité aux petites associations (souvent sans ou avec peu de salariés) ; campagne annuelle à date fixe.' },
  { id: 'subv', nom: 'Subvention de collectivité (commune, département, Région)', organisme: 'Collectivités', categorie: 'Projets', info: 'https://lecompteasso.associations.gouv.fr', condition: () => true, raison: "Ouverte à toute association déclarée ; dossier via Le Compte Asso ou formulaire Cerfa n° 12156." },
  { id: 'mecenat', nom: 'Mécénat et dons défiscalisés', organisme: 'Entreprises / particuliers', categorie: 'Financement privé', info: 'https://www.service-public.fr/associations/vosdroits/F426', condition: (p: Asso) => !!p.interet_general, raison: "Réservé aux organismes d'intérêt général : permet d'émettre des reçus fiscaux." },
  { id: 'service-civique', nom: 'Accueil de volontaires en Service civique', organisme: 'Agence du Service civique', categorie: 'Ressources humaines', info: 'https://www.service-civique.gouv.fr/organismes', condition: () => true, raison: "Nécessite un agrément ; l'indemnité du volontaire est principalement prise en charge par l'État." },
  { id: 'pec', nom: 'Contrat aidé (PEC) / emploi associatif', organisme: 'France Travail', categorie: 'Emploi', info: 'https://travail-emploi.gouv.fr/parcours-emploi-competences', condition: (p: Asso) => p.recrutement === true, raison: "Aide à l'embauche selon le public recruté et les enveloppes locales." },
]

export interface Profil {
  age?: number
  situation_familiale?: 'seul' | 'couple'
  enfants?: number
  ages_enfants?: number[]
  activite?: 'salarie' | 'independant' | 'sans_emploi' | 'etudiant' | 'retraite' | 'autre'
  revenus_mensuels_foyer?: number
  logement?: 'locataire' | 'proprietaire_credit' | 'proprietaire' | 'heberge'
  handicap?: boolean
  perte_autonomie?: boolean
  inscrit_france_travail?: boolean
}
export interface Asso { salaries?: number; interet_general?: boolean; recrutement?: boolean; budget_annuel?: number }

// Seuils volontairement prudents : ce sont des signaux d'orientation,
// jamais une décision. Échelle d'unités proche de celle utilisée par la CSS
// et le chèque énergie (1 pour le premier adulte, 0,5 pour le second,
// 0,3 par enfant). Les plafonds exacts se vérifient en ligne.
function evaluer(p: Profil): Verdict[] {
  const out: Verdict[] = []
  const rev = p.revenus_mensuels_foyer
  const enfants = p.enfants ?? 0
  const unites = 1 + (p.situation_familiale === 'couple' ? 0.5 : 0) + enfants * 0.3
  const revU = rev != null ? rev / unites : undefined
  const etudiant = p.activite === 'etudiant'
  const add = (k: keyof typeof DISPOSITIFS, statut: Statut, raisons: string[]) =>
    out.push({ id: k, ...DISPOSITIFS[k], statut, raisons })

  // RSA
  if (!etudiant || enfants > 0) {
    const ageOk = (p.age ?? 30) >= 25 || enfants > 0
    if (rev === 0 || (revU != null && revU < 600)) {
      add('rsa', ageOk ? 'probable' : 'a_verifier', [
        ageOk ? 'Âge ou charge de famille compatibles' : 'Moins de 25 ans sans enfant : seulement dans des cas précis (jeune actif, parent isolé…)',
        'Ressources du foyer très faibles',
      ])
    } else if (revU != null && revU < 800) {
      add('rsa', 'a_verifier', ['Ressources proches des plafonds : montant éventuel réduit, à simuler'])
    }
  }

  // Prime d'activité (y compris étudiants salariés au-delà d'un certain revenu)
  if ((p.activite === 'salarie' || p.activite === 'independant' || (etudiant && (rev ?? 0) > 0)) && (p.age ?? 30) >= 18) {
    if (etudiant) add('prime', 'a_verifier', ["Étudiant salarié : ouverte seulement au-delà d'un seuil de revenus d'activité (environ 78 % du SMIC net), à vérifier"])
    else if (revU != null && revU < 1300) add('prime', 'probable', ['Activité professionnelle déclarée', 'Revenus modestes au regard de la composition du foyer'])
    else if (revU == null || revU < 1900) add('prime', 'a_verifier', ['Activité professionnelle : éligibilité selon le montant exact des revenus'])
  }

  // Logement
  if (p.logement === 'locataire' || p.logement === 'proprietaire_credit') {
    if (revU == null || revU < 1300) add('apl', p.logement === 'locataire' ? 'probable' : 'a_verifier', [
      p.logement === 'locataire' ? 'Locataire de sa résidence principale' : 'Accession à la propriété : aide limitée à certains prêts',
      'Montant calculé sur les revenus, le loyer et la zone',
    ])
    else if (revU < 1900) add('apl', 'a_verifier', ['Revenus intermédiaires : aide possible mais faible selon le loyer et la zone'])
  }

  // Santé
  if (revU != null && revU < 1150) {
    if (etudiant) add('css', 'a_verifier', ['Dépend du rattachement ou non au foyer fiscal des parents'])
    else add('css', revU < 850 ? 'probable' : 'a_verifier', [
      revU < 850 ? 'Ressources compatibles avec la version gratuite' : 'Peut relever de la version avec participation (moins de 1 € par jour et par personne)',
    ])
  }

  // Famille
  if (enfants >= 2) add('af', 'probable', ['Au moins deux enfants à charge (montant modulé selon les revenus)'])
  const ages = p.ages_enfants ?? []
  if (ages.some((a) => a >= 6 && a <= 18)) add('ars', revU != null && revU < 1400 ? 'probable' : 'a_verifier', ['Enfant scolarisé de 6 à 18 ans', 'Soumise à un plafond de ressources'])
  if (ages.some((a) => a < 3)) add('paje', 'probable', ['Enfant de moins de 3 ans : allocation de base et/ou aide à la garde selon les revenus'])

  // Handicap / autonomie
  if (p.handicap) add('aah', 'a_verifier', ['Dépend du taux d’incapacité reconnu par la MDPH (80 %, ou 50 à 79 % avec restriction d’accès à l’emploi)'])
  if (p.perte_autonomie && (p.age ?? 0) >= 60) add('apa', 'probable', ['60 ans ou plus avec perte d’autonomie : évaluation par le département'])

  // Études
  if (etudiant) add('crous', 'a_verifier', ['Bourse calculée sur les revenus des parents ; demande via le Dossier social étudiant'])

  // Retraite
  if (p.activite === 'retraite' && (p.age ?? 0) >= 65 && revU != null && revU < 1100) add('aspa', 'a_verifier', ['65 ans ou plus avec faibles ressources (montant récupérable sur succession au-delà d’un seuil)'])

  // Emploi
  if (p.activite === 'sans_emploi') add('are', p.inscrit_france_travail ? 'probable' : 'a_verifier', [
    'Dépend de la durée travaillée et du motif de fin de contrat',
    p.inscrit_france_travail ? 'Déjà inscrit à France Travail' : "S'inscrire à France Travail ouvre l'étude des droits",
  ])

  // Énergie (revenu fiscal annuel par unité, seuil indicatif ~11 000 €)
  if (revU != null && revU * 12 < 12500) {
    add('cheque', etudiant ? 'a_verifier' : revU * 12 < 11000 ? 'probable' : 'a_verifier', [
      etudiant ? 'Dépend de votre propre déclaration fiscale (ou de celle de vos parents)' : 'Attribué automatiquement selon le revenu fiscal : rien à demander, surveiller le courrier',
    ])
  }

  const order: Record<Statut, number> = { probable: 0, a_verifier: 1, peu_probable: 2 }
  return out.sort((a, b) => order[a.statut] - order[b.statut])
}

// ── Formulaires officiels ─────────────────────────────────────────────────
const FORMULAIRES = [
  { nom: 'Demande de RSA', ref: 'en ligne CAF / MSA', url: 'https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/solidarite/revenu-de-solidarite-active-rsa', mots: 'rsa revenu solidarite minimum' },
  { nom: "Prime d'activité", ref: 'en ligne CAF / MSA', url: 'https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/solidarite/prime-d-activite', mots: 'prime activite travail revenus' },
  { nom: 'Aide au logement', ref: 'en ligne CAF', url: 'https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/logement/aide-personnalisee-au-logement', mots: 'apl als alf logement loyer' },
  { nom: 'Dossier MDPH (AAH, RQTH, PCH…)', ref: 'Cerfa 15692', url: 'https://www.formulaires.service-public.fr/gf/cerfa_15692.do', mots: 'mdph handicap aah rqth pch' },
  { nom: "APA à domicile", ref: 'dossier départemental', url: 'https://www.service-public.fr/particuliers/vosdroits/F10009', mots: 'apa autonomie personne agee domicile' },
  { nom: 'Complémentaire santé solidaire', ref: 'en ligne ameli', url: 'https://www.ameli.fr/assure/droits-demarches/difficultes-acces-droits-soins/complementaire-sante', mots: 'css complementaire sante mutuelle cmu' },
  { nom: 'Dossier social étudiant (bourse, logement)', ref: 'messervices.etudiant.gouv.fr', url: 'https://www.messervices.etudiant.gouv.fr', mots: 'bourse crous etudiant dse logement' },
  { nom: 'Demande de subvention association', ref: 'Cerfa 12156', url: 'https://www.formulaires.service-public.fr/gf/cerfa_12156.do', mots: 'subvention association cerfa 12156 projet' },
  { nom: 'Le Compte Asso (dépôt en ligne)', ref: 'lecompteasso.associations.gouv.fr', url: 'https://lecompteasso.associations.gouv.fr', mots: 'association compte asso fdva subvention en ligne' },
  { nom: 'Inscription France Travail', ref: 'francetravail.fr', url: 'https://www.francetravail.fr/candidat/je-minscris.html', mots: 'chomage inscription emploi are france travail pole emploi' },
  { nom: 'Simulateur multi-aides officiel', ref: 'mes-aides.france-travail.fr / caf.fr', url: 'https://www.caf.fr/allocataires/mes-services-en-ligne/estimer-vos-droits', mots: 'simulateur simulation estimer droits' },
]

const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

// ── Pièces justificatives types ───────────────────────────────────────────
const PIECES: Record<string, { titre: string; pieces: string[] }> = {
  caf: { titre: 'Dossier CAF (RSA, prime d’activité, logement)', pieces: ["Pièce d'identité ou titre de séjour", 'RIB au nom du demandeur', 'Numéro de sécurité sociale', 'Revenus des 3 derniers mois (bulletins, attestations)', "Dernier avis d'imposition", 'Bail ou attestation de loyer (aide au logement)'] },
  mdph: { titre: 'Dossier MDPH', pieces: ['Formulaire Cerfa 15692 complété', 'Certificat médical Cerfa 15695 de moins d’un an', "Pièce d'identité", 'Justificatif de domicile', "Attestation de jugement de protection le cas échéant", 'Comptes rendus médicaux utiles'] },
  crous: { titre: 'Dossier social étudiant', pieces: ["Avis fiscal des parents (revenus N-2)", "Pièce d'identité", 'Certificat de scolarité ou inscription', 'RIB étudiant', 'Justificatifs de situation familiale si besoin (divorce, fratrie étudiante)'] },
  association: { titre: 'Demande de subvention association', pieces: ['Statuts à jour', 'Liste des dirigeants', 'Numéro RNA et SIRET', 'RIB de l’association', 'Budget prévisionnel de l’action', 'Derniers comptes approuvés', 'Rapport d’activité', 'Description du projet (objectifs, public, calendrier)'] },
  css: { titre: 'Complémentaire santé solidaire', pieces: ['Formulaire de demande (en ligne ou papier)', 'Ressources des 12 derniers mois du foyer', "Pièce d'identité", 'Justificatif de domicile'] },
}

// ════════════════════════════════════════════════════════════════════════════
export const CLARA_TOOLS: LocalTool[] = [
  {
    definition: {
      name: 'evaluer_situation',
      description:
        "Pré-diagnostic des aides possibles pour un particulier à partir de son profil. Renvoie pour chaque aide un statut (probable / à vérifier) et les raisons. N'appelle cet outil qu'après avoir obtenu au minimum la composition du foyer, l'activité et un ordre de grandeur des revenus.",
      input_schema: {
        type: 'object',
        properties: {
          age: { type: 'integer' },
          situation_familiale: { type: 'string', enum: ['seul', 'couple'] },
          enfants: { type: 'integer', minimum: 0 },
          ages_enfants: { type: 'array', items: { type: 'integer' } },
          activite: { type: 'string', enum: ['salarie', 'independant', 'sans_emploi', 'etudiant', 'retraite', 'autre'] },
          revenus_mensuels_foyer: { type: 'number', description: 'Revenus nets mensuels de tout le foyer, en euros' },
          logement: { type: 'string', enum: ['locataire', 'proprietaire_credit', 'proprietaire', 'heberge'] },
          handicap: { type: 'boolean' },
          perte_autonomie: { type: 'boolean' },
          inscrit_france_travail: { type: 'boolean' },
        },
      },
    },
    label: () => 'Analyse votre situation',
    async run(input, { emit }) {
      const p = input as Profil
      const verdicts = evaluer(p)
      emit({ type: 'card', kind: 'eligibility', data: { profil: p, aides: verdicts } })
      return {
        aides: verdicts.map(({ nom, statut, raisons }) => ({ nom, statut, raisons })),
        rappel: 'Pré-diagnostic indicatif. Vérifie les montants et plafonds actuels avec web_search avant de citer un chiffre.',
      }
    },
  },
  {
    definition: {
      name: 'evaluer_association',
      description: "Pré-diagnostic des financements et dispositifs accessibles à une association loi 1901.",
      input_schema: {
        type: 'object',
        properties: {
          salaries: { type: 'integer', minimum: 0 },
          interet_general: { type: 'boolean', description: "Reconnue d'intérêt général (peut émettre des reçus fiscaux)" },
          recrutement: { type: 'boolean', description: 'Projet de recrutement' },
          budget_annuel: { type: 'number' },
          objet: { type: 'string', description: "Domaine d'activité" },
        },
      },
    },
    label: () => 'Analyse les financements de votre association',
    async run(input, { emit }) {
      const p = input as Asso
      const aides = ASSO_DISPOSITIFS.map((d) => ({
        id: d.id, nom: d.nom, organisme: d.organisme, categorie: d.categorie, info: d.info,
        statut: (d.condition(p) ? 'probable' : 'a_verifier') as Statut,
        raisons: [d.raison],
      }))
      emit({ type: 'card', kind: 'eligibility', data: { profil: p, aides, association: true } })
      return { aides: aides.map(({ nom, statut, raisons }) => ({ nom, statut, raisons })) }
    },
  },
  {
    definition: {
      name: 'trouver_formulaire',
      description: 'Trouve le formulaire ou le service en ligne officiel pour une démarche (RSA, APL, MDPH, bourse, subvention…).',
      input_schema: { type: 'object', properties: { demarche: { type: 'string' } }, required: ['demarche'] },
    },
    label: (i) => `Cherche le formulaire officiel : ${i.demarche}`,
    async run(input, { emit }) {
      const terms = norm(String(input.demarche)).split(/[^a-z0-9]+/).filter((t) => t.length > 2)
      const hits = FORMULAIRES
        .map((f) => ({ f, s: terms.filter((t) => norm(f.nom + ' ' + f.mots).includes(t)).length }))
        .filter((x) => x.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 4)
        .map((x) => x.f)
      if (hits.length) emit({ type: 'card', kind: 'forms', data: { forms: hits } })
      return hits.length ? { formulaires: hits.map(({ nom, ref, url }) => ({ nom, ref, url })) } : { formulaires: [], note: 'Rien dans le catalogue : cherche sur service-public.fr.' }
    },
  },
  {
    definition: {
      name: 'liste_pieces',
      description: 'Affiche une liste de contrôle interactive des pièces justificatives à préparer.',
      input_schema: {
        type: 'object',
        properties: { dossier: { type: 'string', enum: Object.keys(PIECES) } },
        required: ['dossier'],
      },
    },
    label: () => 'Prépare la liste des pièces',
    async run(input, { emit }) {
      const d = PIECES[String(input.dossier)]
      if (!d) throw new Error('Dossier inconnu')
      emit({ type: 'card', kind: 'checklist', data: d })
      return { affiche: true, pieces: d.pieces }
    },
  },
]

export const CLARA_SERVER_TOOLS = [
  {
    type: 'web_search_20250305',
    name: 'web_search',
    max_uses: 4,
    allowed_domains: [
      'service-public.fr', 'caf.fr', 'msa.fr', 'ameli.fr', 'francetravail.fr', 'mesdroitssociaux.gouv.fr',
      'etudiant.gouv.fr', 'lescrous.fr', 'associations.gouv.fr', 'legifrance.gouv.fr', 'impots.gouv.fr',
      'monparcourshandicap.gouv.fr', 'info-retraite.fr', 'chequeenergie.gouv.fr', 'france-renov.gouv.fr',
      'laregion.fr', 'travail-emploi.gouv.fr', 'pour-les-personnes-agees.gouv.fr',
    ],
    user_location: { type: 'approximate', country: 'FR', timezone: 'Europe/Paris' },
  },
]

export function claraSystemPrompt() {
  const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' })
  return `Tu es **Clara**, la conseillère IA d'Aides Connect. Nous sommes le ${today}.
Tu aides particuliers et associations à repérer les aides auxquelles ils ont probablement droit, puis à passer à l'action.

# Déroulé
1. Écoute la situation. Pose au plus **2 questions courtes à la fois**, uniquement celles qui changent le diagnostic : composition du foyer (seul/couple, enfants et âges), activité, revenus nets mensuels du foyer (ordre de grandeur), logement, handicap/autonomie si pertinent.
2. Dès que tu as assez d'éléments → \`evaluer_situation\` (ou \`evaluer_association\`).
3. Pour les 2-3 aides les plus prometteuses, **vérifie en ligne** (\`web_search\`, domaines officiels uniquement) le montant ou le plafond en vigueur, puis cite-le avec sa date de référence.
4. Termine par l'action : \`trouver_formulaire\` et/ou \`liste_pieces\` pour la démarche prioritaire, et le simulateur officiel.

# Règles absolues
- Tu fais un **pré-diagnostic**, jamais une décision : la décision appartient à l'organisme (CAF, MDPH, CROUS…). Dis-le une fois, simplement.
- **Aucun montant de mémoire.** Un chiffre = une source officielle trouvée en ligne aujourd'hui, sinon renvoie au simulateur.
- Ne demande jamais de numéro de sécurité sociale, de RIB, d'identifiant ou de mot de passe. Si l'utilisateur en donne, dis-lui de ne pas les partager ici.
- Distingue ce qui est vérifié de ce qui est probable.
- Situation d'urgence (plus de logement, violences, plus rien pour manger) : donne d'abord le 115, le 3919 ou le CCAS de la commune, puis continue.

# Style
Français clair, chaleureux, sans jargon (explique chaque sigle la première fois). Phrases courtes, listes courtes. Les cartes affichées parlent d'elles-mêmes : ne les recopie pas, commente l'essentiel et la prochaine étape.`
}
