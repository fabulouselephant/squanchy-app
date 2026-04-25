'use client'

import { Box, InputAdornment, CircularProgress, Typography, Stack, Button } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import * as $ from './CharacterCard.styled'
import { ICharacter } from '../../types/character'

export const CharacterCard = () => {
  const [cachedCharacters, setCachedCharacters] = useState<Record<string, ICharacter>>({})

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
  })

  useEffect(() => {
    if (data && searchId) {
    const updated = { ...cachedCharacters, [searchId]: data }
    setCachedCharacters(updated)
    localStorage.setItem('character-data', JSON.stringify(updated))
    }
    
  }, [data, searchId])

  useEffect(() => {
    const stored = localStorage.getItem('character-data')
    if (stored) setCachedCharacters(JSON.parse(stored) as Record<string, ICharacter>)
  }, [])

  const clearCache = () => {
    setCachedCharacters({})
    setCharacterId(null)
    setSearchId(null)
    localStorage.removeItem('character-data')
  }

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
                      <Button data-testid="search-btn" variant="text" onClick={() => setSearchId(characterId)} disabled={isLoading}>
                        Search
                      </Button>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </$.SearchInputContainer>
        </$.ActionBar>

        <Stack direction={{ xs: 'column', md: 'row' }}>
          <$.MainImageContainer>
            {isLoading ? (
              <Box sx={{ display: 'flex', height: '100%', }}>
                <CircularProgress sx={{ m: 'auto' }} aria-label="Loading…" />
              </Box>
            ) : (
              <Image
                src={displayData ? displayData.image : '/rick_and_morty.svg'}
                alt="charachter"
                width={224}
                height={224}
              />
            )}
          </$.MainImageContainer>

          <Box sx={{ margin: { xs: '20px 0', md: '50px' }, flex: 1, minWidth: 0 }}>
            {displayData ? (
              <>
                <Typography data-testid="character-name" sx={{ fontWeight: 700, fontSize: '32px' }}>{displayData?.name}</Typography>
                <$.CharacterDescription>
                  <$.CharacterDescripionLine greytext>Species</$.CharacterDescripionLine>
                  <$.CharacterDescripionLine>{displayData?.species}</$.CharacterDescripionLine>
                </$.CharacterDescription>
                <$.CharacterDescription>
                  <$.CharacterDescripionLine greytext>Type</$.CharacterDescripionLine>
                  <$.CharacterDescripionLine greytext={displayData?.type === '' || displayData?.type === 'unknown'}>
                    {displayData?.type || 'unknown'}
                  </$.CharacterDescripionLine>
                </$.CharacterDescription>
                <$.CharacterDescription>
                  <$.CharacterDescripionLine greytext>Location</$.CharacterDescripionLine>
                  <$.CharacterDescripionLine
                    greytext={displayData?.location.name === '' || displayData?.location.name === 'unknown'}
                  >
                    {displayData?.location.name || 'unknown'}
                  </$.CharacterDescripionLine>
                </$.CharacterDescription>
                <$.CharacterDescription>
                  <$.CharacterDescripionLine greytext>Origin</$.CharacterDescripionLine>
                  <$.CharacterDescripionLine
                    greytext={displayData?.origin.name === '' || displayData?.origin.name === 'unknown'}
                  >
                    {displayData?.origin.name || 'unknown'}
                  </$.CharacterDescripionLine>
                </$.CharacterDescription>
                <$.CharacterDescription>
                  <$.CharacterDescripionLine greytext>Status</$.CharacterDescripionLine>
                  <$.CharacterDescripionLine sx={{ color: displayData?.status === 'Dead' ? 'red' : 'green' }}>
                    {displayData?.status}
                  </$.CharacterDescripionLine>
                </$.CharacterDescription>
              </>
            ) : error ? (
              <$.ErrorMessage data-testid="error-message">Character not found</$.ErrorMessage>
            ) : null}
          </Box>

        </Stack>
      </$.CharacterCard>
            <Stack direction={{ sx: 'row', md: 'row', lg: 'column', }} sx={{mt:2}}>
                <Button data-testid="clear-all-btn" onClick={clearCache} sx={{ fontStyle: 'italic', alignSelf: 'start' }}>
                    Clear All
                </Button>
                {Object.keys(cachedCharacters).length > 0 && (
                    <$.CachedCharactersContainer>
                    {Object.values(cachedCharacters)
                        .map((character: ICharacter) => (
                        <$.ChachedCharacter
                            key={character.id}
                            bordered={String(character.id) === characterId || String(character.id) === searchId}
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
                            style={{ objectFit: 'cover', opacity: String(character.id) === characterId || String(character.id) === searchId ? 1 : 0.5 }}
                            />
                        </$.ChachedCharacter>
                    ))}
                </$.CachedCharactersContainer>
            )}
            </Stack>
    </$.Card>
  )
}
