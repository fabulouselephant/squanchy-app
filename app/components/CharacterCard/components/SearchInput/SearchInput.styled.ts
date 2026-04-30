'use client'

import { Box, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

export const SearchInput = styled(TextField)({
  width: '224px',
  fontSize: '18px',
  fontStyle: 'italic',
})

export const SearchInputContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
})
