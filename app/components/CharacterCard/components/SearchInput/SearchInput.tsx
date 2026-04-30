'use client'

import { InputAdornment, Button } from '@mui/material'
import * as $ from './SearchInput.styled'

type TSearchInput = {
  value: string
  isLoading: boolean
  onChange: (value: string) => void
  onSearch: () => void
}

export const SearchInput = ({ value, isLoading, onChange, onSearch }: TSearchInput) => {
  return (
    <$.SearchInputContainer>
      <$.SearchInput
        data-testid="search-input"
        disabled={isLoading}
        value={value}
        onChange={(e) => {
          if (/^\d*$/.test(e.target.value)) {
            onChange(e.target.value)
          }
        }}
        placeholder="Enter any number"
        variant="standard"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <Button data-testid="search-btn" variant="text" onClick={onSearch} disabled={isLoading}>
                  Search
                </Button>
              </InputAdornment>
            ),
          },
        }}
      />
    </$.SearchInputContainer>
  )
}
