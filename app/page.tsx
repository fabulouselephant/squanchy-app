'use client'

import dynamic from 'next/dynamic'

const CharacterCard = dynamic(() => import('./components/CharacterCard/CharacterCard').then((m) => m.CharacterCard),
{ ssr: false } 
)

export default function Home() {
  return <CharacterCard />
}
