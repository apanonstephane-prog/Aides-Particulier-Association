"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const statuts = [
  {
    id: "loi-1901",
    icon: "📝",
    label: "Association Loi 1901",
    desc: "Association à but non lucratif déclarée en préfecture",
    color: "from-blue-50 to-indigo-50",
    border: "border-blue-200",
    hover: "hover:border-blue-400 hover:bg-blue-50",
    selected: "border-blue-500 bg-blue-50 ring-2 ring-blue-300",
    tag: "bg-blue-100 text-blue-700",
    nbAides: 28,
    badge: "Le plus courant",
  },
  {
    id: "rup",
    icon: "🏅",
    label: "Reconnue d'utilité publique",
    desc: "Association ayant obtenu la reconnaissance d'utilité publique par décret",
    color: "from-amber-50 to-yellow-50",
    border: "border-amber-200",
    hover: "hover:border-amber-400 hover:bg-amber-50",
    selected: "border-amber-500 bg-amber-50 ring-2 ring-amber-300",
    tag: "bg-amber-100 text-amber-700",
    nbAides: 35,
    badge: "Statut privilégié",
  },
  {
    id: "sportive",
    icon: "⚽",
    label: "Association sportive",
    desc: "Club ou association affilié à une fédération sportive",
    color: "from-green-50 to-emerald-50",
    border: "border-green-200",
    hover: "hover:border-green-400 hover:bg-green-50",
    selected: "border-green-500 bg-green-50 ring-2 ring-green-300",
    tag: "bg-green-100 text-green-700",
    nbAides: 22,
  },
  {
    id: "culturelle",
    icon: "🎨",
    label: "Association culturelle",
    desc: "Promotion de la culture, des arts, du patrimoine",
    color: "from-purple-50 to-violet-50",
    border: "border-purple-200",
    hover: "hover:border-purple-400 hover:bg-purple-50",
    selected: "border-purple-500 bg-purple-50 ring-2 ring-purple-300",
    tag: "bg-purple-100 text-purple-700",
    nbAides: 20,
  },
  {
    id: "humanitaire",
    icon: "❤️",
    label: "Association humanitaire",
    desc: "Action caritative, aide aux personnes vulnérables en France ou à l'étranger",
    color: "from-rose-50 to-pink-50",
    border: "border-rose-200",
    hover: "hover:border-rose-400 hover:bg-rose-50",
    selected: "border-rose-500 bg-rose-50 ring-2 ring-rose-300",
    tag: "bg-rose-100 text-rose-700",
    nbAides: 18,
  },
  {
    id: "environnement",
    icon: "🌱",
    label: "Association environnement",
    desc: "Protection de la nature, développement durable, écologie",
    color: "from-teal-50 to-green-50",
    border: "border-teal-200",
    hover: "hover:border-teal-400 hover:bg-teal-50",
    selected: "border-teal-500 bg-teal-50 ring-2 ring-teal-300",
    tag: "bg-teal-100 text-teal-700",
    nbAides: 19,
  },
  {
    id: "education",
    icon: "📚",
    label: "Association éducative",
    desc: "Soutien scolaire, alphabétisation, formation tout au long de la vie",
    color: "from-sky-50 to-blue-50",
    border: "border-sky-200",
    hover: "hover:border-sky-400 hover:bg-sky-50",
    selected: "border-sky-500 bg-sky-50 ring-2 ring-sky-300",
    tag: "bg-sky-100 text-sky-700",
    nbAides: 16,
  },
  {
    id: "fondation",
    icon: "🏗️",
    label: "Fondation reconnue",
    desc: "Fondation reconnue d'utilité publique ou fondation abritée",
    color: "from-slate-50 to-zinc-50",
    border: "border-slate-200",
    hover: "hover:border-slate-400 hover:bg-slate-50",
    selected: "border-slate-500 bg-slate-50 ring-2 ring-slate-300",
    tag: "bg-slate-100 text-slate-700",
    nbAides: 30,
    badge: "Grand mécénat",
  },
  {
    id: "fonds-dotation",
    icon: "👥",
    label: "Fonds de dotation",
    desc: "Structure de gestion d'actifs pour des projets d'intérêt général",
    color: "from-indigo-50 to-purple-50",
    border: "border-indigo-200",
    hover: "hover:border-indigo-400 hover:bg-indigo-50",
    selected: "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-300",
    tag: "bg-indigo-100 text-indigo-700",
    nbAides: 24,
  },
  {
    id: "insertion",
    icon: "🤲",
    label: "Association d'insertion",
    desc: "Réinsertion professionnelle et sociale, IAE, structures ESAT",
    color: "from-orange-50 to-amber-50",
    border: "border-orange-200",
    hover: "hover:border-orange-400 hover:bg-orange-50",
    selected: "border-orange-500 bg-orange-50 ring-2 ring-orange-300",
    tag: "bg-orange-100 text-orange-700",
    nbAides: 21,
  },
];

const phases = [
  { id: "creation", label: "En cours de création", icon: "🌱", desc: "Association récemment créée (moins de 2 ans)" },
  { id: "developpement", label: "En développement", icon: "📈", desc: "Association établie cherchant à se développer" },
  { id: "mature", label: "Association mature", icon: "🏆", desc: "Structure bien établie avec historique" },
];

export default function AssociationsPage() {
  const [selectedStatut, setSelectedStatut] = useState<string | null>(null);
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const canContinue = selectedStatut !== null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, white 0%, transparent 60%)" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-sm px-4 py-1.5 rounded-full border border-white/20 mb-5">
            <Link href="/" className="hover:underline">Accueil</Link>
            <span className="opacity-50">/</span>
            <span>Associations</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Subventions &amp; aides pour les <span className="text-purple-200">associations</span>
          </h1>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
            Sélectionnez le statut de votre association pour trouver les financements adaptés à votre projet
          </p>
        </div>
      </section>

      {/* Selector */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Étape 1 : Statut */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</div>
            <h2 className="text-xl font-bold text-slate-800">Quel est le statut de votre association ?</h2>
          </div>
          <p className="text-sm text-slate-500 mb-8 ml-11">Sélectionnez la forme juridique qui correspond à votre structure</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {statuts.map((statut) => (
              <button
                key={statut.id}
                onClick={() => setSelectedStatut(selectedStatut === statut.id ? null : statut.id)}
                className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-200 card-hover
                  ${selectedStatut === statut.id ? statut.selected : `bg-gradient-to-br ${statut.color} ${statut.border} ${statut.hover}`}
                `}
              >
                {statut.badge && (
                  <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-indigo-600 text-white text-xs font-semibold rounded-full shadow">
                    {statut.badge}
                  </div>
                )}
                {selectedStatut === statut.id && (
                  <div className="absolute top-3 right-3 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <div className="text-3xl mb-3">{statut.icon}</div>
                <div className="font-semibold text-slate-800 text-sm mb-1">{statut.label}</div>
                <div className="text-xs text-slate-500 leading-relaxed mb-3">{statut.desc}</div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statut.tag}`}>
                  {statut.nbAides} aides disponibles
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Étape 2 : Phase (optionnel) */}
        {selectedStatut && (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10 animate-scale-in">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</div>
              <h2 className="text-xl font-bold text-slate-800">Quelle est la maturité de votre association ?</h2>
            </div>
            <p className="text-sm text-slate-500 mb-8 ml-11">Cela nous permet d&apos;affiner les résultats <span className="text-indigo-400">(optionnel)</span></p>

            <div className="grid sm:grid-cols-3 gap-4">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => setSelectedPhase(selectedPhase === phase.id ? null : phase.id)}
                  className={`text-left p-5 rounded-2xl border-2 transition-all duration-200
                    ${selectedPhase === phase.id
                      ? "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-300"
                      : "border-slate-200 bg-slate-50 hover:border-indigo-300 hover:bg-indigo-50"
                    }
                  `}
                >
                  <div className="text-3xl mb-3">{phase.icon}</div>
                  <div className="font-semibold text-slate-800 text-sm mb-1">{phase.label}</div>
                  <div className="text-xs text-slate-500">{phase.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CTA final */}
        {canContinue && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl border border-indigo-100 p-8 animate-scale-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{statuts.find(s => s.id === selectedStatut)?.icon}</span>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">
                      {statuts.find(s => s.id === selectedStatut)?.label}
                    </h3>
                    {selectedPhase && (
                      <p className="text-sm text-slate-500">
                        {phases.find(p => p.id === selectedPhase)?.label}
                      </p>
                    )}
                  </div>
                </div>
                <p className="text-slate-600">
                  <span className="font-bold text-indigo-700 text-xl">
                    {statuts.find(s => s.id === selectedStatut)?.nbAides}
                  </span>{" "}
                  subventions et dispositifs correspondent à votre profil
                </p>
              </div>
              <Link
                href={`/resultats/associations/${selectedStatut}${selectedPhase ? `?phase=${selectedPhase}` : ""}`}
                className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl text-lg"
              >
                Voir mes subventions
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Info complémentaire */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🏛️",
              title: "Subventions publiques",
              desc: "État, régions, départements, communes — toutes les aides publiques disponibles",
            },
            {
              icon: "🤝",
              title: "Mécénat privé",
              desc: "Fondations d'entreprises, appels à projets, partenariats avec le secteur privé",
            },
            {
              icon: "🌍",
              title: "Fonds européens",
              desc: "FSE, FEDER, Erasmus+, LEADER — accédez aux programmes de financement européens",
            },
          ].map((cat, i) => (
            <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <span className="text-3xl">{cat.icon}</span>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">{cat.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
