import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CharacterCard } from './CharacterCard'

vi.mock('next/image', () => ({
  default: ({ src, alt, onClick }:any ) => <img src={src} alt={alt} onClick={onClick} />,
}))

vi.mock('./CharacterCard.styled', () => ({
  Card: ({ children }:any) => <div>{children}</div>,
  CharacterCard: ({ children }: any) => <div>{children}</div>,
  ActionBar: ({ children }: any) => <div>{children}</div>,
  SearchInputContainer: ({ children }: any) => <div>{children}</div>,
  SearchInput: ({ value, onChange, label, slotProps }: any) => (
    <div>
      <input aria-label={label} value={value} onChange={onChange} />
      {slotProps?.input?.endAdornment}
    </div>
  ),
}))

vi.mock('./components/CachedCharacters/CachedCharacters.styled', () => ({
  CachedCharactersContainer: ({ children }: any) => <div>{children}</div>,
  CachedCharacter: ({ children }: any) => <div>{children}</div>,
}))

vi.mock('./components/CharacterDescription/CharactedDescription.styled', () => ({
  CharacterDescripionLine: ({ children }: any) => <span>{children}</span>,
  CharacterDescription: ({ children }: any) => <div>{children}</div>,
  MainImageContainer: ({ children }: any) => <div>{children}</div>,
  ErrorMessage: ({ children }: any) => <p>{children}</p>,
}))

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive' as const,
  species: 'Human',
  type: '',
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  location: { name: 'Citadel of Ricks', url: '' },
  origin: { name: 'Earth', url: '' },
}

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

describe('CharachterCard', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  test('renders search input and buttons', () => {
    render(<CharacterCard />, { wrapper })
    expect(screen.getByTestId('search-btn')).toBeInTheDocument()
    expect(screen.getByTestId('clear-all-btn')).toBeInTheDocument()
    expect(screen.getByLabelText('Enter any number')).toBeInTheDocument()
  })

  test('fetches and displays character data on search click', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCharacter),
    })

    render(<CharacterCard />, { wrapper })

    fireEvent.change(screen.getByLabelText('Enter any number'), { target: { value: '1' } })
    fireEvent.click(screen.getByTestId('search-btn'))

    expect(await screen.findByTestId('character-name')).toBeInTheDocument()
  })

  test('loads cached characters from localStorage on mount', () => {
    localStorage.setItem('character-data', JSON.stringify({ '1': mockCharacter }))

    render(<CharacterCard />, { wrapper })

    expect(screen.getAllByAltText('character')[0]).toBeInTheDocument()
  })

  test('clears cache on Clear All click', () => {
    localStorage.setItem('character-data', JSON.stringify({ '1': mockCharacter }))

    render(<CharacterCard />, { wrapper })
    fireEvent.click(screen.getByTestId('clear-all-btn'))
    expect(localStorage.getItem('character-data')).toBeNull()
  })

  test('returns error when there is no character on this id', async () => {
    global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ error: 'Character not found' }),
      })
  
      render(<CharacterCard />, { wrapper })
  
      fireEvent.change(screen.getByLabelText('Enter any number'), { target: { value: '18999' } })
      fireEvent.click(screen.getByTestId('search-btn'))
  
      expect(await screen.findByText('Character not found')).toBeInTheDocument()
  })
})
