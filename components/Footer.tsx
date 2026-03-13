import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white text-lg font-bold">A</span>
              </div>
              <span className="font-bold text-white text-lg">
                Aides<span className="text-blue-400">Connect</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Votre guide pour trouver les aides financières adaptées à votre situation, particulier ou association.
            </p>
          </div>

          {/* Particuliers */}
          <div>
            <h3 className="font-semibold text-white mb-4">Particuliers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/particuliers?situation=celibataire" className="hover:text-blue-400 transition-colors">Célibataire</Link></li>
              <li><Link href="/particuliers?situation=couple-enfants" className="hover:text-blue-400 transition-colors">Couple avec enfants</Link></li>
              <li><Link href="/particuliers?situation=parent-isole" className="hover:text-blue-400 transition-colors">Parent isolé</Link></li>
              <li><Link href="/particuliers?situation=retraite" className="hover:text-blue-400 transition-colors">Retraité(e)</Link></li>
              <li><Link href="/particuliers?situation=handicap" className="hover:text-blue-400 transition-colors">Situation de handicap</Link></li>
              <li><Link href="/particuliers?situation=etudiant" className="hover:text-blue-400 transition-colors">Étudiant(e)</Link></li>
            </ul>
          </div>

          {/* Associations */}
          <div>
            <h3 className="font-semibold text-white mb-4">Associations</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/associations?statut=loi-1901" className="hover:text-blue-400 transition-colors">Association Loi 1901</Link></li>
              <li><Link href="/associations?statut=rup" className="hover:text-blue-400 transition-colors">Reconnue d&apos;utilité publique</Link></li>
              <li><Link href="/associations?statut=sportive" className="hover:text-blue-400 transition-colors">Association sportive</Link></li>
              <li><Link href="/associations?statut=culturelle" className="hover:text-blue-400 transition-colors">Association culturelle</Link></li>
              <li><Link href="/associations?statut=humanitaire" className="hover:text-blue-400 transition-colors">Association humanitaire</Link></li>
              <li><Link href="/associations?statut=fondation" className="hover:text-blue-400 transition-colors">Fondation</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact & Infos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#comment-ca-marche" className="hover:text-blue-400 transition-colors">Comment ça marche</Link></li>
              <li><a href="mailto:contact@aidesconnect.fr" className="hover:text-blue-400 transition-colors">contact@aidesconnect.fr</a></li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-slate-500">
                Les informations présentées sont données à titre indicatif. Consultez les organismes officiels pour obtenir des informations précises sur votre situation.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © 2024 AidesConnect. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-300 transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Accessibilité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
