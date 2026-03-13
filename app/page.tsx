import Link from "next/link";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Aides Connect — Trouvez les aides adaptées à votre situation",
  description:
    "Aides Connect simplifie le repérage des aides, subventions et démarches administratives. Gratuit pour les particuliers et les associations, avec liens vers les sources officielles.",
  alternates: { canonical: "/" },
};

const valueCards = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Identifier les aides pertinentes",
    desc: "Repérez les dispositifs qui correspondent à votre profil parmi les aides nationales, régionales et locales.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Comprendre les conditions",
    desc: "Consultez les critères principaux de chaque aide pour mieux préparer votre dossier.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    title: "Préparer vos démarches",
    desc: "Anticipez les documents nécessaires et gagnez du temps lors de vos démarches officielles.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    ),
    title: "Accéder aux formulaires officiels",
    desc: "Retrouvez au même endroit les formulaires et liens utiles vers les organismes compétents.",
  },
];

const faqItems = [
  {
    q: "Les informations sont-elles officielles ?",
    a: "Aides Connect oriente vers des dispositifs et renvoie vers les organismes compétents et les formulaires officiels lorsque cela est possible. Les conditions finales d'éligibilité sont toujours vérifiées par l'organisme concerné.",
  },
  {
    q: "Faut-il créer un compte ?",
    a: "Non. Le site peut être utilisé librement. Certaines fonctions pourront évoluer plus tard, mais l'accès de base reste gratuit.",
  },
  {
    q: "Mes données sont-elles envoyées ?",
    a: "L'assistant administratif est conçu pour fonctionner localement sur votre appareil pour les usages annoncés. Consultez la politique de confidentialité pour le détail des traitements réellement mis en œuvre.",
  },
  {
    q: "Le site remplace-t-il un conseiller ?",
    a: "Non. Aides Connect aide à s'orienter, à préparer ses documents et à gagner du temps. Pour une décision officielle ou un accompagnement complexe, il reste recommandé de contacter l'organisme ou un conseiller compétent.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 hero-gradient" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.12) 0%, transparent 50%),
                              radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full border border-white/20 mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-blue-300 rounded-full animate-pulse-slow" />
            Service gratuit d&apos;orientation — Particuliers &amp; Associations
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6 animate-fade-in-up">
            Trouvez les aides adaptées<br />
            <span className="text-blue-200">à votre situation, simplement</span>
          </h1>

          <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mx-auto mb-4 leading-relaxed animate-fade-in-up delay-200">
            Particulier ou association : identifiez en quelques clics les aides, subventions et
            démarches pertinentes, puis accédez aux formulaires et sources officielles.
          </p>

          <p className="text-blue-200/70 text-sm mb-10 animate-fade-in-up delay-200 font-medium tracking-wide">
            Moins de temps perdu à chercher. Plus de clarté pour agir.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-300">
            <Link
              href="/particuliers"
              className="group flex items-center justify-center gap-3 px-7 py-4 bg-white text-blue-700 font-bold text-base rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Je suis un particulier
            </Link>

            <Link
              href="/associations"
              className="group flex items-center justify-center gap-3 px-7 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-base rounded-2xl border-2 border-white/25 hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Je représente une association
            </Link>

            <Link
              href="/assistant"
              className="group flex items-center justify-center gap-3 px-7 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold text-base rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Assistant administratif
            </Link>
          </div>

          {/* Micro-réassurance */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 animate-fade-in-up delay-400">
            {[
              "Gratuit",
              "Sans inscription obligatoire",
              "Liens vers sources officielles",
              "Assistant local sur votre appareil",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-blue-200/80 text-xs font-medium">
                <svg className="w-3.5 h-3.5 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section valeur ───────────────────────────────────── */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Une interface simple pour aller à l&apos;essentiel
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto leading-relaxed">
              Aides Connect est un outil d&apos;orientation. Il ne remplace pas les administrations,
              mais vous aide à mieux vous y préparer.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueCards.map((card, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 card-hover">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  {card.icon}
                </div>
                <h3 className="font-semibold text-slate-800 mb-2 text-sm leading-snug">{card.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Comment ça marche ────────────────────────────────── */}
      <section id="comment-ca-marche" className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Comment ça marche ?
            </h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">
              Trois étapes pour identifier les aides et démarches utiles à votre situation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Choisissez votre profil",
                desc: "Particulier ou association : le parcours s'adapte à votre situation.",
                color: "bg-blue-600",
              },
              {
                step: "2",
                title: "Affinez votre besoin",
                desc: "Situation familiale, statut, type de structure, projet ou thématique.",
                color: "bg-indigo-600",
              },
              {
                step: "3",
                title: "Accédez aux pistes utiles",
                desc: "Vous obtenez une sélection d'aides, de subventions et de formulaires à vérifier auprès des organismes compétents.",
                color: "bg-violet-600",
              },
            ].map((item, i) => (
              <div key={i} className="relative p-8 rounded-2xl bg-white border border-slate-100 shadow-sm card-hover">
                <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center mb-5`}>
                  <span className="text-white font-bold text-sm">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section Particuliers ─────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-14 items-start">
            <div className="lg:w-1/2">
              <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">Particuliers</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                Des aides selon votre situation
              </h2>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Famille, logement, emploi, handicap, retraite, études, énergie : Aides Connect vous
                aide à repérer les dispositifs les plus pertinents selon votre profil.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: "Célibataire", href: "/resultats/particuliers/celibataire" },
                  { label: "Couple avec enfants", href: "/resultats/particuliers/couple-enfants" },
                  { label: "Parent isolé", href: "/resultats/particuliers/parent-isole" },
                  { label: "Famille nombreuse", href: "/resultats/particuliers/famille-nombreuse" },
                  { label: "Retraité(e)", href: "/resultats/particuliers/retraite" },
                  { label: "Situation de handicap", href: "/resultats/particuliers/handicap" },
                  { label: "Étudiant(e)", href: "/resultats/particuliers/etudiant" },
                  { label: "Demandeur d'emploi", href: "/resultats/particuliers/demandeur-emploi" },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="flex items-center gap-2 p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all text-sm font-medium text-slate-700 hover:text-blue-700"
                  >
                    <svg className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Disclaimer */}
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800 leading-relaxed">
                <strong>Note importante :</strong> Les montants et conditions peuvent évoluer.
                Vérifiez toujours votre éligibilité finale auprès de l&apos;organisme officiel.
              </div>

              <Link
                href="/particuliers"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg text-sm"
              >
                Explorer toutes les situations
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
                <h3 className="font-semibold text-slate-700 text-sm mb-5 uppercase tracking-wider">Exemples d&apos;aides répertoriées</h3>
                <div className="space-y-3">
                  {[
                    { name: "Aide Personnalisée au Logement (APL)", org: "CAF / MSA", cat: "Logement", color: "bg-blue-50 text-blue-700" },
                    { name: "Prime d'activité", org: "CAF", cat: "Emploi", color: "bg-green-50 text-green-700" },
                    { name: "Revenu de Solidarité Active (RSA)", org: "CAF / Département", cat: "Social", color: "bg-purple-50 text-purple-700" },
                    { name: "Allocation Adulte Handicapé (AAH)", org: "CAF / MDPH", cat: "Handicap", color: "bg-pink-50 text-pink-700" },
                    { name: "Bourse sur critères sociaux (CROUS)", org: "CROUS", cat: "Études", color: "bg-amber-50 text-amber-700" },
                  ].map((aide, i) => (
                    <div key={i} className="flex items-start justify-between p-3.5 rounded-xl bg-slate-50 gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-800 truncate">{aide.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{aide.org}</div>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap flex-shrink-0 ${aide.color}`}>{aide.cat}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                  Ces exemples sont donnés à titre indicatif. Les conditions d&apos;accès sont définies par chaque organisme.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section Associations ─────────────────────────────── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse gap-14 items-start">
            <div className="lg:w-1/2">
              <span className="text-indigo-600 font-semibold text-xs uppercase tracking-widest">Associations</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                Repérez les subventions et dispositifs utiles à votre structure
              </h2>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Association loi 1901, structure sportive, culturelle, humanitaire ou fondation :
                identifiez les aides, accompagnements et financements à explorer selon votre statut
                et votre projet.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: "Association Loi 1901", href: "/resultats/associations/loi-1901" },
                  { label: "Reconnue d'utilité publique", href: "/resultats/associations/rup" },
                  { label: "Association sportive", href: "/resultats/associations/sportive" },
                  { label: "Association culturelle", href: "/resultats/associations/culturelle" },
                  { label: "Humanitaire", href: "/resultats/associations/humanitaire" },
                  { label: "Environnement", href: "/resultats/associations/environnement" },
                  { label: "Fondation reconnue", href: "/resultats/associations/fondation" },
                  { label: "Association d'insertion", href: "/resultats/associations/insertion" },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-white hover:bg-indigo-50 hover:border-indigo-200 transition-all text-sm font-medium text-slate-700 hover:text-indigo-700"
                  >
                    <svg className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Crédibilité */}
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Aides Connect ne remplace pas l&apos;instruction officielle d&apos;un dossier : la plateforme
                facilite le repérage, la préparation et l&apos;orientation.
              </p>

              <Link
                href="/associations"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg text-sm"
              >
                Explorer les subventions
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="lg:w-1/2 w-full">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
                <h3 className="font-semibold text-slate-700 text-sm mb-5 uppercase tracking-wider">Exemples de dispositifs répertoriés</h3>
                <div className="space-y-3">
                  {[
                    { name: "FDVA — Fonds pour le développement de la vie associative", org: "État / Préfectures", cat: "National" },
                    { name: "Subvention municipale ou départementale", org: "Collectivités", cat: "Territorial" },
                    { name: "DLA — Dispositif Local d'Accompagnement", org: "État / Régions", cat: "Accompagnement" },
                    { name: "Erasmus+ (volet associations)", org: "Union Européenne", cat: "Europe" },
                    { name: "Appels à projets ADEME", org: "ADEME", cat: "Environnement" },
                  ].map((sub, i) => (
                    <div key={i} className="flex items-start justify-between p-3.5 rounded-xl bg-slate-50 gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-slate-800 leading-snug">{sub.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{sub.org}</div>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-indigo-50 text-indigo-700 whitespace-nowrap flex-shrink-0">{sub.cat}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                  Les montants, périodicités et conditions sont définis par chaque financeur. Consultez toujours les appels à projets en cours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section Assistant administratif ─────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-14">
            <div className="lg:w-1/2">
              <span className="text-slate-500 font-semibold text-xs uppercase tracking-widest">Outil gratuit</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                Assistant administratif gratuit
              </h2>
              <p className="text-slate-500 mb-6 leading-relaxed">
                Préparez vos informations, rassemblez vos documents et consultez vos formulaires
                plus facilement, directement depuis votre appareil.
              </p>

              <div className="space-y-3 mb-6">
                {[
                  { title: "Fonctionnement local sur l'appareil", desc: "Vos données ne quittent pas votre navigateur." },
                  { title: "Sans création de compte obligatoire", desc: "Accès immédiat, aucune inscription requise." },
                  { title: "Utile pour vos dossiers courants", desc: "CAF, logement, MDPH, retraite, CROUS, emploi, vie associative." },
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{point.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{point.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Disclaimer assistant */}
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-800 leading-relaxed mb-6">
                Aides Connect ne transmet pas vos demandes aux administrations. Il vous aide à
                préparer vos démarches avant envoi auprès des services compétents.
              </div>

              <Link
                href="/assistant"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-900 transition-colors shadow-md text-sm"
              >
                Ouvrir l&apos;assistant
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ),
                  title: "Remplissage assisté",
                  desc: "Créez votre profil et copiez vos informations en un clic pour vos dossiers.",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: "Scanner de documents",
                  desc: "Photographiez vos pièces justificatives directement depuis votre appareil.",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  ),
                  title: "Visualiseur PDF",
                  desc: "Consultez et imprimez vos formulaires officiels sans quitter la plateforme.",
                },
              ].map((item, i) => (
                <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-100 card-hover">
                  <div className="w-11 h-11 rounded-xl bg-slate-200 text-slate-600 flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-slate-800 text-sm mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pourquoi Aides Connect ───────────────────────────── */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Pourquoi Aides Connect ?</h2>
          <p className="text-slate-500 leading-relaxed">
            Les démarches administratives et la recherche d&apos;aides sont souvent longues, dispersées
            et difficiles à comprendre. Aides Connect propose un point d&apos;entrée plus simple pour
            mieux s&apos;orienter, préparer ses documents et accéder aux ressources utiles.
          </p>
          <p className="text-slate-400 text-sm mt-4">
            Le site est gratuit pour les particuliers et les associations. Il ne remplace jamais les
            organismes officiels.
          </p>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Questions fréquentes</h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item, i) => (
              <details key={i} className="group bg-slate-50 rounded-2xl border border-slate-100">
                <summary className="flex items-center justify-between p-6 cursor-pointer select-none list-none">
                  <span className="font-semibold text-slate-800 text-sm pr-4">{item.q}</span>
                  <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/contact" className="text-sm text-blue-600 hover:underline font-medium">
              Vous avez une autre question ? Contactez-nous →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA final ────────────────────────────────────────── */}
      <section className="py-20 hero-gradient">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Commencez votre recherche
          </h2>
          <p className="text-blue-100 text-base mb-10 max-w-lg mx-auto leading-relaxed">
            Gratuit, sans inscription. Vous trouverez les aides pertinentes en quelques clics,
            puis les sources officielles pour aller plus loin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/particuliers"
              className="px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl text-sm"
            >
              Je suis un particulier
            </Link>
            <Link
              href="/associations"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-2xl border-2 border-white/25 hover:bg-white/20 hover:scale-105 transition-all text-sm"
            >
              Je représente une association
            </Link>
          </div>
          <p className="mt-6 text-blue-200/60 text-xs">
            Les informations présentées sont fournies à titre indicatif. Vérifiez toujours les
            conditions en vigueur auprès des organismes officiels.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
