import type { Metadata } from 'next'
import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import ClaraStudio from './ClaraStudio'

export const metadata: Metadata = {
  title: 'Clara — conseillère IA aides & démarches',
  description: "Décrivez votre situation : Clara repère vos droits probables, vérifie les montants sur les sites officiels et prépare votre dossier.",
  alternates: { canonical: '/conseil' },
}

export default function ConseilPage() {
  return (
    <>
      <Navbar />
      <Suspense>
        <ClaraStudio />
      </Suspense>
    </>
  )
}
