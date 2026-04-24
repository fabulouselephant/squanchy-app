'use client'

import dynamic from "next/dynamic"

const CharachterCard = dynamic(                                                                                                                                                                        
  () => import("./src/components/CharachterCard/CharachterCard").then(m => m.CharachterCard),                                                                                                        
  { ssr: false }                                                                                                                                                                                     
)

export default function Home() {
  return (
      <CharachterCard />
  )
}
