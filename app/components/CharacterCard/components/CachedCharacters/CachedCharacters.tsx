import { Stack, Button } from '@mui/material'
import * as $ from './CachedCharacters.styled'
import Image from 'next/image'
import { ICharacter } from '../../../../types/character'

export type TCachedCharacters = {
    setCachedCharacters: React.Dispatch<React.SetStateAction<Record<string, ICharacter>>>,
    setCharacterId: (id: string | null) => void,
    setSearchId: (id: string| null) =>  void,
    cachedCharacters: Record<string, ICharacter>,
    characterId: string | null,
    searchId: string | null,
}

export const CachedCharacters = ({setCachedCharacters, setCharacterId, setSearchId, cachedCharacters, searchId, characterId }:TCachedCharacters) => {
    const clearCache = () => {
        setCachedCharacters({})
        setCharacterId(null)
        setSearchId(null)
        localStorage.removeItem('character-data')
      }

    return (<Stack direction={{ sx: 'row', md: 'column', lg: 'column' }} sx={{ mt: 2 }}>
        <Button data-testid="clear-all-btn" onClick={() => clearCache()} sx={{ fontStyle: 'italic', alignSelf: 'start' }}>
          Clear All
        </Button>
        {Object.keys(cachedCharacters).length > 0 && (
          <$.CachedCharactersContainer>
            {Object.values(cachedCharacters).map((character: ICharacter) => (
              <$.CachedCharacter
                key={character.id}
                selected={String(character.id) === characterId || String(character.id) === searchId}
              >
                <Image
                  onClick={() => {
                    setCharacterId(String(character.id))
                    setSearchId(String(character.id))
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
      </Stack>
    )
}