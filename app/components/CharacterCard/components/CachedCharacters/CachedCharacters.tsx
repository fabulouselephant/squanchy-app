import Image from 'next/image'
import { ICharacter } from '../../../../types/character'
import * as $ from './CachedCharacters.styled'

export type TCachedCharacters = {
  setSearchId: (id: string | null) => void
  cachedCharacters: Record<string, ICharacter>
  characterId: string | null
  searchId: string | null
  setCachedCharacters: React.Dispatch<React.SetStateAction<Record<string, ICharacter>>>
  setCharacterId: (id: string | null) => void
}

export const CachedCharacters = ({
  setCachedCharacters,
  setCharacterId,
  setSearchId,
  cachedCharacters,
  searchId,
  characterId,
}: TCachedCharacters) => {
  const handleClearCache = () => {
    setCachedCharacters({})
    setCharacterId(null)
    setSearchId(null)
    localStorage.removeItem('character-data')
  }

  const onImageClick = (id: string) => {
    setCharacterId(String(id))
    setSearchId(String(id))
  }
  return (
    <$.CachedCharacters data-testid="cached-characters">
      <$.ClearAllButton data-testid="clear-all-btn" onClick={handleClearCache}>
        Clear All
      </$.ClearAllButton>
      {Object.keys(cachedCharacters).length > 0 && (
        <$.CachedCharactersContainer>
          {Object.values(cachedCharacters).map((character: ICharacter) => (
            <$.CachedCharacter
              key={character.id}
              data-testid="cached-character-item"
              selected={String(character.id) === characterId || String(character.id) === searchId}
            >
              <Image
                onClick={() => {
                  onImageClick(character.id)
                }}
                src={character.image}
                alt="charachter"
                width={60}
                height={60}
                style={{
                  objectFit: 'cover',
                  opacity: String(character.id) === characterId || String(character.id) === searchId ? 1 : 0.5,
                }}
              />
            </$.CachedCharacter>
          ))}
        </$.CachedCharactersContainer>
      )}
    </$.CachedCharacters>
  )
}
