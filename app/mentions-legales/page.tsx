import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Aides Connect — éditeur, hébergement, propriété intellectuelle et responsabilité.",
  robots: { index: false },
  alternates: { canonical: "/mentions-legales" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="pb-8 border-b border-slate-100 last:border-0 last:pb-0">
      <h2 className="text-lg font-bold text-slate-900 mb-3">{title}</h2>
      <div className="text-slate-600 text-sm leading-relaxed space-y-2">{children}</div>
    </section>
  );
}

export default function MentionsLegalesPage() {
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
              <span className="text-slate-600">Mentions légales</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Mentions légales</h1>
            <p className="text-slate-500 text-sm">Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l&apos;économie numérique.</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

          <Section title="Éditeur du site">
            <p>Le site <strong>Aides Connect</strong> (accessible à l&apos;adresse <em>aides-connect.vercel.app</em>) est édité par :</p>
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800">
              <p className="font-medium mb-1">À compléter</p>
              <p>Nom ou raison sociale : <span className="font-mono">[À COMPLÉTER]</span></p>
              <p>Forme juridique : <span className="font-mono">[À COMPLÉTER]</span></p>
              <p>Adresse : <span className="font-mono">[À COMPLÉTER]</span></p>
              <p>Email : <a href="mailto:contact@aidesconnect.fr" className="underline">contact@aidesconnect.fr</a></p>
            </div>
          </Section>

          <Section title="Responsable de publication">
            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800">
              <p>Nom du responsable de publication : <span className="font-mono">[À COMPLÉTER]</span></p>
              <p>Contact : <a href="mailto:contact@aidesconnect.fr" className="underline">contact@aidesconnect.fr</a></p>
            </div>
          </Section>

          <Section title="Hébergement">
            <p>Le site est hébergé par :</p>
            <p><strong>Vercel Inc.</strong><br />440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />Site web : <a href="https://vercel.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">vercel.com</a></p>
          </Section>

          <Section title="Propriété intellectuelle">
            <p>
              L&apos;ensemble des contenus présents sur le site Aides Connect (textes, structure, organisation des pages) est la propriété de l&apos;éditeur, sauf mentions contraires.
            </p>
            <p>
              Toute reproduction, représentation, modification ou exploitation totale ou partielle des contenus, sans autorisation expresse de l&apos;éditeur, est interdite et constituerait une contrefaçon.
            </p>
            <p>
              Les informations relatives aux dispositifs d&apos;aide sont issues de sources publiques. Les formulaires officiels restent la propriété des organismes publics concernés.
            </p>
          </Section>

          <Section title="Responsabilité">
            <p>
              Les informations présentées sur Aides Connect sont fournies à titre informatif. Elles ne constituent ni une décision administrative, ni un avis juridique ou fiscal.
            </p>
            <p>
              L&apos;éditeur s&apos;efforce de maintenir des informations exactes et à jour, mais ne peut garantir l&apos;exhaustivité, l&apos;exactitude ou l&apos;actualité des contenus publiés. L&apos;éligibilité à une aide est toujours déterminée par l&apos;organisme officiel compétent.
            </p>
            <p>
              L&apos;éditeur ne saurait être tenu responsable d&apos;un préjudice résultant d&apos;une utilisation des informations présentées sur le site.
            </p>
          </Section>

          <Section title="Liens hypertextes">
            <p>
              Le site peut contenir des liens vers des sites tiers (organismes publics, formulaires officiels). L&apos;éditeur n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou leur disponibilité.
            </p>
          </Section>

          <Section title="Contact">
            <p>Pour toute question relative aux présentes mentions légales :</p>
            <p><a href="mailto:contact@aidesconnect.fr" className="text-blue-600 hover:underline">contact@aidesconnect.fr</a></p>
          </Section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
