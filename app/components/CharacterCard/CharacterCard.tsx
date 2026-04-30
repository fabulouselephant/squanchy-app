'use client'

import { useState } from 'react'
import { CharacterDescription } from './components/CharacterDescription/CharacterDescription'
import { CachedCharacters } from './components/CachedCharacters/CachedCharacters'
import { SearchInput } from './components/SearchInput/SearchInput'
import * as $ from './CharacterCard.styled'
import { useCharacterStore } from '@/app/hooks/useCachedCharactersStore'
import { validateSearchInput } from '@/app/utils/validation'
import { useUploadData } from '@/app/hooks/useUploadData'

export const CharacterCard = () => {
  const { cachedCharacters } = useCharacterStore()
  const [characterId, setCharacterId] = useState<string | null>(null)
  const [searchId, setSearchId] = useState<string | null>(null)
  const [_, setValidationError] = useState<string | null>(null)

  const { data, isLoading, error } = useUploadData(searchId)
  const displayData = characterId ? (cachedCharacters[characterId] ?? data) : data

  return (
    <$.Card data-testid="character-card">
      <$.CharacterCard>
        <$.ActionBar>
          <SearchInput
            value={characterId ?? ''}
            isLoading={isLoading}
            onChange={setCharacterId}
            onSearch={() => {
              const error = validateSearchInput(characterId)
              if (error) {
                setValidationError(error)
              } else {
                setValidationError(null)
                setSearchId(characterId)
              }
            }}
          />
        </$.ActionBar>
        <CharacterDescription isLoading={isLoading} displayData={displayData} error={error} />
      </$.CharacterCard>
      <CachedCharacters cachedCharacters={cachedCharacters} characterId={characterId} setCharacterId={setCharacterId} />
    </$.Card>
  )
}
