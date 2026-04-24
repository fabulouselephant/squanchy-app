'use client'

import dynamic from "next/dynamic"

const CharacterCard = dynamic(                                                                                                                                                                        
  () => import("./src/components/CharacterCard/CharacterCard").then(m => m.CharacterCard),                                                                                                        
  { ssr: false }                                                                                                                                                                                     
)

export default function Home() {
  return (
      <CharacterCard />
  )
}
