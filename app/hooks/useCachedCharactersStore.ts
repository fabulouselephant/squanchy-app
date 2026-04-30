import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CharacterProps } from '../types/character'

type CharacterStore = {
  cachedCharacters: Record<string, CharacterProps>
  addCharacter: (id: string, character: CharacterProps) => void
  clearCache: () => void
}

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set) => ({
      cachedCharacters: {},
      addCharacter: (id: string, character: CharacterProps) =>
        set((state) => ({
          cachedCharacters: { ...state.cachedCharacters, [id]: character },
        })),
      clearCache: () => set({ cachedCharacters: {} }),
    }),
    {
      name: 'character-data',
    },
  ),
)
