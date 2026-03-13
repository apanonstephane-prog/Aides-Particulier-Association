import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'équipe Aides Connect pour signaler une erreur, un lien obsolète ou une proposition de partenariat.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
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
              <span className="text-slate-600">Contact</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Contact</h1>
            <p className="text-slate-500 text-base leading-relaxed">
              Une question, une suggestion, une erreur à signaler ou une proposition de
              partenariat ? Nous vous répondons dans les meilleurs délais.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <div className="grid md:grid-cols-2 gap-8 mb-12">

            {/* Email principal */}
            <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="font-bold text-slate-800 mb-2">Email</h2>
              <p className="text-slate-500 text-sm mb-3 leading-relaxed">
                Pour toute question générale sur le service.
              </p>
              <a
                href="mailto:contact@aides-connect.fr"
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                contact@aides-connect.fr
              </a>
            </div>

            {/* Partenariats */}
            <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="font-bold text-slate-800 mb-2">Partenariats &amp; collectivités</h2>
              <p className="text-slate-500 text-sm mb-3 leading-relaxed">
                Vous êtes une collectivité, une structure d&apos;accompagnement ou un acteur
                institutionnel et souhaitez explorer une collaboration ?
              </p>
              <a
                href="mailto:contact@aides-connect.fr?subject=Partenariat"
                className="text-indigo-600 hover:underline text-sm font-medium"
              >
                Nous écrire →
              </a>
            </div>
          </div>

          {/* Raisons de nous contacter */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 mb-8">
            <h2 className="font-bold text-slate-800 mb-5">Vous souhaitez...</h2>
            <ul className="space-y-3">
              {[
                { icon: "🔗", text: "Signaler un lien cassé ou une information obsolète" },
                { icon: "✏️", text: "Suggérer une aide ou un dispositif manquant" },
                { icon: "🐛", text: "Signaler un problème technique" },
                { icon: "🤝", text: "Proposer un partenariat ou une collaboration institutionnelle" },
                { icon: "💬", text: "Nous donner votre retour sur le service" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-600 p-3 rounded-xl bg-slate-50">
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

          {/* Note importante */}
          <div className="p-5 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-800 leading-relaxed">
            <strong>Note importante :</strong> Aides Connect n&apos;est pas un service public et
            ne peut pas instruire de dossier, vérifier votre éligibilité à une aide ni vous mettre
            en relation avec une administration. Pour ces démarches, contactez directement les
            organismes compétents (CAF, MDPH, Pôle Emploi, mairie, etc.) ou consultez{" "}
            <a
              href="https://www.service-public.fr"
              className="underline hover:text-amber-900"
              target="_blank"
              rel="noopener noreferrer"
            >
              service-public.fr
            </a>.
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
