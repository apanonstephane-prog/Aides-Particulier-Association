import { ObHeroMedia } from '@/components/ObsidianPageHero'
import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ObsidianServiceFinder from '@/components/ObsidianServiceFinder'
export const metadata:Metadata={title:'Un guichet près de chez vous — Clara',description:'Retrouvez un France services, une mairie ou un CCAS via l’annuaire public.'}
export default function Nearby(){return <><Navbar/><div className="ob-tool-page ob-tool-page--clara"><section className="ob-tool-intro ob-page-hero ob-page-hero--compact"><ObHeroMedia slug="proximite" /><div className="ob-wrap"><Link className="ob-tool-back" href="/conseil">← Retour à Clara</Link><p className="ob-overline">CLARA / 01 · SE FAIRE ACCOMPAGNER</p><h1>Vous n’êtes pas seul.</h1><p>Trouvez un interlocuteur public de proximité dans votre commune, pour vous orienter ou vous accompagner dans vos démarches.</p></div></section><div className="ob-wrap"><ObsidianServiceFinder theme="clara"/><div className="ob-tool-cards"><Link href="/conseil?type=particulier">◇ Diagnostic local<span>Repérer les aides à vérifier</span></Link><Link href="/plan-action">◷ Mon calendrier<span>Suivre les échéances confirmées</span></Link><Link href="/assistant">✦ Mon dossier<span>Préparer mes informations sur l’appareil</span></Link></div></div></div><Footer/></>}
