import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const subventionsData: Record<string, {
  label: string;
  icon: string;
  color: string;
  subventions: {
    nom: string;
    organisme: string;
    montant: string;
    description: string;
    conditions: string[];
    categorie: string;
    catColor: string;
    prioritaire?: boolean;
    periodicite?: string;
  }[];
}> = {
  "loi-1901": {
    label: "Association Loi 1901",
    icon: "📝",
    color: "from-blue-600 to-indigo-600",
    subventions: [
      {
        nom: "FDVA — Fonds pour le Développement de la Vie Associative",
        organisme: "État / Préfecture",
        montant: "1 000 à 50 000 €",
        description: "Soutien au fonctionnement des associations et financement de formations des bénévoles.",
        conditions: ["Être une association loi 1901", "Ne pas recevoir de subventions locales supérieures au seuil", "Déposer un dossier auprès de la préfecture"],
        categorie: "État",
        catColor: "bg-blue-100 text-blue-700",
        prioritaire: true,
        periodicite: "Annuel",
      },
      {
        nom: "Subvention municipale de fonctionnement",
        organisme: "Mairie / CCAS",
        montant: "100 à 10 000 €",
        description: "Aide au fonctionnement courant accordée par la commune où l'association est déclarée.",
        conditions: ["Siège social dans la commune", "Activité bénéficiant aux habitants", "Dossier de subvention annuel"],
        categorie: "Collectivité",
        catColor: "bg-indigo-100 text-indigo-700",
        prioritaire: true,
        periodicite: "Annuel",
      },
      {
        nom: "DLA — Dispositif Local d'Accompagnement",
        organisme: "AVISE / DREETS",
        montant: "Accompagnement gratuit (valeur 5 000 à 20 000 €)",
        description: "Accompagnement professionnel gratuit pour renforcer le projet et consolider l'emploi associatif.",
        conditions: ["Employer au moins un salarié", "Être en situation de fragilité économique"],
        categorie: "Accompagnement",
        catColor: "bg-purple-100 text-purple-700",
        periodicite: "Sur demande",
      },
      {
        nom: "Contrat d'Engagement Républicain",
        organisme: "État",
        montant: "Condition d'accès aux subventions publiques",
        description: "Signature obligatoire pour accéder aux subventions publiques depuis 2022.",
        conditions: ["Respecter les principes de la République", "Signer le contrat lors de chaque demande de subvention"],
        categorie: "Administratif",
        catColor: "bg-slate-100 text-slate-700",
        periodicite: "À chaque demande",
      },
      {
        nom: "Subvention régionale",
        organisme: "Conseil Régional",
        montant: "1 000 à 100 000 €",
        description: "Financement régional pour les projets d'intérêt régional.",
        conditions: ["Projet à dimension régionale", "Association active depuis au moins 1 an", "Dossier de subvention"],
        categorie: "Collectivité",
        catColor: "bg-indigo-100 text-indigo-700",
        periodicite: "Annuel",
      },
      {
        nom: "Fonds de dotation et mécénat",
        organisme: "Entreprises / Fondations privées",
        montant: "Variable",
        description: "Soutien financier des entreprises avec déduction fiscale (60% du don pour l'entreprise).",
        conditions: ["Objet d'intérêt général", "Reçus fiscaux délivrables", "Accord de partenariat"],
        categorie: "Privé",
        catColor: "bg-pink-100 text-pink-700",
        periodicite: "Variable",
      },
      {
        nom: "Réserve parlementaire (via DETR)",
        organisme: "Préfecture",
        montant: "1 000 à 20 000 €",
        description: "Dotation d'Équipement des Territoires Ruraux pour les projets en zone rurale.",
        conditions: ["Être situé en zone rurale ou semi-rurale", "Projet d'équipement ou d'aménagement"],
        categorie: "État",
        catColor: "bg-blue-100 text-blue-700",
        periodicite: "Annuel",
      },
    ],
  },
  "rup": {
    label: "Reconnue d'utilité publique",
    icon: "🏅",
    color: "from-amber-600 to-yellow-600",
    subventions: [
      {
        nom: "Subventions ministérielles directes",
        organisme: "Ministères concernés",
        montant: "10 000 à 500 000 €",
        description: "Financement direct des ministères pour les associations dont l'objet est en lien avec leurs missions.",
        conditions: ["Être reconnue d'utilité publique (RUP)", "Projet en lien avec le ministère", "Dossier de subvention"],
        categorie: "État",
        catColor: "bg-amber-100 text-amber-700",
        prioritaire: true,
        periodicite: "Annuel",
      },
      {
        nom: "Capacité à recevoir des legs et donations",
        organisme: "Notaires / Particuliers",
        montant: "Illimité",
        description: "Les associations RUP peuvent recevoir des dons et legs de manière simplifiée et bénéficier d'avantages fiscaux renforcés.",
        conditions: ["Statut RUP obligatoire", "Déclaration à la préfecture"],
        categorie: "Fiscal",
        catColor: "bg-yellow-100 text-yellow-700",
        prioritaire: true,
        periodicite: "Permanent",
      },
      {
        nom: "Déduction fiscale renforcée pour donateurs",
        organisme: "Impôts",
        montant: "66% ou 75% de déduction pour le donateur",
        description: "Les donateurs bénéficient d'une déduction fiscale plus avantageuse pour les RUP.",
        conditions: ["Délivrer des reçus fiscaux", "Objet d'intérêt général reconnu"],
        categorie: "Fiscal",
        catColor: "bg-yellow-100 text-yellow-700",
        periodicite: "Permanent",
      },
      {
        nom: "FDVA renforcé",
        organisme: "État / Préfecture",
        montant: "Jusqu'à 150 000 €",
        description: "Accès à des enveloppes FDVA plus importantes pour les structures reconnues.",
        conditions: ["Statut RUP", "Dossier annuel en préfecture"],
        categorie: "État",
        catColor: "bg-amber-100 text-amber-700",
        periodicite: "Annuel",
      },
      {
        nom: "Partenariat avec l'administration centrale",
        organisme: "État",
        montant: "Variable — conventions pluriannuelles",
        description: "Possibilité de conclure des conventions d'objectifs pluriannuelles avec l'État.",
        conditions: ["Statut RUP", "Objet en lien avec les politiques publiques"],
        categorie: "Partenariat",
        catColor: "bg-orange-100 text-orange-700",
        periodicite: "Pluriannuel",
      },
    ],
  },
  "sportive": {
    label: "Association sportive",
    icon: "⚽",
    color: "from-green-600 to-emerald-600",
    subventions: [
      {
        nom: "CNDS — Centre National pour le Développement du Sport",
        organisme: "Ministère des Sports / DRAJES",
        montant: "500 à 100 000 €",
        description: "Financement pour le développement de la pratique sportive et l'équipement des clubs.",
        conditions: ["Être affilié à une fédération sportive reconnue", "Projet de développement sportif", "Dossier DRAJES"],
        categorie: "Sport",
        catColor: "bg-green-100 text-green-700",
        prioritaire: true,
        periodicite: "Annuel",
      },
      {
        nom: "Subvention fédération sportive",
        organisme: "Fédération sportive nationale",
        montant: "Variable",
        description: "Aides directes des fédérations pour les clubs affiliés (matériel, formation, événements).",
        conditions: ["Être affilié à la fédération concernée", "Cotisation à jour"],
        categorie: "Sport",
        catColor: "bg-green-100 text-green-700",
        prioritaire: true,
        periodicite: "Annuel",
      },
      {
        nom: "Subvention municipale sport",
        organisme: "Mairie / Service des sports",
        montant: "500 à 50 000 €",
        description: "Aide au fonctionnement et à l'équipement sportif accordée par la commune.",
        conditions: ["Siège dans la commune", "Activité sportive ouverte au public", "Dossier annuel"],
        categorie: "Collectivité",
        catColor: "bg-emerald-100 text-emerald-700",
        periodicite: "Annuel",
      },
      {
        nom: "Aide à l'emploi sportif (FONJEP)",
        organisme: "FONJEP / État",
        montant: "Jusqu'à 7 000 €/poste/an",
        description: "Aide à la création ou au maintien d'emplois dans les associations sportives.",
        conditions: ["Employer au moins un salarié", "Poste d'animateur sportif ou éducateur"],
        categorie: "Emploi",
        catColor: "bg-teal-100 text-teal-700",
        periodicite: "Annuel",
      },
      {
        nom: "Pass Sport",
        organisme: "État / Ministère des Sports",
        montant: "50 €/enfant",
        description: "Aide directe aux familles pour financer les adhésions dans les clubs sportifs.",
        conditions: ["Accueillir des jeunes bénéficiaires du Pass Sport", "Être agréé jeunesse et sports"],
        categorie: "Public",
        catColor: "bg-lime-100 text-lime-700",
        periodicite: "Annuel",
      },
    ],
  },
  "culturelle": {
    label: "Association culturelle",
    icon: "🎨",
    color: "from-purple-600 to-violet-600",
    subventions: [
      {
        nom: "DRAC — Aide à la création artistique",
        organisme: "DRAC (Ministère de la Culture)",
        montant: "2 000 à 200 000 €",
        description: "Soutien aux projets de création artistique dans tous les domaines culturels.",
        conditions: ["Projet artistique et culturel", "Dossier DRAC de la région", "Résidence ou activité dans la région"],
        categorie: "Culture",
        catColor: "bg-purple-100 text-purple-700",
        prioritaire: true,
        periodicite: "Annuel",
      },
      {
        nom: "Subvention département — Culture",
        organisme: "Conseil Départemental",
        montant: "500 à 30 000 €",
        description: "Soutien aux projets culturels de proximité sur le territoire du département.",
        conditions: ["Projet à dimension départementale", "Dossier de subvention"],
        categorie: "Collectivité",
        catColor: "bg-violet-100 text-violet-700",
        periodicite: "Annuel",
      },
      {
        nom: "CNM / CNL / CNC — Soutiens sectoriels",
        organisme: "Centres Nationaux",
        montant: "Variable",
        description: "Aides spécifiques selon le domaine : musique (CNM), livre (CNL), cinéma (CNC).",
        conditions: ["Activité dans le secteur concerné", "Dossier propre à chaque centre national"],
        categorie: "Sectoriel",
        catColor: "bg-pink-100 text-pink-700",
        periodicite: "Appels à projets",
      },
      {
        nom: "Fondation de France — Culture",
        organisme: "Fondation de France",
        montant: "5 000 à 50 000 €",
        description: "Appels à projets réguliers pour les associations culturelles innovantes.",
        conditions: ["Projet innovant", "Dossier en ligne sur le site de la Fondation de France"],
        categorie: "Fondation",
        catColor: "bg-indigo-100 text-indigo-700",
        periodicite: "Appels à projets",
      },
      {
        nom: "FONJEP Culture",
        organisme: "FONJEP / Ministère de la Culture",
        montant: "Jusqu'à 7 000 €/poste/an",
        description: "Aide à la création d'emplois dans les associations culturelles.",
        conditions: ["Employer au moins un salarié", "Activité culturelle reconnue"],
        categorie: "Emploi",
        catColor: "bg-teal-100 text-teal-700",
        periodicite: "Annuel",
      },
    ],
  },
  "humanitaire": {
    label: "Association humanitaire",
    icon: "❤️",
    color: "from-rose-600 to-pink-600",
    subventions: [
      {
        nom: "FSSI — Fonds de Solidarité pour les Initiatives Sociales Innovantes",
        organisme: "État",
        montant: "5 000 à 50 000 €",
        description: "Soutien aux projets sociaux et humanitaires innovants.",
        conditions: ["Projet innovant à impact social", "Association reconnue d'intérêt général"],
        categorie: "Social",
        catColor: "bg-rose-100 text-rose-700",
        prioritaire: true,
        periodicite: "Appels à projets",
      },
      {
        nom: "AFD — Agence Française de Développement (OSC)",
        organisme: "AFD / MEAE",
        montant: "50 000 à 2 000 000 €",
        description: "Financement de projets humanitaires et de développement international.",
        conditions: ["Actions à l'international", "Partenariat local dans le pays bénéficiaire", "Expérience avérée"],
        categorie: "International",
        catColor: "bg-pink-100 text-pink-700",
        periodicite: "Appels à projets",
      },
      {
        nom: "Appels à projets CAF — Aide alimentaire",
        organisme: "CAF / DREETS",
        montant: "Variable",
        description: "Financement des épiceries sociales et associations d'aide alimentaire.",
        conditions: ["Activité d'aide alimentaire", "Public en précarité", "Dossier DREETS"],
        categorie: "Social",
        catColor: "bg-rose-100 text-rose-700",
        periodicite: "Annuel",
      },
      {
        nom: "Fondation Abbé Pierre",
        organisme: "Fondation Abbé Pierre",
        montant: "5 000 à 30 000 €",
        description: "Soutien aux associations luttant contre le mal-logement et l'exclusion.",
        conditions: ["Action contre le mal-logement", "Dossier de candidature"],
        categorie: "Fondation",
        catColor: "bg-indigo-100 text-indigo-700",
        periodicite: "Appels à projets",
      },
      {
        nom: "Fonds ECHO (UE — aide humanitaire)",
        organisme: "Commission Européenne",
        montant: "100 000 à plusieurs millions €",
        description: "Financement européen pour les crises humanitaires à l'international.",
        conditions: ["Actions humanitaires à l'international", "Partenariat avec la Commission Européenne", "Expérience en gestion de crise"],
        categorie: "Europe",
        catColor: "bg-blue-100 text-blue-700",
        periodicite: "Appels à projets",
      },
    ],
  },
  "environnement": {
    label: "Association environnement",
    icon: "🌱",
    color: "from-teal-600 to-green-600",
    subventions: [
      {
        nom: "ADEME — Aide aux projets environnementaux",
        organisme: "ADEME",
        montant: "5 000 à 500 000 €",
        description: "Financement des projets de transition écologique, énergétique et environnementale.",
        conditions: ["Projet de transition écologique", "Dossier ADEME régionale", "Co-financement requis dans certains cas"],
        categorie: "Environnement",
        catColor: "bg-teal-100 text-teal-700",
        prioritaire: true,
        periodicite: "Appels à projets",
      },
      {
        nom: "Fonds de dotation Fondation Nature & Découvertes",
        organisme: "Fondation Nature & Découvertes",
        montant: "1 000 à 30 000 €",
        description: "Soutien aux projets de protection de la nature et de l'environnement.",
        conditions: ["Projet de protection de la nature", "En France ou à l'international"],
        categorie: "Fondation",
        catColor: "bg-green-100 text-green-700",
        periodicite: "Appels à projets",
      },
      {
        nom: "LIFE — Programme européen environnement",
        organisme: "Commission Européenne",
        montant: "300 000 à 5 000 000 €",
        description: "Financement européen pour les projets de biodiversité et de transition climatique.",
        conditions: ["Projet innovant à impact environnemental", "Co-financement à 40-55%", "Partenariat transnational apprécié"],
        categorie: "Europe",
        catColor: "bg-blue-100 text-blue-700",
        periodicite: "Appels à projets",
      },
      {
        nom: "Agence de l'eau — Biodiversité",
        organisme: "Agences de l'eau",
        montant: "Variable",
        description: "Financement des projets de protection des milieux aquatiques et de la biodiversité.",
        conditions: ["Projet lié à l'eau ou à la biodiversité aquatique", "Dossier auprès de l'agence de l'eau de bassin"],
        categorie: "Eau",
        catColor: "bg-cyan-100 text-cyan-700",
        periodicite: "Appels à projets",
      },
      {
        nom: "Subvention régionale — Environnement",
        organisme: "Conseil Régional",
        montant: "2 000 à 80 000 €",
        description: "Aide régionale pour les projets de sensibilisation et de protection de l'environnement.",
        conditions: ["Projet à dimension régionale", "Dossier de subvention régionale"],
        categorie: "Collectivité",
        catColor: "bg-emerald-100 text-emerald-700",
        periodicite: "Annuel",
      },
    ],
  },
  "education": {
    label: "Association éducative",
    icon: "📚",
    color: "from-sky-600 to-blue-600",
    subventions: [
      {
        nom: "FONJEP — Aide à l'emploi éducatif",
        organisme: "FONJEP / État",
        montant: "Jusqu'à 7 000 €/poste/an",
        description: "Soutien à la création d'emplois dans les associations d'éducation populaire.",
        conditions: ["Employer au moins un salarié", "Agrément jeunesse et éducation populaire"],
        categorie: "Emploi",
        catColor: "bg-sky-100 text-sky-700",
        prioritaire: true,
        periodicite: "Annuel",
      },
      {
        nom: "Subvention Éducation Nationale",
        organisme: "Rectorat / DAAC",
        montant: "500 à 20 000 €",
        description: "Aide aux associations intervenant en milieu scolaire ou parascolaire.",
        conditions: ["Convention avec un établissement scolaire", "Agrément Éducation Nationale"],
        categorie: "État",
        catColor: "bg-blue-100 text-blue-700",
        periodicite: "Annuel",
      },
      {
        nom: "Erasmus+ (volet éducation)",
        organisme: "Commission Européenne / ANEF",
        montant: "Variable",
        description: "Financement européen pour les projets d'éducation et de mobilité internationale.",
        conditions: ["Projet de mobilité ou partenariat international", "Dossier via l'Agence Erasmus+ France"],
        categorie: "Europe",
        catColor: "bg-indigo-100 text-indigo-700",
        periodicite: "Appels à projets",
      },
      {
        nom: "Programme Cordée de la réussite",
        organisme: "État / Rectorat",
        montant: "Variable",
        description: "Financement pour les associations qui accompagnent les élèves boursiers vers les études supérieures.",
        conditions: ["Partenariat avec lycées et grandes écoles", "Actions de tutorat ou mentorat"],
        categorie: "Éducation",
        catColor: "bg-sky-100 text-sky-700",
        periodicite: "Annuel",
      },
    ],
  },
  "fondation": {
    label: "Fondation reconnue",
    icon: "🏗️",
    color: "from-slate-600 to-zinc-600",
    subventions: [
      {
        nom: "Dons avec déduction fiscale à 66%",
        organisme: "Particuliers / Entreprises",
        montant: "66% de déduction pour les particuliers",
        description: "Les fondations reconnues d'utilité publique bénéficient des avantages fiscaux les plus étendus.",
        conditions: ["Être une fondation reconnue d'utilité publique (FRUP)", "Délivrer des reçus fiscaux"],
        categorie: "Fiscal",
        catColor: "bg-slate-100 text-slate-700",
        prioritaire: true,
        periodicite: "Permanent",
      },
      {
        nom: "Legs et donations sans droits de succession",
        organisme: "Notaires",
        montant: "Exonération de droits de mutation",
        description: "Les fondations peuvent recevoir legs et donations en exonération totale de droits.",
        conditions: ["Statut de fondation reconnue d'utilité publique"],
        categorie: "Fiscal",
        catColor: "bg-zinc-100 text-zinc-700",
        prioritaire: true,
        periodicite: "Permanent",
      },
      {
        nom: "Réserve de capitalisation",
        organisme: "Impôts",
        montant: "Capitalisation sans imposition",
        description: "Les fondations peuvent constituer une réserve capitalisée en franchise d'impôt.",
        conditions: ["Affectation à l'objet de la fondation"],
        categorie: "Fiscal",
        catColor: "bg-zinc-100 text-zinc-700",
        periodicite: "Permanent",
      },
      {
        nom: "Subventions ministérielles",
        organisme: "Ministères",
        montant: "50 000 à 1 000 000 €",
        description: "Financement direct des ministères pour les fondations dont l'objet rejoint les missions de l'État.",
        conditions: ["Statut FRUP", "Convention d'objectifs"],
        categorie: "État",
        catColor: "bg-blue-100 text-blue-700",
        periodicite: "Pluriannuel",
      },
    ],
  },
  "fonds-dotation": {
    label: "Fonds de dotation",
    icon: "👥",
    color: "from-indigo-600 to-purple-600",
    subventions: [
      {
        nom: "Dons déductibles à 66%",
        organisme: "Particuliers",
        montant: "66% de déduction pour les particuliers",
        description: "Les donateurs peuvent déduire 66% de leurs dons du revenu imposable.",
        conditions: ["Être un fonds de dotation déclaré", "Exercer une mission d'intérêt général"],
        categorie: "Fiscal",
        catColor: "bg-indigo-100 text-indigo-700",
        prioritaire: true,
        periodicite: "Permanent",
      },
      {
        nom: "Mécénat d'entreprise (60% de déduction)",
        organisme: "Entreprises",
        montant: "60% de déduction pour l'entreprise",
        description: "Les entreprises donatrices bénéficient d'une réduction d'impôt de 60% du don.",
        conditions: ["Mission d'intérêt général", "Reçus fiscaux", "Contrat de mécénat"],
        categorie: "Privé",
        catColor: "bg-purple-100 text-purple-700",
        prioritaire: true,
        periodicite: "Permanent",
      },
      {
        nom: "Dotation initiale et apports",
        organisme: "Fondateurs",
        montant: "15 000 € minimum",
        description: "Capital initial constitutif du fonds, consommable ou non selon les statuts.",
        conditions: ["Dotation initiale minimum de 15 000 €", "Statuts déposés à la préfecture"],
        categorie: "Constitution",
        catColor: "bg-violet-100 text-violet-700",
        periodicite: "À la création",
      },
    ],
  },
  "insertion": {
    label: "Association d'insertion",
    icon: "🤲",
    color: "from-orange-600 to-amber-600",
    subventions: [
      {
        nom: "Aide au poste IAE (Insertion par l'Activité Économique)",
        organisme: "DREETS / État",
        montant: "Jusqu'à 13 000 €/ETP/an",
        description: "Aide à l'emploi pour les structures de l'IAE (ACI, EI, ETTI, AI).",
        conditions: ["Avoir un agrément IAE (ACI, EI, ETTI, AI)", "Employer des personnes en insertion"],
        categorie: "Emploi",
        catColor: "bg-orange-100 text-orange-700",
        prioritaire: true,
        periodicite: "Annuel",
      },
      {
        nom: "FDVA — Accompagnement emploi associatif",
        organisme: "État / Préfecture",
        montant: "1 000 à 30 000 €",
        description: "Soutien aux associations employeuses pour la consolidation des emplois.",
        conditions: ["Être une association loi 1901", "Employer des salariés"],
        categorie: "État",
        catColor: "bg-amber-100 text-amber-700",
        periodicite: "Annuel",
      },
      {
        nom: "DLA — Dispositif Local d'Accompagnement",
        organisme: "AVISE / État",
        montant: "Accompagnement gratuit",
        description: "Accompagnement professionnel gratuit pour les structures d'insertion.",
        conditions: ["Avoir au moins un salarié", "Être en difficulté ou en développement"],
        categorie: "Accompagnement",
        catColor: "bg-purple-100 text-purple-700",
        periodicite: "Sur demande",
      },
      {
        nom: "Fonds Européen Social (FSE+)",
        organisme: "Commission Européenne / DREETS",
        montant: "Variable — co-financement",
        description: "Financement européen pour les actions d'insertion professionnelle et sociale.",
        conditions: ["Actions d'insertion", "Co-financement public", "Dossier régional"],
        categorie: "Europe",
        catColor: "bg-blue-100 text-blue-700",
        periodicite: "Pluriannuel",
      },
      {
        nom: "Subvention AGEFIPH",
        organisme: "AGEFIPH",
        montant: "Variable",
        description: "Aide pour les associations qui emploient et accompagnent des personnes handicapées.",
        conditions: ["Employer ou accompagner des travailleurs handicapés"],
        categorie: "Handicap",
        catColor: "bg-sky-100 text-sky-700",
        periodicite: "Sur demande",
      },
    ],
  },
};

interface PageProps {
  params: Promise<{ statut: string }>;
}

export default async function ResultatsAssociationsPage({ params }: PageProps) {
  const { statut } = await params;
  const data = subventionsData[statut];

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold text-slate-800 mb-4">Statut non trouvé</h1>
          <Link href="/associations" className="text-indigo-600 hover:underline">← Retour aux statuts</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const prioritaires = data.subventions.filter(s => s.prioritaire);
  const autres = data.subventions.filter(s => !s.prioritaire);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className={`relative pt-24 pb-14 overflow-hidden bg-gradient-to-br ${data.color}`}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 0%, transparent 60%)" }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/70 text-sm mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/associations" className="hover:text-white transition-colors">Associations</Link>
            <span>/</span>
            <span className="text-white">{data.label}</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{data.icon}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
              Subventions : {data.label}
            </h1>
          </div>
          <p className="text-white/80 text-lg max-w-2xl">
            Nous avons trouvé <span className="font-bold text-white">{data.subventions.length} dispositifs de financement</span> pour votre structure
          </p>

          <div className="flex flex-wrap gap-3 mt-6">
            {Array.from(new Set(data.subventions.map(s => s.categorie))).map((cat, i) => (
              <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/20">
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

        {/* Conseils pratiques */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <p className="font-semibold text-amber-800 mb-1">Conseil pour votre recherche de financement</p>
              <p className="text-sm text-amber-700">
                Commencez par les subventions marquées &quot;Prioritaire&quot; qui sont les plus accessibles à votre statut.
                Préparez un dossier solide avec : présentation de l&apos;association, bilan, budget prévisionnel, rapport d&apos;activité.
              </p>
            </div>
          </div>
        </div>

        {/* Prioritaires */}
        {prioritaires.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-2xl">⭐</span>
              <h2 className="text-xl font-bold text-slate-800">Financements prioritaires — À demander en premier</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {prioritaires.map((sub, i) => (
                <div key={i} className="bg-white rounded-2xl border-2 border-amber-200 shadow-md p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-amber-400 text-white text-xs font-bold rounded-bl-xl">
                    PRIORITAIRE
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sub.catColor}`}>{sub.categorie}</span>
                    {sub.periodicite && (
                      <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{sub.periodicite}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-1">{sub.nom}</h3>
                  <p className="text-sm text-slate-500 mb-3">{sub.organisme}</p>
                  <p className="text-xl font-extrabold text-slate-800 mb-3">{sub.montant}</p>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{sub.description}</p>
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Conditions :</p>
                    {sub.conditions.map((c, j) => (
                      <div key={j} className="flex items-start gap-2 text-xs text-slate-600">
                        <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Autres */}
        {autres.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-2xl">📋</span>
              <h2 className="text-xl font-bold text-slate-800">Autres financements disponibles</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {autres.map((sub, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sub.catColor}`}>{sub.categorie}</span>
                    {sub.periodicite && (
                      <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{sub.periodicite}</span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-1">{sub.nom}</h3>
                  <p className="text-sm text-slate-500 mb-3">{sub.organisme}</p>
                  <p className="text-xl font-extrabold text-slate-800 mb-3">{sub.montant}</p>
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{sub.description}</p>
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Conditions :</p>
                    {sub.conditions.map((c, j) => (
                      <div key={j} className="flex items-start gap-2 text-xs text-slate-600">
                        <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Retour */}
        <div className="flex flex-col sm:flex-row gap-4 items-center pt-4">
          <Link
            href="/associations"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Changer de statut
          </Link>
          <p className="text-xs text-slate-400">
            Les montants indiqués sont donnés à titre indicatif. Rapprochez-vous des organismes concernés pour une évaluation précise de votre dossier.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
