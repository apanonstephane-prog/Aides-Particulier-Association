import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const aidesData: Record<string, {
  label: string;
  icon: string;
  color: string;
  aides: {
    nom: string;
    organisme: string;
    montant: string;
    description: string;
    conditions: string[];
    categorie: string;
    catColor: string;
    urgent?: boolean;
    lienFormulaire?: string;
    lienInfo?: string;
  }[];
}> = {
  celibataire: {
    label: "Célibataire",
    icon: "👤",
    color: "from-blue-600 to-cyan-600",
    aides: [
      {
        nom: "Prime d'activité",
        organisme: "CAF / MSA",
        montant: "Jusqu'à 635 €/mois",
        description: "Complément de revenus pour les travailleurs aux faibles revenus, salariés ou indépendants.",
        conditions: ["Avoir plus de 18 ans", "Exercer une activité professionnelle", "Résider en France"],
        categorie: "Emploi",
        catColor: "bg-green-100 text-green-700",
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/solidarite/prime-d-activite",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F2882",
      },
      {
        nom: "APL — Aide Personnalisée au Logement",
        organisme: "CAF",
        montant: "Variable selon situation",
        description: "Aide au paiement du loyer ou des mensualités d'emprunt immobilier.",
        conditions: ["Être locataire ou propriétaire", "Le logement doit être votre résidence principale", "Revenus sous conditions"],
        categorie: "Logement",
        catColor: "bg-blue-100 text-blue-700",
        urgent: true,
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/logement/aide-personnalisee-au-logement",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F12006",
      },
      {
        nom: "RSA — Revenu de Solidarité Active",
        organisme: "CAF",
        montant: "607,75 €/mois",
        description: "Garantit un revenu minimum aux personnes sans ressources ou à très faibles revenus.",
        conditions: ["Être âgé de 25 ans ou plus", "Résider en France de manière stable", "Ressources inférieures au plafond"],
        categorie: "Social",
        catColor: "bg-purple-100 text-purple-700",
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/solidarite/revenu-de-solidarite-active-rsa",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/N19775",
      },
      {
        nom: "Aide à la mutuelle (CSS)",
        organisme: "Assurance Maladie",
        montant: "Gratuit ou participation réduite",
        description: "Complémentaire santé solidaire pour les personnes aux revenus modestes.",
        conditions: ["Ressources inférieures au plafond", "Résider en France de manière stable"],
        categorie: "Santé",
        catColor: "bg-red-100 text-red-700",
        lienFormulaire: "https://www.ameli.fr/assure/droits-demarches/difficultes-acces-soins/complementaire-sante-solidaire",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F10027",
      },
      {
        nom: "Chèque énergie",
        organisme: "ANAH",
        montant: "48 à 277 €/an",
        description: "Aide automatique pour payer les dépenses d'énergie du logement.",
        conditions: ["Revenus fiscaux de référence inférieurs au plafond", "Attribution automatique par l'administration"],
        categorie: "Énergie",
        catColor: "bg-yellow-100 text-yellow-700",
        lienInfo: "https://www.chequeenergie.gouv.fr/beneficiaire/eligibilite",
        lienFormulaire: "https://www.chequeenergie.gouv.fr/beneficiaire/eligibilite",
      },
      {
        nom: "Garantie Visale",
        organisme: "Action Logement",
        montant: "Caution locative gratuite",
        description: "Caution locative gratuite pour faciliter l'accès au logement.",
        conditions: ["Être salarié ou jeune de moins de 30 ans", "Ne pas être propriétaire"],
        categorie: "Logement",
        catColor: "bg-blue-100 text-blue-700",
        lienFormulaire: "https://www.visale.fr/",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F34708",
      },
      {
        nom: "Aide à la recherche du premier emploi (ARPE)",
        organisme: "CAF",
        montant: "Jusqu'à 215 €/mois",
        description: "Aide versée aux jeunes diplômés en recherche de leur premier emploi.",
        conditions: ["Avoir moins de 28 ans", "Être diplômé de l'enseignement supérieur"],
        categorie: "Emploi",
        catColor: "bg-green-100 text-green-700",
        lienFormulaire: "https://www.caf.fr",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F34025",
      },
    ],
  },
  "couple-sans-enfants": {
    label: "Couple sans enfants",
    icon: "👫",
    color: "from-indigo-600 to-blue-600",
    aides: [
      {
        nom: "APL — Aide Personnalisée au Logement",
        organisme: "CAF",
        montant: "Variable selon revenus",
        description: "Aide au paiement du loyer calculée selon les revenus du foyer.",
        conditions: ["Être locataire ou accédant à la propriété", "Logement en résidence principale", "Revenus sous conditions"],
        categorie: "Logement",
        catColor: "bg-blue-100 text-blue-700",
        urgent: true,
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/logement/aide-personnalisee-au-logement",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F12006",
      },
      {
        nom: "Prime d'activité",
        organisme: "CAF",
        montant: "Variable selon revenus du foyer",
        description: "Complément de revenus pour les foyers à faibles revenus.",
        conditions: ["Au moins un actif dans le foyer", "Revenus faibles"],
        categorie: "Emploi",
        catColor: "bg-green-100 text-green-700",
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/solidarite/prime-d-activite",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F2882",
      },
      {
        nom: "Chèque énergie",
        organisme: "ANAH",
        montant: "48 à 277 €/an",
        description: "Aide automatique pour payer les dépenses d'énergie du logement.",
        conditions: ["Revenus fiscaux inférieurs au plafond"],
        categorie: "Énergie",
        catColor: "bg-yellow-100 text-yellow-700",
        lienFormulaire: "https://www.chequeenergie.gouv.fr/beneficiaire/eligibilite",
        lienInfo: "https://www.chequeenergie.gouv.fr/",
      },
      {
        nom: "MaPrimeRénov'",
        organisme: "ANAH",
        montant: "Jusqu'à 70% des travaux",
        description: "Aide à la rénovation énergétique du logement.",
        conditions: ["Être propriétaire", "Travaux éligibles"],
        categorie: "Logement",
        catColor: "bg-blue-100 text-blue-700",
        lienFormulaire: "https://www.maprimerenov.gouv.fr/",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F35083",
      },
      {
        nom: "Complémentaire santé solidaire (CSS)",
        organisme: "Assurance Maladie",
        montant: "Gratuit ou participation réduite",
        description: "Mutuelle gratuite ou à tarif réduit pour les foyers à faibles revenus.",
        conditions: ["Revenus du foyer inférieurs au plafond"],
        categorie: "Santé",
        catColor: "bg-red-100 text-red-700",
        lienFormulaire: "https://www.ameli.fr/assure/droits-demarches/difficultes-acces-soins/complementaire-sante-solidaire",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F10027",
      },
    ],
  },
  "couple-enfants": {
    label: "Couple avec enfants",
    icon: "👨‍👩‍👧",
    color: "from-purple-600 to-indigo-600",
    aides: [
      {
        nom: "Allocations familiales",
        organisme: "CAF",
        montant: "À partir de 141 €/mois",
        description: "Aide mensuelle versée aux familles ayant au moins 2 enfants à charge.",
        conditions: ["Avoir au moins 2 enfants à charge de moins de 20 ans", "Résider en France"],
        categorie: "Famille",
        catColor: "bg-pink-100 text-pink-700",
        urgent: true,
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/famille/allocations-familiales",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F13213",
      },
      {
        nom: "Complément de libre choix du mode de garde",
        organisme: "CAF",
        montant: "Jusqu'à 1 420 €/mois",
        description: "Aide pour financer la garde d'un enfant de moins de 6 ans.",
        conditions: ["Avoir un enfant de moins de 6 ans", "Emploi d'une assistante maternelle agréée ou crèche"],
        categorie: "Famille",
        catColor: "bg-pink-100 text-pink-700",
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/famille/la-prestation-accueil-du-jeune-enfant-paje",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F345",
      },
      {
        nom: "APL — Aide Personnalisée au Logement",
        organisme: "CAF",
        montant: "Variable selon revenus",
        description: "Aide au paiement du loyer calculée selon vos revenus et la composition familiale.",
        conditions: ["Être locataire ou accédant à la propriété", "Logement en résidence principale"],
        categorie: "Logement",
        catColor: "bg-blue-100 text-blue-700",
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/logement/aide-personnalisee-au-logement",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F12006",
      },
      {
        nom: "Allocation de rentrée scolaire (ARS)",
        organisme: "CAF",
        montant: "Jusqu'à 428 €/enfant",
        description: "Aide versée en août pour couvrir les frais de rentrée scolaire.",
        conditions: ["Enfant de 6 à 18 ans scolarisé", "Revenus inférieurs au plafond CAF"],
        categorie: "Éducation",
        catColor: "bg-indigo-100 text-indigo-700",
        urgent: true,
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/famille/allocation-de-rentree-scolaire-ars",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F1878",
      },
      {
        nom: "Crédit d'impôt garde d'enfants",
        organisme: "Impôts",
        montant: "50% des frais, jusqu'à 1 150 €",
        description: "Réduction fiscale pour les frais de garde d'enfants de moins de 6 ans.",
        conditions: ["Enfant de moins de 6 ans", "Frais de garde hors du domicile"],
        categorie: "Fiscal",
        catColor: "bg-slate-100 text-slate-700",
        lienFormulaire: "https://www.impots.gouv.fr/particulier/les-frais-de-garde-des-enfants",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F8",
      },
      {
        nom: "Prestation Accueil Jeune Enfant (PAJE)",
        organisme: "CAF",
        montant: "Variable",
        description: "Ensemble de prestations pour la naissance et l'accueil du jeune enfant.",
        conditions: ["Naissance ou adoption d'un enfant", "Revenus sous conditions"],
        categorie: "Famille",
        catColor: "bg-pink-100 text-pink-700",
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/famille/la-prestation-accueil-du-jeune-enfant-paje",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/N157",
      },
    ],
  },
  "parent-isole": {
    label: "Parent isolé",
    icon: "🧑‍👧",
    color: "from-rose-600 to-pink-600",
    aides: [
      {
        nom: "Allocation de soutien familial (ASF)",
        organisme: "CAF",
        montant: "181 €/mois par enfant",
        description: "Aide versée aux parents qui élèvent seuls leur(s) enfant(s).",
        conditions: ["Élever seul un enfant de moins de 20 ans", "Absence de l'autre parent ou non versement de pension"],
        categorie: "Famille",
        catColor: "bg-pink-100 text-pink-700",
        urgent: true,
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/famille/allocation-de-soutien-familial-asf",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F815",
      },
      {
        nom: "RSA majoré parent isolé",
        organisme: "CAF",
        montant: "Majoration de 130 €",
        description: "Majoration du RSA pour les parents isolés.",
        conditions: ["Bénéficier du RSA", "Élever seul au moins un enfant à charge"],
        categorie: "Social",
        catColor: "bg-purple-100 text-purple-700",
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/solidarite/revenu-de-solidarite-active-rsa",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/N19775",
      },
      {
        nom: "APL renforcée famille monoparentale",
        organisme: "CAF",
        montant: "Majoration famille monoparentale",
        description: "L'APL tient compte de la situation de parent isolé pour un calcul plus favorable.",
        conditions: ["Être locataire ou accédant à la propriété", "Avoir des enfants à charge"],
        categorie: "Logement",
        catColor: "bg-blue-100 text-blue-700",
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/logement/aide-personnalisee-au-logement",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F12006",
      },
      {
        nom: "Allocation de rentrée scolaire (ARS)",
        organisme: "CAF",
        montant: "Jusqu'à 428 €/enfant",
        description: "Aide versée en août pour couvrir les frais de rentrée scolaire.",
        conditions: ["Enfant de 6 à 18 ans scolarisé", "Revenus inférieurs au plafond"],
        categorie: "Éducation",
        catColor: "bg-indigo-100 text-indigo-700",
        urgent: true,
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/famille/allocation-de-rentree-scolaire-ars",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F1878",
      },
      {
        nom: "Intermédiation des pensions alimentaires",
        organisme: "CAF / MSA",
        montant: "Service gratuit",
        description: "La CAF collecte la pension alimentaire auprès de l'autre parent et vous la verse.",
        conditions: ["Décision de justice fixant la pension", "Demande auprès de la CAF"],
        categorie: "Juridique",
        catColor: "bg-amber-100 text-amber-700",
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/famille/intermediation-financiere-des-pensions-alimentaires",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F32ça",
      },
      {
        nom: "Allocation familiale monoparentale",
        organisme: "CAF",
        montant: "Variable",
        description: "Complément pour les familles monoparentales selon les revenus.",
        conditions: ["Avoir des enfants à charge", "Ressources inférieures au plafond"],
        categorie: "Famille",
        catColor: "bg-pink-100 text-pink-700",
        lienFormulaire: "https://www.caf.fr",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F13213",
      },
    ],
  },
  retraite: {
    label: "Retraité(e)",
    icon: "👴",
    color: "from-teal-600 to-green-600",
    aides: [
      {
        nom: "ASPA — Allocation de Solidarité aux Personnes Âgées",
        organisme: "Caisse de retraite",
        montant: "Jusqu'à 1 012 €/mois",
        description: "Minimum vieillesse garanti aux retraités aux ressources insuffisantes.",
        conditions: ["Avoir 65 ans ou plus", "Ressources inférieures au plafond", "Résider en France"],
        categorie: "Retraite",
        catColor: "bg-teal-100 text-teal-700",
        urgent: true,
        lienFormulaire: "https://www.lassuranceretraite.fr/portail-services-ei/accueil.html",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F16871",
      },
      {
        nom: "APA — Allocation Personnalisée d'Autonomie",
        organisme: "Conseil Départemental",
        montant: "Jusqu'à 1 775 €/mois",
        description: "Aide pour financer les dépenses liées à la perte d'autonomie.",
        conditions: ["Avoir 60 ans ou plus", "Être en perte d'autonomie (GIR 1 à 4)"],
        categorie: "Autonomie",
        catColor: "bg-green-100 text-green-700",
        lienFormulaire: "https://www.pour-les-personnes-agees.gouv.fr/aides-et-aides-financieres/lallocation-personnalisee-dautonomie-apa",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F10009",
      },
      {
        nom: "Chèque énergie",
        organisme: "ANAH",
        montant: "48 à 277 €/an",
        description: "Aide pour payer les dépenses d'énergie, automatiquement attribuée.",
        conditions: ["Revenus fiscaux inférieurs au plafond"],
        categorie: "Énergie",
        catColor: "bg-yellow-100 text-yellow-700",
        lienFormulaire: "https://www.chequeenergie.gouv.fr/beneficiaire/eligibilite",
        lienInfo: "https://www.chequeenergie.gouv.fr/",
      },
      {
        nom: "MaPrimeRénov' Senior",
        organisme: "ANAH",
        montant: "Jusqu'à 70% des travaux",
        description: "Aide à la rénovation énergétique du logement pour les seniors.",
        conditions: ["Être propriétaire", "Revenus modestes", "Travaux éligibles"],
        categorie: "Logement",
        catColor: "bg-blue-100 text-blue-700",
        lienFormulaire: "https://www.maprimerenov.gouv.fr/",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F35083",
      },
      {
        nom: "Aide ménagère à domicile",
        organisme: "CCAS / Mairie",
        montant: "Variable",
        description: "Aide pour les tâches ménagères et l'accompagnement à domicile.",
        conditions: ["Avoir plus de 65 ans", "Difficultés pour les tâches du quotidien"],
        categorie: "Autonomie",
        catColor: "bg-green-100 text-green-700",
        lienFormulaire: "https://www.pour-les-personnes-agees.gouv.fr/",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F246",
      },
      {
        nom: "Tarif social gaz et électricité",
        organisme: "Fournisseurs énergie",
        montant: "Réduction sur facture",
        description: "Réduction automatique sur les factures d'énergie.",
        conditions: ["Bénéficiaire du chèque énergie", "Attribution automatique"],
        categorie: "Énergie",
        catColor: "bg-yellow-100 text-yellow-700",
        lienFormulaire: "https://www.chequeenergie.gouv.fr/beneficiaire/eligibilite",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F10580",
      },
    ],
  },
  handicap: {
    label: "En situation de handicap",
    icon: "♿",
    color: "from-sky-600 to-blue-600",
    aides: [
      {
        nom: "AAH — Allocation Adulte Handicapé",
        organisme: "CAF / MSA",
        montant: "Jusqu'à 971 €/mois",
        description: "Revenu minimum pour les personnes en situation de handicap.",
        conditions: ["Être âgé de 20 à 60 ans", "Taux d'incapacité ≥ 80% ou entre 50-79% avec restriction d'emploi", "Résider en France"],
        categorie: "Handicap",
        catColor: "bg-sky-100 text-sky-700",
        urgent: true,
        lienFormulaire: "https://www.monparcourshandicap.gouv.fr/aides/allocation-adulte-handicape-aah",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F12242",
      },
      {
        nom: "PCH — Prestation de Compensation du Handicap",
        organisme: "MDPH",
        montant: "Jusqu'à 1 820 €/mois",
        description: "Aide personnalisée pour financer les besoins liés au handicap.",
        conditions: ["Avoir moins de 60 ans", "Difficulté absolue pour une activité ou grave pour deux"],
        categorie: "Handicap",
        catColor: "bg-sky-100 text-sky-700",
        lienFormulaire: "https://www.monparcourshandicap.gouv.fr/aides/prestation-de-compensation-du-handicap-pch",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F14201",
      },
      {
        nom: "Carte Mobilité Inclusion (CMI)",
        organisme: "MDPH",
        montant: "Gratuit (carte)",
        description: "Carte donnant accès à des droits et avantages (priorité, stationnement, réductions).",
        conditions: ["Taux d'incapacité ≥ 80% ou difficultés de déplacement"],
        categorie: "Mobilité",
        catColor: "bg-indigo-100 text-indigo-700",
        lienFormulaire: "https://www.monparcourshandicap.gouv.fr/aides/carte-mobilite-inclusion-cmi",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F15066",
      },
      {
        nom: "AEEH — Allocation Éducation Enfant Handicapé",
        organisme: "CAF",
        montant: "Jusqu'à 1 247 €/mois",
        description: "Aide pour les parents d'enfants en situation de handicap.",
        conditions: ["Enfant de moins de 20 ans", "Taux d'incapacité ≥ 80%"],
        categorie: "Famille",
        catColor: "bg-pink-100 text-pink-700",
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/enfance/allocation-d-education-de-l-enfant-handicape-aeeh",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F14809",
      },
      {
        nom: "Aide à l'aménagement du logement",
        organisme: "ANAH",
        montant: "Jusqu'à 50% des travaux",
        description: "Financement des travaux d'adaptation du logement pour l'autonomie.",
        conditions: ["Être propriétaire ou locataire avec accord du bailleur", "Taux d'incapacité reconnu"],
        categorie: "Logement",
        catColor: "bg-blue-100 text-blue-700",
        lienFormulaire: "https://www.anah.gouv.fr/mes-projets/je-suis-proprietaire-occupant/adaptation-du-logement-au-handicap-ou-a-la-perte-dautonomie/",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F1328",
      },
      {
        nom: "ACTP — Allocation Compensatrice pour Tierce Personne",
        organisme: "Conseil Départemental",
        montant: "Variable",
        description: "Aide pour financer l'aide humaine pour les actes essentiels.",
        conditions: ["Avoir plus de 60 ans ou ne pas remplir les conditions PCH"],
        categorie: "Handicap",
        catColor: "bg-sky-100 text-sky-700",
        lienFormulaire: "https://www.monparcourshandicap.gouv.fr/",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F2475",
      },
    ],
  },
  etudiant: {
    label: "Étudiant(e)",
    icon: "🎓",
    color: "from-violet-600 to-purple-600",
    aides: [
      {
        nom: "Bourse sur critères sociaux (BCS)",
        organisme: "CROUS / MESRI",
        montant: "Jusqu'à 6 335 €/an",
        description: "Bourse d'études selon les revenus des parents et l'éloignement du domicile.",
        conditions: ["Inscrit dans un établissement d'enseignement supérieur", "Critères sociaux selon barème national"],
        categorie: "Études",
        catColor: "bg-violet-100 text-violet-700",
        urgent: true,
        lienFormulaire: "https://www.messervices.etudiant.gouv.fr/envoi/",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F12598",
      },
      {
        nom: "APL Étudiant",
        organisme: "CAF",
        montant: "Variable selon loyer",
        description: "Aide au logement pour les étudiants locataires.",
        conditions: ["Être locataire", "Logement en résidence principale", "Revenus modestes"],
        categorie: "Logement",
        catColor: "bg-blue-100 text-blue-700",
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/logement/aide-personnalisee-au-logement",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F12006",
      },
      {
        nom: "Aide d'urgence CROUS",
        organisme: "CROUS",
        montant: "Jusqu'à 5 fois le montant mensuel de bourse",
        description: "Aide d'urgence ponctuelle pour les étudiants en grande difficulté financière.",
        conditions: ["Être étudiant inscrit", "Se retrouver en situation d'urgence financière"],
        categorie: "Urgence",
        catColor: "bg-red-100 text-red-700",
        lienFormulaire: "https://www.etudiant.gouv.fr/fr/aide-durgence-1553",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F22573",
      },
      {
        nom: "Complémentaire Santé Solidaire (CSS)",
        organisme: "Assurance Maladie",
        montant: "Gratuit ou participation réduite",
        description: "Mutuelle gratuite ou à tarif réduit pour les étudiants à faibles ressources.",
        conditions: ["Ressources inférieures au plafond", "Pas déjà couvert par une autre mutuelle"],
        categorie: "Santé",
        catColor: "bg-red-100 text-red-700",
        lienFormulaire: "https://www.ameli.fr/assure/droits-demarches/difficultes-acces-soins/complementaire-sante-solidaire",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F10027",
      },
      {
        nom: "Aide à la mobilité Parcoursup",
        organisme: "Ministère Éducation",
        montant: "1 000 €",
        description: "Aide unique pour les bacheliers boursiers qui s'éloignent pour leurs études.",
        conditions: ["Être bachelier boursier", "Déménager à plus de 50km du domicile"],
        categorie: "Mobilité",
        catColor: "bg-orange-100 text-orange-700",
        lienFormulaire: "https://www.etudiant.gouv.fr/fr/aide-la-mobilite-en-master-769",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F34214",
      },
      {
        nom: "Aide au permis de conduire",
        organisme: "Région / État",
        montant: "Jusqu'à 1 200 €",
        description: "Aide au financement du permis B pour les jeunes.",
        conditions: ["Avoir entre 17 et 25 ans", "Ressources inférieures au plafond selon région"],
        categorie: "Mobilité",
        catColor: "bg-orange-100 text-orange-700",
        lienFormulaire: "https://www.service-public.fr/particuliers/vosdroits/F2828",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F2828",
      },
    ],
  },
  "demandeur-emploi": {
    label: "Demandeur d'emploi",
    icon: "💼",
    color: "from-yellow-600 to-amber-600",
    aides: [
      {
        nom: "ARE — Allocation Retour à l'Emploi",
        organisme: "France Travail",
        montant: "57% à 75% du salaire brut",
        description: "Indemnisation chômage versée aux personnes involontairement privées d'emploi.",
        conditions: ["Avoir travaillé au moins 6 mois sur les 24 derniers mois", "Inscrit à France Travail", "Recherche active d'emploi"],
        categorie: "Emploi",
        catColor: "bg-yellow-100 text-yellow-700",
        urgent: true,
        lienFormulaire: "https://www.francetravail.fr/accueil/mes-demarches/l-indemnisation-par-france-travail/l-allocation-d-aide-au-retour-a-l-emploi-are.html",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F14860",
      },
      {
        nom: "RSA — Revenu de Solidarité Active",
        organisme: "CAF",
        montant: "607,75 €/mois",
        description: "Garantit un revenu minimum si vous n'avez plus de droits à l'ARE.",
        conditions: ["Avoir plus de 25 ans", "Ressources inférieures au plafond"],
        categorie: "Social",
        catColor: "bg-purple-100 text-purple-700",
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/solidarite/revenu-de-solidarite-active-rsa",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/N19775",
      },
      {
        nom: "Aide à la formation (CPF)",
        organisme: "France Travail / CDC",
        montant: "Variable selon formation",
        description: "Financement de formations pour améliorer vos compétences.",
        conditions: ["Être demandeur d'emploi inscrit", "Formation éligible au CPF ou POE"],
        categorie: "Formation",
        catColor: "bg-green-100 text-green-700",
        lienFormulaire: "https://www.moncompteformation.gouv.fr/espace/public/",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F10705",
      },
      {
        nom: "ACRE — Aide à la Création d'Entreprise",
        organisme: "URSSAF",
        montant: "Exonération de cotisations",
        description: "Exonération partielle de cotisations sociales lors de la création d'entreprise.",
        conditions: ["Être demandeur d'emploi", "Créer ou reprendre une entreprise"],
        categorie: "Création",
        catColor: "bg-indigo-100 text-indigo-700",
        lienFormulaire: "https://www.urssaf.fr/home/independant/mes-aides-et-mois/acre.html",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F11677",
      },
      {
        nom: "APL",
        organisme: "CAF",
        montant: "Variable",
        description: "Aide au logement maintenue ou ouverte pendant la recherche d'emploi.",
        conditions: ["Être locataire ou accédant à la propriété", "Logement en résidence principale"],
        categorie: "Logement",
        catColor: "bg-blue-100 text-blue-700",
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/logement/aide-personnalisee-au-logement",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F12006",
      },
    ],
  },
  "famille-nombreuse": {
    label: "Famille nombreuse",
    icon: "👨‍👩‍👧‍👦",
    color: "from-orange-600 to-amber-600",
    aides: [
      {
        nom: "Allocations familiales majorées",
        organisme: "CAF",
        montant: "À partir de 527 €/mois pour 3 enfants",
        description: "Les allocations familiales sont majorées pour les familles avec 3 enfants ou plus.",
        conditions: ["Avoir au moins 3 enfants à charge de moins de 20 ans"],
        categorie: "Famille",
        catColor: "bg-orange-100 text-orange-700",
        urgent: true,
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/famille/allocations-familiales",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F13213",
      },
      {
        nom: "Carte Famille Nombreuse SNCF",
        organisme: "SNCF",
        montant: "30 à 75% de réduction",
        description: "Réductions importantes sur les voyages en train pour toute la famille.",
        conditions: ["Avoir 3 enfants ou plus de moins de 18 ans"],
        categorie: "Transport",
        catColor: "bg-amber-100 text-amber-700",
        lienFormulaire: "https://www.sncf-connect.com/aide/carte-famille-nombreuse",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F33699",
      },
      {
        nom: "Complément familial",
        organisme: "CAF",
        montant: "Jusqu'à 501 €/mois",
        description: "Aide versée aux familles de 3 enfants ou plus ayant de faibles revenus.",
        conditions: ["Avoir au moins 3 enfants de 3 à 21 ans", "Ressources inférieures au plafond"],
        categorie: "Famille",
        catColor: "bg-orange-100 text-orange-700",
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/famille/complement-familial",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F13214",
      },
      {
        nom: "APL majorée famille nombreuse",
        organisme: "CAF",
        montant: "Majoration selon nb d'enfants",
        description: "L'APL est calculée en tenant compte du nombre d'enfants.",
        conditions: ["Être locataire ou accédant à la propriété", "Enfants à charge"],
        categorie: "Logement",
        catColor: "bg-blue-100 text-blue-700",
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/logement/aide-personnalisee-au-logement",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F12006",
      },
      {
        nom: "Allocation de rentrée scolaire (ARS)",
        organisme: "CAF",
        montant: "Jusqu'à 428 €/enfant/an",
        description: "Aide versée pour chaque enfant scolarisé lors de la rentrée.",
        conditions: ["Chaque enfant de 6 à 18 ans scolarisé", "Revenus inférieurs au plafond"],
        categorie: "Éducation",
        catColor: "bg-indigo-100 text-indigo-700",
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/famille/allocation-de-rentree-scolaire-ars",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F1878",
      },
      {
        nom: "Réductions fiscales famille nombreuse",
        organisme: "Impôts",
        montant: "Demi-parts supplémentaires",
        description: "Chaque enfant à charge ouvre droit à une demi-part supplémentaire.",
        conditions: ["Enfants à charge au sens fiscal"],
        categorie: "Fiscal",
        catColor: "bg-slate-100 text-slate-700",
        lienFormulaire: "https://www.impots.gouv.fr/particulier/les-enfants-a-charge",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F2705",
      },
    ],
  },
  "travailleur-precaire": {
    label: "Travailleur précaire",
    icon: "🔄",
    color: "from-lime-600 to-green-600",
    aides: [
      {
        nom: "Prime d'activité",
        organisme: "CAF",
        montant: "Jusqu'à 635 €/mois",
        description: "Complément de revenus pour les travailleurs aux faibles revenus.",
        conditions: ["Exercer une activité professionnelle", "Revenus faibles"],
        categorie: "Emploi",
        catColor: "bg-green-100 text-green-700",
        urgent: true,
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/solidarite/prime-d-activite",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F2882",
      },
      {
        nom: "APL",
        organisme: "CAF",
        montant: "Variable",
        description: "Aide au logement calculée sur vos revenus réels.",
        conditions: ["Être locataire", "Logement en résidence principale"],
        categorie: "Logement",
        catColor: "bg-blue-100 text-blue-700",
        lienFormulaire: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/logement/aide-personnalisee-au-logement",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F12006",
      },
      {
        nom: "Compte Personnel de Formation (CPF)",
        organisme: "CDC",
        montant: "500 €/an (plafonné à 5 000 €)",
        description: "Financement de formations professionnelles.",
        conditions: ["Être salarié, même en CDD ou temps partiel"],
        categorie: "Formation",
        catColor: "bg-lime-100 text-lime-700",
        lienFormulaire: "https://www.moncompteformation.gouv.fr/espace/public/",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F10705",
      },
      {
        nom: "Garantie Visale",
        organisme: "Action Logement",
        montant: "Caution locative gratuite",
        description: "Caution locative gratuite pour les salariés et jeunes actifs.",
        conditions: ["Être salarié ou avoir moins de 30 ans", "CDD, intérim accepté"],
        categorie: "Logement",
        catColor: "bg-blue-100 text-blue-700",
        lienFormulaire: "https://www.visale.fr/",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F34708",
      },
      {
        nom: "Mutuelle d'entreprise obligatoire",
        organisme: "Employeur",
        montant: "50% pris en charge",
        description: "L'employeur doit proposer et financer 50% d'une complémentaire santé.",
        conditions: ["Être salarié, y compris CDD"],
        categorie: "Santé",
        catColor: "bg-red-100 text-red-700",
        lienFormulaire: "https://www.ameli.fr/assure/droits-demarches/employeur/maladie/complementaire-sante-obligatoire",
        lienInfo: "https://www.service-public.fr/particuliers/vosdroits/F20739",
      },
    ],
  },
};

interface PageProps {
  params: Promise<{ situation: string }>;
}

export default async function ResultatsParticuliersPage({ params }: PageProps) {
  const { situation } = await params;
  const data = aidesData[situation];

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Situation non trouvée</h1>
          <Link href="/particuliers" className="text-blue-600 hover:underline">← Retour aux situations</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const urgentAides = data.aides.filter(a => a.urgent);
  const autresAides = data.aides.filter(a => !a.urgent);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className={`relative pt-24 pb-14 overflow-hidden bg-gradient-to-br ${data.color}`}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 0%, transparent 60%)" }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/particuliers" className="hover:text-white transition-colors">Particuliers</Link>
            <span>/</span>
            <span className="text-white">{data.label}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{data.icon}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
              Aides pour : {data.label}
            </h1>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            Nous avons trouvé <span className="font-bold text-white">{data.aides.length} aides</span> correspondant à votre situation
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {Array.from(new Set(data.aides.map(a => a.categorie))).map((cat, i) => (
              <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/20">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Bandeau assistant */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-amber-800">
            <span className="text-xl">🤖</span>
            <span>Vous avez des difficultés à remplir vos dossiers ? Notre assistant peut vous aider.</span>
          </div>
          <Link href="/assistant" className="flex-shrink-0 px-4 py-1.5 bg-amber-500 text-white text-sm font-semibold rounded-lg hover:bg-amber-600 transition-colors">
            Utiliser l&apos;assistant
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* Aides prioritaires */}
        {urgentAides.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-2xl">⭐</span>
              <h2 className="text-xl font-bold text-slate-800">Aides prioritaires — À demander en premier</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {urgentAides.map((aide, i) => (
                <div key={i} className="bg-white rounded-2xl border-2 border-amber-200 shadow-md p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-amber-400 text-white text-xs font-bold rounded-bl-xl">
                    PRIORITAIRE
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${aide.catColor} mb-3 inline-block`}>
                    {aide.categorie}
                  </span>
                  <h3 className="font-bold text-slate-800 text-base mb-1">{aide.nom}</h3>
                  <p className="text-sm text-slate-500 mb-3">{aide.organisme}</p>
                  <p className="text-2xl font-extrabold text-slate-800 mb-3">{aide.montant}</p>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{aide.description}</p>
                  <div className="space-y-1.5 mb-5">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Conditions :</p>
                    {aide.conditions.map((c, j) => (
                      <div key={j} className="flex items-start gap-2 text-xs text-slate-600">
                        <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {c}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                    {aide.lienFormulaire && (
                      <a href={aide.lienFormulaire} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        Faire ma demande
                      </a>
                    )}
                    {aide.lienInfo && (
                      <a href={aide.lienInfo} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        En savoir plus
                      </a>
                    )}
                    <Link href="/assistant"
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-amber-200 bg-amber-50 text-amber-700 text-xs font-medium rounded-lg hover:bg-amber-100 transition-colors">
                      🤖 Aide au remplissage
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Toutes les aides */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <span className="text-2xl">📋</span>
            <h2 className="text-xl font-bold text-slate-800">
              {urgentAides.length > 0 ? "Autres aides disponibles" : "Toutes vos aides"}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {autresAides.map((aide, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all p-6">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${aide.catColor} mb-3 inline-block`}>
                  {aide.categorie}
                </span>
                <h3 className="font-bold text-slate-800 text-base mb-1">{aide.nom}</h3>
                <p className="text-sm text-slate-500 mb-3">{aide.organisme}</p>
                <p className="text-xl font-extrabold text-slate-800 mb-3">{aide.montant}</p>
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">{aide.description}</p>
                <div className="space-y-1.5 mb-5">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Conditions :</p>
                  {aide.conditions.map((c, j) => (
                    <div key={j} className="flex items-start gap-2 text-xs text-slate-600">
                      <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {c}
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                  {aide.lienFormulaire && (
                    <a href={aide.lienFormulaire} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      Faire ma demande
                    </a>
                  )}
                  {aide.lienInfo && (
                    <a href={aide.lienInfo} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-50 transition-colors">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      En savoir plus
                    </a>
                  )}
                  <Link href="/assistant"
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-amber-200 bg-amber-50 text-amber-700 text-xs font-medium rounded-lg hover:bg-amber-100 transition-colors">
                    🤖 Aide au remplissage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Retour */}
        <div className="flex flex-col sm:flex-row gap-4 items-center pt-4">
          <Link
            href="/particuliers"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Changer de situation
          </Link>
          <p className="text-xs text-slate-400">
            Les montants indiqués sont donnés à titre indicatif. Rapprochez-vous des organismes compétents pour une évaluation précise.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
