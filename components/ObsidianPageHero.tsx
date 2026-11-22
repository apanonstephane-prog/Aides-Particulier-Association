import Image from 'next/image'

const labels={
  "assistant": "L'atelier des démarches",
  "associations": "La force du collectif",
  "conseil": "L’espace de confiance",
  "contact": "Un dialogue bienveillant",
  "mentions-legales": "Des repères clairs",
  "methodologie": "Comprendre et vérifier",
  "particuliers": "Chacun son chemin",
  "plan-action": "Chaque étape compte",
  "politique-confidentialite": "Vos données vous appartiennent",
  "proximite": "Une porte ouverte",
  "resultats-associations": "Faire grandir les projets",
  "resultats-particuliers": "Une nouvelle perspective"
} as const
export type HeroSlug=keyof typeof labels
export function ObHeroMedia({slug}:{slug:HeroSlug}){return <figure className="ob-hero-media"><Image src={`/visuals/page-heroes/clara-${slug}.webp`} alt="" fill priority unoptimized sizes="100vw" className="ob-hero-media-image"/><figcaption className="ob-hero-caption"><span className="ob-hero-caption-icon" aria-hidden="true">◇</span><span><strong>{labels[slug]}</strong><small>Illustration IA · OBSIDIAN</small></span></figcaption></figure>}
export function ObHeroBand({slug,title}:{slug:HeroSlug;title?:string}){return <section className={`ob-page-band${title?' ob-page-band--title':''}`} aria-label={title??labels[slug]}><ObHeroMedia slug={slug}/>{title&&<div className="ob-band-copy"><p>CLARA · S’ORIENTER</p><h1>{title}</h1></div>}</section>}
