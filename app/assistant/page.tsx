"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AutoFillWizard from "@/components/AutoFillWizard";
import PDFViewer from "@/components/PDFViewer";
import DocumentScanner from "@/components/DocumentScanner";

const tabs = [
  {
    id: "autofill",
    icon: "📝",
    label: "Remplissage assisté",
    desc: "Créez votre profil administratif pour faciliter vos démarches",
    color: "blue",
  },
  {
    id: "scanner",
    icon: "📷",
    label: "Scanner de documents",
    desc: "Prenez en photo ou importez vos documents officiels",
    color: "indigo",
  },
  {
    id: "pdf",
    icon: "📄",
    label: "Visualiseur PDF",
    desc: "Ouvrez et consultez vos formulaires PDF",
    color: "purple",
  },
];

const useCases = [
  { icon: "🏠", title: "Dossier de location", desc: "Rassemblez et organisez vos pièces justificatives" },
  { icon: "🏥", title: "Demande CAF / RSA", desc: "Préparez vos informations pour remplir les formulaires" },
  { icon: "👴", title: "Dossier retraite", desc: "Numérisez vos relevés de carrière et justificatifs" },
  { icon: "♿", title: "Dossier MDPH", desc: "Organisez vos certificats médicaux et pièces d'identité" },
  { icon: "🎓", title: "Bourse étudiante", desc: "Préparez les pièces pour votre dossier CROUS" },
  { icon: "💼", title: "Inscription France Travail", desc: "Rassemblez vos justificatifs d'emploi et contrats" },
];

export default function AssistantPage() {
  const [activeTab, setActiveTab] = useState("autofill");

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 0%, transparent 60%)" }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-sm px-4 py-1.5 rounded-full border border-white/15 mb-5">
            <Link href="/" className="hover:text-white">Accueil</Link>
            <span className="opacity-50">/</span>
            <span>Assistant administratif</span>
          </div>
          <div className="flex items-start gap-5 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 shadow-xl">
              🤖
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                Assistant administratif
              </h1>
              <p className="text-slate-300 text-lg max-w-2xl">
                Trois outils gratuits pour simplifier vos démarches : préparez vos dossiers,
                numérisez vos documents et consultez vos formulaires sans difficulté.
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-3">
            {[
              { icon: "🔒", label: "100% local — aucune donnée envoyée" },
              { icon: "✅", label: "Gratuit & sans inscription" },
              { icon: "📱", label: "Fonctionne sur mobile" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/15 rounded-full text-xs text-white/80">
                <span>{b.icon}</span>
                <span>{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">

        {/* Onglets */}
        <div className="flex flex-col sm:flex-row gap-3">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all
                ${activeTab === tab.id
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                }`}
            >
              <span className="text-2xl flex-shrink-0">{tab.icon}</span>
              <div>
                <p className={`font-semibold text-sm ${activeTab === tab.id ? "text-blue-700" : "text-slate-700"}`}>
                  {tab.label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{tab.desc}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Contenu de l'onglet actif */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl p-6 md:p-8 min-h-[400px]">

          {activeTab === "autofill" && (
            <div>
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">📝</div>
                <div>
                  <h2 className="font-bold text-slate-800 text-lg">Remplissage assisté de formulaires</h2>
                  <p className="text-sm text-slate-500">Saisissez vos informations une seule fois, copiez-les dans n&apos;importe quel formulaire</p>
                </div>
              </div>
              <AutoFillWizard />
            </div>
          )}

          {activeTab === "scanner" && (
            <div>
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">📷</div>
                <div>
                  <h2 className="font-bold text-slate-800 text-lg">Scanner de documents</h2>
                  <p className="text-sm text-slate-500">Photographiez carte d&apos;identité, justificatifs, contrats — consultez-les à tout moment</p>
                </div>
              </div>
              <DocumentScanner />
            </div>
          )}

          {activeTab === "pdf" && (
            <div>
              <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">📄</div>
                <div>
                  <h2 className="font-bold text-slate-800 text-lg">Visualiseur de PDF</h2>
                  <p className="text-sm text-slate-500">Ouvrez et consultez vos formulaires PDF directement dans le navigateur</p>
                </div>
              </div>
              <PDFViewer />
            </div>
          )}
        </div>

        {/* Liens utiles vers les formulaires officiels */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8">
          <h2 className="font-bold text-slate-800 text-xl mb-2">📋 Formulaires officiels à télécharger</h2>
          <p className="text-slate-500 text-sm mb-6">Les formulaires les plus demandés directement sur service-public.fr</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { nom: "Demande de RSA", ref: "Cerfa 15481", url: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/solidarite/revenu-de-solidarite-active-rsa", cat: "Social", catColor: "bg-purple-100 text-purple-700" },
              { nom: "Demande d'APL", ref: "Cerfa 10840", url: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/logement/aide-personnalisee-au-logement", cat: "Logement", catColor: "bg-blue-100 text-blue-700" },
              { nom: "Demande AAH", ref: "Cerfa 13788", url: "https://www.formulaires.service-public.fr/gf/cerfa_13788.do", cat: "Handicap", catColor: "bg-sky-100 text-sky-700" },
              { nom: "Dossier MDPH", ref: "Cerfa 15692", url: "https://www.formulaires.service-public.fr/gf/cerfa_15692.do", cat: "Handicap", catColor: "bg-sky-100 text-sky-700" },
              { nom: "Demande d'APA", ref: "Cerfa 14113", url: "https://www.formulaires.service-public.fr/gf/cerfa_14113.do", cat: "Autonomie", catColor: "bg-green-100 text-green-700" },
              { nom: "Prime de naissance (PAJE)", ref: "Cerfa 11423", url: "https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/famille/la-prestation-accueil-du-jeune-enfant-paje", cat: "Famille", catColor: "bg-pink-100 text-pink-700" },
              { nom: "Subvention association", ref: "Cerfa 12156", url: "https://www.formulaires.service-public.fr/gf/cerfa_12156.do", cat: "Association", catColor: "bg-indigo-100 text-indigo-700" },
              { nom: "Chèque énergie (demande manuelle)", ref: "Formulaire ANAH", url: "https://www.chequeenergie.gouv.fr/beneficiaire/eligibilite", cat: "Énergie", catColor: "bg-yellow-100 text-yellow-700" },
              { nom: "Bourse CROUS", ref: "DSE Etudiant.gouv", url: "https://www.messervices.etudiant.gouv.fr/envoi/", cat: "Études", catColor: "bg-violet-100 text-violet-700" },
            ].map((f, i) => (
              <a
                key={i}
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
              >
                <span className="text-2xl flex-shrink-0">📋</span>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-800 text-sm group-hover:text-blue-700 transition-colors">{f.nom}</p>
                  <p className="text-xs text-slate-400 mb-2">{f.ref}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${f.catColor}`}>{f.cat}</span>
                </div>
                <svg className="w-4 h-4 text-slate-300 group-hover:text-blue-500 flex-shrink-0 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Cas d'usage */}
        <div>
          <h2 className="font-bold text-slate-800 text-xl mb-4">Dans quels cas utiliser cet assistant ?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((u, i) => (
              <div key={i} className="flex gap-3 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-2xl flex-shrink-0">{u.icon}</span>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{u.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Retour à la recherche */}
        <div className="flex flex-col sm:flex-row gap-3 items-center pt-4">
          <Link href="/particuliers" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md">
            👤 Chercher des aides particuliers
          </Link>
          <Link href="/associations" className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors">
            🤝 Chercher des subventions
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
