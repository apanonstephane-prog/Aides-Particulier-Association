import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand & présentation */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <span className="font-bold text-white text-base tracking-tight">
                Aides<span className="text-blue-400">Connect</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Aides Connect est une plateforme gratuite d&apos;orientation vers les aides,
              subventions et démarches administratives.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Service gratuit pour les particuliers et les associations.
              Non affilié à un organisme public.
            </p>
          </div>

          {/* Particuliers */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-4">Particuliers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/resultats/particuliers/celibataire" className="text-slate-400 hover:text-white transition-colors">Célibataire</Link></li>
              <li><Link href="/resultats/particuliers/couple-enfants" className="text-slate-400 hover:text-white transition-colors">Couple avec enfants</Link></li>
              <li><Link href="/resultats/particuliers/parent-isole" className="text-slate-400 hover:text-white transition-colors">Parent isolé</Link></li>
              <li><Link href="/resultats/particuliers/retraite" className="text-slate-400 hover:text-white transition-colors">Retraité(e)</Link></li>
              <li><Link href="/resultats/particuliers/handicap" className="text-slate-400 hover:text-white transition-colors">Situation de handicap</Link></li>
              <li><Link href="/resultats/particuliers/etudiant" className="text-slate-400 hover:text-white transition-colors">Étudiant(e)</Link></li>
            </ul>
          </div>

          {/* Associations */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-4">Associations</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/resultats/associations/loi-1901" className="text-slate-400 hover:text-white transition-colors">Association Loi 1901</Link></li>
              <li><Link href="/resultats/associations/rup" className="text-slate-400 hover:text-white transition-colors">Reconnue d&apos;utilité publique</Link></li>
              <li><Link href="/resultats/associations/sportive" className="text-slate-400 hover:text-white transition-colors">Association sportive</Link></li>
              <li><Link href="/resultats/associations/culturelle" className="text-slate-400 hover:text-white transition-colors">Association culturelle</Link></li>
              <li><Link href="/resultats/associations/humanitaire" className="text-slate-400 hover:text-white transition-colors">Humanitaire</Link></li>
              <li><Link href="/resultats/associations/fondation" className="text-slate-400 hover:text-white transition-colors">Fondation</Link></li>
            </ul>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-4">Informations</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/methodologie" className="text-slate-400 hover:text-white transition-colors">Méthodologie</Link></li>
              <li><Link href="/contact" className="text-slate-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/mentions-legales" className="text-slate-400 hover:text-white transition-colors">Mentions légales</Link></li>
              <li><Link href="/politique-confidentialite" className="text-slate-400 hover:text-white transition-colors">Politique de confidentialité</Link></li>
              <li><Link href="/assistant" className="text-slate-400 hover:text-white transition-colors">Assistant administratif</Link></li>
            </ul>
            <div className="mt-5 pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-500">
                Partenariats &amp; collectivités :{" "}
                <a href="mailto:contact@aides-connect.fr" className="text-slate-400 hover:text-white transition-colors">
                  contact@aides-connect.fr
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
            Les informations présentées sont fournies à titre informatif. Elles ne constituent ni
            une décision administrative, ni un avis juridique. Les conditions d&apos;éligibilité,
            montants et formulaires peuvent évoluer. Vérifiez toujours les conditions en vigueur
            auprès des organismes officiels.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-500">
            © {currentYear} Aides Connect. Tous droits réservés.
          </p>
          <div className="flex gap-5 text-xs text-slate-500">
            <Link href="/mentions-legales" className="hover:text-slate-300 transition-colors">Mentions légales</Link>
            <Link href="/politique-confidentialite" className="hover:text-slate-300 transition-colors">Confidentialité</Link>
            <Link href="/methodologie" className="hover:text-slate-300 transition-colors">Méthodologie</Link>
            <Link href="/contact" className="hover:text-slate-300 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
