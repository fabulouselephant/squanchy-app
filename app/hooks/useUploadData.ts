import { useQuery } from '@tanstack/react-query'
import { CharacterProps } from '../types/character'
import { useCharacterStore } from './useCachedCharactersStore'

export const useUploadData = (searchId: string | null) => {
  const { cachedCharacters, addCharacter } = useCharacterStore()

  const {
    data,
    error,
    isFetching: isLoading,
  } = useQuery<CharacterProps>({
    queryKey: ['character', searchId],
    queryFn: async () => {
      const res = await fetch(`https://rickandmortyapi.com/api/character/${searchId}`)
      if (!res.ok) {
        throw new Error('Character not found')
      }
      const fetchedData: CharacterProps = await res.json()
      if (searchId && !cachedCharacters[searchId]) {
        addCharacter(searchId, fetchedData)
      }
      return fetchedData
    },
    enabled: !!searchId && !cachedCharacters[searchId],
  })

  return { data, isLoading, error }
}
