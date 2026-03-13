import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const stats = [
  { value: "800+", label: "Dispositifs d'aides répertoriés" },
  { value: "2M+", label: "Bénéficiaires accompagnés" },
  { value: "98%", label: "Satisfaction utilisateurs" },
  { value: "24/7", label: "Accès libre et gratuit" },
];

const features = [
  {
    icon: "🎯",
    title: "Personnalisé",
    desc: "Des résultats adaptés précisément à votre profil et situation",
  },
  {
    icon: "⚡",
    title: "Rapide",
    desc: "Trouvez vos aides en moins de 2 minutes grâce à notre sélection guidée",
  },
  {
    icon: "🔒",
    title: "Gratuit & Confidentiel",
    desc: "Aucune donnée personnelle collectée, service 100% gratuit",
  },
  {
    icon: "📋",
    title: "Complet",
    desc: "Aides nationales, régionales, départementales et locales",
  },
];

const faqItems = [
  {
    q: "Quels types d'aides puis-je trouver ?",
    a: "AidesConnect recense les allocations familiales, aides au logement, aides à l'énergie, aides sociales, subventions pour associations, et bien d'autres dispositifs publics et privés.",
  },
  {
    q: "Les informations sont-elles à jour ?",
    a: "Notre base de données est mise à jour régulièrement pour refléter les dernières évolutions législatives et les nouveaux dispositifs d'aide disponibles.",
  },
  {
    q: "Puis-je utiliser le site pour mon association ?",
    a: "Absolument ! AidesConnect dispose d'une section dédiée aux associations avec une sélection selon votre statut juridique (loi 1901, RUP, fondation, etc.) et votre domaine d'activité.",
  },
  {
    q: "Comment faire ma demande d'aide ?",
    a: "Notre guide vous présente chaque aide avec les conditions d'éligibilité, les montants, et les démarches à suivre. Des liens directs vers les organismes officiels vous sont fournis.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 hero-gradient" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
          }}
        />
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full border border-white/20 mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse-slow" />
            Guide gratuit &amp; actualisé 2024
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6 animate-fade-in-up">
            Trouvez les aides<br />
            <span className="text-blue-200">faites pour vous</span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up delay-200">
            Particulier ou association — sélectionnez votre situation et découvrez
            en quelques clics toutes les aides financières auxquelles vous avez droit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <Link
              href="/particuliers"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-white text-blue-700 font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <span className="text-2xl">👤</span>
              <div className="text-left">
                <div className="text-base font-bold">Je suis un particulier</div>
                <div className="text-xs font-normal text-blue-500">Aides familiales, logement, social...</div>
              </div>
              <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="/associations"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/15 backdrop-blur-sm text-white font-bold text-lg rounded-2xl border-2 border-white/30 hover:bg-white/25 hover:scale-105 transition-all duration-300"
            >
              <span className="text-2xl">🤝</span>
              <div className="text-left">
                <div className="text-base font-bold">Je représente une association</div>
                <div className="text-xs font-normal text-blue-200">Subventions, loi 1901, fondations...</div>
              </div>
              <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold gradient-text mb-1">{s.value}</div>
                <div className="text-sm text-slate-500 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section id="comment-ca-marche" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Simple &amp; Rapide</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Comment ça marche ?
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              En 3 étapes seulement, identifiez toutes les aides auxquelles vous avez droit
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: "🎭",
                title: "Choisissez votre profil",
                desc: "Indiquez si vous êtes un particulier ou si vous représentez une association",
                color: "from-blue-50 to-indigo-50",
                border: "border-blue-100",
              },
              {
                step: "02",
                icon: "📍",
                title: "Sélectionnez votre situation",
                desc: "Précisez votre situation familiale ou le statut de votre association",
                color: "from-indigo-50 to-purple-50",
                border: "border-indigo-100",
              },
              {
                step: "03",
                icon: "✨",
                title: "Découvrez vos aides",
                desc: "Obtenez une liste personnalisée des aides disponibles avec les démarches à suivre",
                color: "from-purple-50 to-pink-50",
                border: "border-purple-100",
              },
            ].map((item, i) => (
              <div key={i} className={`relative p-8 rounded-2xl bg-gradient-to-br ${item.color} border ${item.border} card-hover`}>
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-white rounded-full border-2 border-blue-200 flex items-center justify-center shadow-md">
                  <span className="text-xs font-bold text-blue-600">{item.step}</span>
                </div>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aperçu Particuliers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-14 items-center">
            <div className="lg:w-1/2">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Particuliers</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                Des aides pour chaque situation familiale
              </h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Que vous soyez célibataire, en couple, parent isolé, retraité ou en situation de handicap —
                des dispositifs d&apos;aide existent pour vous accompagner au quotidien.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: "👤", label: "Célibataire" },
                  { icon: "👫", label: "Couple" },
                  { icon: "🧑‍👧", label: "Parent isolé" },
                  { icon: "👨‍👩‍👧‍👦", label: "Famille nombreuse" },
                  { icon: "👴", label: "Retraité(e)" },
                  { icon: "♿", label: "Handicap" },
                  { icon: "🎓", label: "Étudiant(e)" },
                  { icon: "💼", label: "Demandeur d'emploi" },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href="/particuliers"
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all text-sm font-medium text-slate-700 hover:text-blue-700"
                  >
                    <span className="text-xl">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>

              <Link
                href="/particuliers"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
              >
                Voir toutes les situations
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl transform rotate-2" />
                <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
                  <h3 className="font-bold text-slate-800 text-lg mb-5">Aides populaires — Particuliers</h3>
                  <div className="space-y-4">
                    {[
                      { name: "Allocation de rentrée scolaire", montant: "jusqu'à 428 €", cat: "Famille", color: "bg-blue-100 text-blue-700" },
                      { name: "APL — Aide Personnalisée au Logement", montant: "variable", cat: "Logement", color: "bg-indigo-100 text-indigo-700" },
                      { name: "RSA — Revenu de Solidarité Active", montant: "607 €/mois", cat: "Social", color: "bg-purple-100 text-purple-700" },
                      { name: "Allocation Adulte Handicapé (AAH)", montant: "971 €/mois", cat: "Handicap", color: "bg-pink-100 text-pink-700" },
                      { name: "Prime d'activité", montant: "jusqu'à 635 €", cat: "Emploi", color: "bg-green-100 text-green-700" },
                    ].map((aide, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div>
                          <div className="text-sm font-semibold text-slate-800">{aide.name}</div>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${aide.color} mt-1 inline-block`}>{aide.cat}</span>
                        </div>
                        <div className="text-sm font-bold text-slate-700 text-right whitespace-nowrap ml-3">{aide.montant}</div>
                      </div>
                    ))}
                  </div>
                  <Link href="/particuliers" className="block mt-5 text-center text-sm text-blue-600 font-semibold hover:underline">
                    Voir toutes les aides →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aperçu Associations */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse gap-14 items-center">
            <div className="lg:w-1/2">
              <span className="text-indigo-600 font-semibold text-sm uppercase tracking-wider">Associations</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                Financez vos projets associatifs
              </h2>
              <p className="text-slate-500 mb-8 leading-relaxed">
                Associations loi 1901, fondations, structures reconnues d&apos;utilité publique —
                découvrez les subventions et dispositifs de soutien adaptés à votre statut.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon: "📝", label: "Association Loi 1901" },
                  { icon: "🏅", label: "Reconnue d'utilité publique" },
                  { icon: "⚽", label: "Association sportive" },
                  { icon: "🎨", label: "Association culturelle" },
                  { icon: "❤️", label: "Humanitaire" },
                  { icon: "🌱", label: "Environnement" },
                  { icon: "🏗️", label: "Fondation" },
                  { icon: "👥", label: "Fonds de dotation" },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href="/associations"
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-white hover:bg-indigo-50 hover:border-indigo-200 transition-all text-sm font-medium text-slate-700 hover:text-indigo-700"
                  >
                    <span className="text-xl">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>

              <Link
                href="/associations"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
              >
                Explorer les subventions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="lg:w-1/2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl transform -rotate-2" />
                <div className="relative bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
                  <h3 className="font-bold text-slate-800 text-lg mb-5">Subventions populaires — Associations</h3>
                  <div className="space-y-4">
                    {[
                      { name: "FDVA — Fonds pour le développement de la vie associative", montant: "variable", cat: "National", color: "bg-indigo-100 text-indigo-700" },
                      { name: "Subvention municipale", montant: "100 – 50 000 €", cat: "Collectivité", color: "bg-blue-100 text-blue-700" },
                      { name: "DLA — Dispositif Local d'Accompagnement", montant: "gratuit", cat: "Accompagnement", color: "bg-purple-100 text-purple-700" },
                      { name: "Mécénat d'entreprise", montant: "variable", cat: "Privé", color: "bg-pink-100 text-pink-700" },
                      { name: "Erasmus+ (associations européennes)", montant: "variable", cat: "Europe", color: "bg-green-100 text-green-700" },
                    ].map((sub, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                        <div>
                          <div className="text-sm font-semibold text-slate-800">{sub.name}</div>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sub.color} mt-1 inline-block`}>{sub.cat}</span>
                        </div>
                        <div className="text-sm font-bold text-slate-700 text-right whitespace-nowrap ml-3">{sub.montant}</div>
                      </div>
                    ))}
                  </div>
                  <Link href="/associations" className="block mt-5 text-center text-sm text-indigo-600 font-semibold hover:underline">
                    Voir toutes les subventions →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Pourquoi AidesConnect ?</h2>
            <p className="text-slate-500 mt-3">La plateforme de référence pour trouver vos aides</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-100 card-hover text-center">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Questions fréquentes</h2>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-slate-100 shadow-sm">
                <summary className="flex items-center justify-between p-6 cursor-pointer select-none">
                  <span className="font-semibold text-slate-800">{item.q}</span>
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-50 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Assistant Section */}
      <section className="py-16 bg-gradient-to-br from-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-sm font-medium px-4 py-2 rounded-full border border-amber-400/30 mb-6">
                <span>✨</span> Nouveau — Assistant gratuit
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Des difficultés à remplir vos dossiers ?
              </h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                Notre assistant vous aide à préparer vos formulaires administratifs,
                numériser vos documents et consulter vos PDF — sans rien envoyer sur internet.
              </p>
              <Link
                href="/assistant"
                className="inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-white font-bold text-lg rounded-2xl hover:bg-amber-600 hover:scale-105 transition-all shadow-xl"
              >
                <span className="text-2xl">🤖</span>
                Ouvrir l&apos;assistant
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {[
                { icon: "📝", title: "Remplissage assisté", desc: "Créez votre profil et copiez vos informations en un clic" },
                { icon: "📷", title: "Scanner de documents", desc: "Photographiez vos pièces justificatives directement depuis l'appli" },
                { icon: "📄", title: "Visualiseur PDF", desc: "Consultez et imprimez vos formulaires officiel PDF" },
              ].map((item, i) => (
                <div key={i} className="p-5 bg-white/10 rounded-2xl border border-white/10 hover:bg-white/15 transition-colors">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 hero-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Prêt à découvrir vos aides ?
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
            Commencez dès maintenant, c&apos;est gratuit et sans inscription
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/particuliers"
              className="px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl"
            >
              👤 Je suis un particulier
            </Link>
            <Link
              href="/associations"
              className="px-8 py-4 bg-white/15 backdrop-blur-sm text-white font-bold rounded-2xl border-2 border-white/30 hover:bg-white/25 hover:scale-105 transition-transform"
            >
              🤝 Je représente une association
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
