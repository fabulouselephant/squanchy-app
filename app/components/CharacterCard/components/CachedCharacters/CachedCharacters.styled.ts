'use client'

import { Stack, Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export const CachedCharacters = styled(Stack)(({ theme }) => ({
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'row',
  },
  marginTop: '14px',
}))
export const CachedCharactersContainer = styled(Stack)(({ theme }) => ({
  height: '500px',
  flexDirection: 'column',
  overflow: 'scroll',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'row',
    width: '100%',
    margin: 'auto',
  },
}))

export const CachedCharacter = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(({ selected }) => ({
  height: '60px',
  width: '60px',
  boxSizing: 'content-box',
  margin: '5px',
  padding: '2px',
  border: selected ? '1px solid blue' : '',
  borderRadius: '5px',
  position: 'relative',
}))

export const ClearAllButton = styled(Button)({
  fontStyle: 'italic',
  alignSelf: 'start',
})
