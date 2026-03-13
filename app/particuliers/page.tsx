"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const situations = [
  {
    id: "celibataire",
    icon: "👤",
    label: "Célibataire",
    desc: "Sans enfant à charge, vivant seul(e)",
    color: "from-blue-50 to-cyan-50",
    border: "border-blue-200",
    hover: "hover:border-blue-400 hover:bg-blue-50",
    selected: "border-blue-500 bg-blue-50 ring-2 ring-blue-300",
    tag: "bg-blue-100 text-blue-700",
    nbAides: 12,
  },
  {
    id: "couple-sans-enfants",
    icon: "👫",
    label: "Couple sans enfants",
    desc: "En union libre, pacsé(e) ou marié(e), sans enfant",
    color: "from-indigo-50 to-blue-50",
    border: "border-indigo-200",
    hover: "hover:border-indigo-400 hover:bg-indigo-50",
    selected: "border-indigo-500 bg-indigo-50 ring-2 ring-indigo-300",
    tag: "bg-indigo-100 text-indigo-700",
    nbAides: 10,
  },
  {
    id: "couple-enfants",
    icon: "👨‍👩‍👧",
    label: "Couple avec enfants",
    desc: "Famille biparentale avec un ou plusieurs enfants",
    color: "from-purple-50 to-indigo-50",
    border: "border-purple-200",
    hover: "hover:border-purple-400 hover:bg-purple-50",
    selected: "border-purple-500 bg-purple-50 ring-2 ring-purple-300",
    tag: "bg-purple-100 text-purple-700",
    nbAides: 22,
  },
  {
    id: "parent-isole",
    icon: "🧑‍👧",
    label: "Parent isolé",
    desc: "Élève seul(e) un ou plusieurs enfants",
    color: "from-rose-50 to-pink-50",
    border: "border-rose-200",
    hover: "hover:border-rose-400 hover:bg-rose-50",
    selected: "border-rose-500 bg-rose-50 ring-2 ring-rose-300",
    tag: "bg-rose-100 text-rose-700",
    nbAides: 18,
  },
  {
    id: "famille-nombreuse",
    icon: "👨‍👩‍👧‍👦",
    label: "Famille nombreuse",
    desc: "3 enfants ou plus à charge",
    color: "from-orange-50 to-amber-50",
    border: "border-orange-200",
    hover: "hover:border-orange-400 hover:bg-orange-50",
    selected: "border-orange-500 bg-orange-50 ring-2 ring-orange-300",
    tag: "bg-orange-100 text-orange-700",
    nbAides: 25,
  },
  {
    id: "retraite",
    icon: "👴",
    label: "Retraité(e)",
    desc: "Bénéficiaire d'une pension de retraite",
    color: "from-teal-50 to-green-50",
    border: "border-teal-200",
    hover: "hover:border-teal-400 hover:bg-teal-50",
    selected: "border-teal-500 bg-teal-50 ring-2 ring-teal-300",
    tag: "bg-teal-100 text-teal-700",
    nbAides: 15,
  },
  {
    id: "handicap",
    icon: "♿",
    label: "En situation de handicap",
    desc: "Personne en situation de handicap ou aidant",
    color: "from-sky-50 to-blue-50",
    border: "border-sky-200",
    hover: "hover:border-sky-400 hover:bg-sky-50",
    selected: "border-sky-500 bg-sky-50 ring-2 ring-sky-300",
    tag: "bg-sky-100 text-sky-700",
    nbAides: 20,
  },
  {
    id: "etudiant",
    icon: "🎓",
    label: "Étudiant(e)",
    desc: "En cours d'études supérieures ou de formation",
    color: "from-violet-50 to-purple-50",
    border: "border-violet-200",
    hover: "hover:border-violet-400 hover:bg-violet-50",
    selected: "border-violet-500 bg-violet-50 ring-2 ring-violet-300",
    tag: "bg-violet-100 text-violet-700",
    nbAides: 14,
  },
  {
    id: "demandeur-emploi",
    icon: "💼",
    label: "Demandeur d'emploi",
    desc: "En recherche d'emploi ou en reconversion",
    color: "from-yellow-50 to-amber-50",
    border: "border-yellow-200",
    hover: "hover:border-yellow-400 hover:bg-yellow-50",
    selected: "border-yellow-500 bg-yellow-50 ring-2 ring-yellow-300",
    tag: "bg-yellow-100 text-yellow-700",
    nbAides: 16,
  },
  {
    id: "travailleur-precaire",
    icon: "🔄",
    label: "Travailleur précaire",
    desc: "CDD, intérim, temps partiel subi",
    color: "from-lime-50 to-green-50",
    border: "border-lime-200",
    hover: "hover:border-lime-400 hover:bg-lime-50",
    selected: "border-lime-500 bg-lime-50 ring-2 ring-lime-300",
    tag: "bg-lime-100 text-lime-700",
    nbAides: 11,
  },
];

export default function ParticuliersPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700" />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 0%, transparent 60%)" }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-sm px-4 py-1.5 rounded-full border border-white/20 mb-5">
            <Link href="/" className="hover:underline">Accueil</Link>
            <span className="opacity-50">/</span>
            <span>Particuliers</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
            Aides pour les <span className="text-blue-200">particuliers</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Sélectionnez votre situation familiale pour découvrir les aides auxquelles vous avez droit
          </p>
        </div>
      </section>

      {/* Selector */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">📍</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Quelle est votre situation familiale ?</h2>
              <p className="text-sm text-slate-500">Cliquez sur la situation qui vous correspond le mieux</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {situations.map((sit) => (
              <button
                key={sit.id}
                onClick={() => setSelected(selected === sit.id ? null : sit.id)}
                className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-200 card-hover
                  ${selected === sit.id ? sit.selected : `bg-gradient-to-br ${sit.color} ${sit.border} ${sit.hover}`}
                `}
              >
                {selected === sit.id && (
                  <div className="absolute top-3 right-3 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <div className="text-3xl mb-3">{sit.icon}</div>
                <div className="font-semibold text-slate-800 text-sm mb-1">{sit.label}</div>
                <div className="text-xs text-slate-500 leading-relaxed mb-3">{sit.desc}</div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sit.tag}`}>
                  {sit.nbAides} aides disponibles
                </span>
              </button>
            ))}
          </div>

          {/* CTA */}
          {selected && (
            <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 animate-scale-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{situations.find(s => s.id === selected)?.icon}</span>
                    <p className="font-semibold text-slate-800">
                      {situations.find(s => s.id === selected)?.label}
                    </p>
                  </div>
                  <p className="text-sm text-slate-600">
                    <span className="font-bold text-blue-700">
                      {situations.find(s => s.id === selected)?.nbAides} aides
                    </span>{" "}
                    correspondent à votre situation
                  </p>
                </div>
                <Link
                  href={`/resultats/particuliers/${selected}`}
                  className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Voir mes aides
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Info complémentaire */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "🏠",
              title: "Aides au logement",
              desc: "APL, ALS, ALF, aides à la rénovation énergétique, accession à la propriété",
              href: "/particuliers",
            },
            {
              icon: "👶",
              title: "Aides à la famille",
              desc: "Allocations familiales, CAF, garde d'enfants, rentrée scolaire",
              href: "/particuliers",
            },
            {
              icon: "💊",
              title: "Aides à la santé",
              desc: "Complémentaire santé solidaire, ACS, prise en charge des soins",
              href: "/particuliers",
            },
          ].map((cat, i) => (
            <Link key={i} href={cat.href}
              className="flex gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all">
              <span className="text-3xl">{cat.icon}</span>
              <div>
                <h3 className="font-semibold text-slate-800 mb-1">{cat.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
