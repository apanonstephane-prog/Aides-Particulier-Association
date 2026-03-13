import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Méthodologie",
  description:
    "Découvrez comment Aides Connect sélectionne les dispositifs, organise les informations et oriente vers les sources officielles pour les particuliers et les associations.",
  alternates: { canonical: "/methodologie" },
};

export default function MethodologiePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* En-tête */}
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <nav className="text-xs text-slate-400 mb-4" aria-label="Fil d'Ariane">
              <Link href="/" className="hover:text-slate-600 transition-colors">Accueil</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-600">Méthodologie</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Méthodologie</h1>
            <p className="text-slate-500 text-base leading-relaxed">
              Comment Aides Connect sélectionne, organise et présente les informations relatives
              aux aides, subventions et démarches administratives.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">

          {/* Objectif */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Notre objectif</h2>
            <p className="text-slate-600 leading-relaxed">
              Aides Connect a pour objectif de faciliter l&apos;orientation vers les aides,
              subventions et démarches administratives utiles aux particuliers et aux associations.
              La plateforme s&apos;adresse à toute personne souhaitant mieux comprendre les
              dispositifs existants, préparer ses démarches et gagner du temps dans ses recherches.
            </p>
          </section>

          {/* Principes */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Principes éditoriaux</h2>
            <div className="space-y-3">
              {[
                {
                  title: "Sélection des dispositifs",
                  desc: "Nous sélectionnons des dispositifs d'intérêt général : aides nationales, régionales, départementales et locales, ainsi que des accompagnements et financements à destination des associations.",
                },
                {
                  title: "Organisation par profils et thématiques",
                  desc: "Les informations sont structurées par profils (particuliers, associations) et par besoins (logement, emploi, famille, handicap, culture, environnement, etc.) pour faciliter l'orientation.",
                },
                {
                  title: "Renvoi vers les sources officielles",
                  desc: "Lorsque cela est possible, chaque dispositif est accompagné d'un lien vers la source officielle ou le formulaire de l'organisme compétent (service-public.fr, CAF, MDPH, etc.).",
                },
                {
                  title: "Transparence sur les limites",
                  desc: "Aides Connect ne garantit pas l'éligibilité d'un utilisateur à une aide donnée. Les critères, montants, délais et formulaires peuvent évoluer. La décision finale dépend toujours de l'organisme instructeur.",
                },
              ].map((item, i) => (
                <div key={i} className="p-5 bg-white rounded-xl border border-slate-100 shadow-sm">
                  <h3 className="font-semibold text-slate-800 mb-1 text-sm">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Ce que le site ne fait pas */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Ce que le site ne fait pas</h2>
            <ul className="space-y-2 text-sm text-slate-600">
              {[
                "Aides Connect ne garantit pas l'éligibilité à une aide.",
                "Aides Connect ne transmet aucune demande aux administrations.",
                "Aides Connect ne constitue pas un avis juridique ou administratif.",
                "Aides Connect ne remplace pas un conseiller, une assistante sociale ou un service public.",
                "Aides Connect ne certifie pas que les informations présentées sont exhaustives ou exemptes d'erreurs.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-slate-300 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Actualisation */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Actualisation des contenus</h2>
            <p className="text-slate-600 leading-relaxed">
              Nous nous efforçons d&apos;améliorer régulièrement la qualité, la lisibilité et
              l&apos;actualisation des contenus présentés. Cependant, les aides et dispositifs
              peuvent évoluer à tout moment : montants, conditions d&apos;accès, formulaires ou
              organismes gestionnaires. Nous vous recommandons de toujours vérifier les informations
              directement auprès de l&apos;organisme officiel concerné.
            </p>
          </section>

          {/* Bloc signalement */}
          <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl">
            <h3 className="font-semibold text-blue-900 mb-2">Vous avez repéré une erreur ou un lien obsolète ?</h3>
            <p className="text-blue-700 text-sm mb-4 leading-relaxed">
              Si vous constatez une information incorrecte, un lien cassé ou une aide qui n&apos;existe
              plus, merci de nous le signaler. Votre retour contribue à améliorer la qualité du service.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Nous contacter
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
