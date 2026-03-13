import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité d'Aides Connect — données collectées, finalités, droits des utilisateurs.",
  robots: { index: false },
  alternates: { canonical: "/politique-confidentialite" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="pb-8 border-b border-slate-100 last:border-0 last:pb-0">
      <h2 className="text-lg font-bold text-slate-900 mb-3">{title}</h2>
      <div className="text-slate-600 text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  );
}

export default function PolitiqueConfidentialitePage() {
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
              <span className="text-slate-600">Politique de confidentialité</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Politique de confidentialité
            </h1>
            <p className="text-slate-500 text-sm">
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
              Informatique et Libertés. Dernière mise à jour : mars 2026.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

          <Section title="Responsable du traitement">
            <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
              <p><strong>Stéphane APANON</strong></p>
              <p>Entrepreneur Individuel — SIRET : 750 420 200 00024</p>
              <p>1093 Chemin des Moulins — 32600 Pujaudran</p>
              <p>Contact : <a href="mailto:contact@aides-connect.fr" className="text-blue-600 hover:underline">contact@aides-connect.fr</a></p>
            </div>
          </Section>

          <Section title="Données collectées">
            <p>
              <strong>Données de navigation :</strong> lors de votre visite sur Aides Connect, des
              données techniques peuvent être collectées automatiquement par l&apos;hébergeur
              (Vercel) : adresse IP, type de navigateur, pages visitées, date et heure de connexion.
              Ces données sont traitées dans le cadre du fonctionnement normal de l&apos;infrastructure
              d&apos;hébergement.
            </p>
            <p>
              <strong>Données saisies dans l&apos;assistant administratif :</strong> les informations
              que vous saisissez dans l&apos;assistant (remplissage assisté, scanner de documents,
              visualiseur PDF) sont traitées localement sur votre appareil. Elles ne sont pas
              transmises à nos serveurs ni à des tiers.
            </p>
            <p>
              <strong>Formulaire de contact :</strong> si vous nous contactez via le formulaire ou
              par email, les données fournies (nom, email, message) sont utilisées uniquement pour
              répondre à votre demande.
            </p>
          </Section>

          <Section title="Finalités des traitements">
            <ul className="space-y-1.5">
              {[
                "Assurer le fonctionnement et la sécurité du site",
                "Répondre aux demandes de contact",
                "Améliorer la qualité du service (analyses d'usage agrégées, si applicable)",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Base légale">
            <p>
              Les traitements reposent sur les bases légales suivantes, selon les cas : intérêt
              légitime (fonctionnement du site), consentement (cookies analytiques si utilisés),
              exécution d&apos;une mesure précontractuelle ou d&apos;un contrat (réponse aux
              demandes de contact).
            </p>
          </Section>

          <Section title="Durée de conservation">
            <p>
              Les données de navigation sont conservées par l&apos;hébergeur selon sa propre
              politique (consultable sur <a href="https://vercel.com/legal/privacy-policy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a>).
            </p>
            <p>
              Les données de contact sont conservées le temps nécessaire au traitement de la demande,
              puis supprimées.
            </p>
          </Section>

          <Section title="Cookies et mesure d'audience">
            <p>
              Le site peut utiliser des cookies techniques nécessaires à son fonctionnement. Aucun
              cookie publicitaire ou de profilage n&apos;est utilisé à ce jour.
            </p>
            <p>
              Si des outils de mesure d&apos;audience sont mis en place (par exemple Vercel
              Analytics), ils seront mentionnés ici avec les modalités de consentement appropriées.
            </p>
          </Section>

          <Section title="Partage de données">
            <p>
              Aides Connect ne vend pas et ne loue pas vos données personnelles. Aucune donnée
              personnelle n&apos;est transmise à des tiers à des fins commerciales.
            </p>
            <p>
              Des données techniques peuvent être accessibles à l&apos;hébergeur (Vercel) dans le
              cadre des services d&apos;infrastructure.
            </p>
          </Section>

          <Section title="Vos droits">
            <p>
              Conformément au RGPD, vous disposez des droits suivants concernant vos données
              personnelles :
            </p>
            <ul className="space-y-1.5">
              {[
                "Droit d'accès",
                "Droit de rectification",
                "Droit à l'effacement (droit à l'oubli)",
                "Droit à la limitation du traitement",
                "Droit à la portabilité",
                "Droit d'opposition",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <p>
              Pour exercer ces droits, contactez-nous à :{" "}
              <a href="mailto:contact@aides-connect.fr" className="text-blue-600 hover:underline">
                contact@aides-connect.fr
              </a>
            </p>
            <p>
              En cas de désaccord, vous pouvez introduire une réclamation auprès de la{" "}
              <a
                href="https://www.cnil.fr"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                CNIL
              </a>.
            </p>
          </Section>

          <Section title="Modifications">
            <p>
              Cette politique de confidentialité peut être mise à jour. La version en vigueur est
              celle accessible sur cette page, avec sa date de mise à jour.
            </p>
          </Section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
