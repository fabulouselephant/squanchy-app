'use client'

import { InputAdornment, Button } from '@mui/material'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { ICharacter } from '../../types/character'
import {CharacterDescription} from './components/CharacterDescription/CharacterDescription'
import { CachedCharacters } from './components/CachedCharacters/CachedCharacters'
import * as $ from './CharacterCard.styled'

export const CharacterCard = () => {
  const [cachedCharacters, setCachedCharacters] = useState<Record<string, ICharacter>>(() => {
    try {
      const stored = localStorage.getItem('character-data')
      return stored ? (JSON.parse(stored) as Record<string, ICharacter>) : {}
    } catch {
      return {}
    }
  })

  const [characterId, setCharacterId] = useState<string | null>(null)
  const [searchId, setSearchId] = useState<string | null>(null)

  const { data, error, isLoading } = useQuery<ICharacter>({
    queryKey: ['character', searchId],
    queryFn: () =>
      fetch(`https://rickandmortyapi.com/api/character/${searchId}`).then((res) => {
        if (!res.ok) {
          throw new Error('Character not found')
        }
        return res.json()
      }),
    enabled: !!searchId && !cachedCharacters[searchId],
    onSuccess: (fetchedData) => {
      if (searchId && fetchedData) {
        setCachedCharacters((prev) => {
          const updated = { ...prev, [searchId]: fetchedData }
          localStorage.setItem('character-data', JSON.stringify(updated))
          return updated
        })
      }
    },
  })


  const displayData: ICharacter | undefined = characterId !== null ? cachedCharacters[characterId] : data

  return (
    <$.Card>
      <$.CharacterCard>
        <$.ActionBar>
          <$.SearchInputContainer>
            <$.SearchInput
              data-testid="search-input"
              disabled={isLoading}
              value={characterId ?? ''}
              onChange={(e) => {
                setCharacterId(e.target.value)
                setSearchId('')
              }}
              label="Enter any number"
              variant="standard"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        data-testid="search-btn"
                        variant="text"
                        onClick={() => setSearchId(characterId)}
                        disabled={isLoading}
                      >
                        Search
                      </Button>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </$.SearchInputContainer>
        </$.ActionBar>
        <CharacterDescription isLoading={isLoading} displayData={displayData} error={error} />
      </$.CharacterCard>
      <CachedCharacters setCachedCharacters={setCachedCharacters} setCharacterId={setCharacterId} setSearchId={setSearchId} cachedCharacters={cachedCharacters} characterId={characterId} searchId={searchId}/>
    </$.Card>
  )
}
