export type CharacterProps = {
  id: string
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  type: string
  image: string
  location: { name: string }
  origin: { name: string }
}
