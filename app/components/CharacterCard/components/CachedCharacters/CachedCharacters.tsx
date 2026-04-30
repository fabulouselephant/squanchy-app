import Image from 'next/image'
import { CharacterProps } from '../../../../types/character'
import * as $ from './CachedCharacters.styled'
import { useCharacterStore } from '../../../../hooks/useCachedCharactersStore'

export type TCachedCharacters = {
  cachedCharacters: Record<string, CharacterProps>
  characterId: string | null
  setCharacterId: (id: string | null) => void
}

export const CachedCharacters = ({ setCharacterId, characterId }: TCachedCharacters) => {
  const { clearCache, cachedCharacters } = useCharacterStore()

  const onImageClick = (id: string) => {
    setCharacterId(String(id))
  }
  return (
    <$.CachedCharacters data-testid="cached-characters">
      <$.ClearAllButton data-testid="clear-all-btn" onClick={clearCache}>
        Clear All
      </$.ClearAllButton>
      {Object.keys(cachedCharacters).length > 0 && (
        <$.CachedCharactersContainer>
          {Object.values(cachedCharacters).map((character: CharacterProps) => (
            <$.CachedCharacter
              key={character.id}
              data-testid="cached-character-item"
              selected={String(character.id) === characterId}
            >
              <Image
                onClick={() => {
                  onImageClick(character.id)
                }}
                src={character.image}
                alt="character"
                width={60}
                height={60}
                style={{
                  objectFit: 'cover',
                  opacity: String(character.id) === characterId ? 1 : 0.5,
                }}
              />
            </$.CachedCharacter>
          ))}
        </$.CachedCharactersContainer>
      )}
    </$.CachedCharacters>
  )
}
