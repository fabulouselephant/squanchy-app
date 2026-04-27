import { Stack, Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const CharacterDescripionLine = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'greytext',
})<{ greytext?: boolean }>(({ greytext }) => ({
  fontSize: '16px',
  color: greytext ? 'rgba(177, 177, 177, 1)' : 'inherit',
  fontWeight: !greytext ? 'bold' : 'inherit',
}))

export const CharacterDescription = styled(Stack)({
  display: 'grid',
  gridTemplateColumns: '60px 1fr',
  columnGap: '16px',
})

export const MainImageContainer = styled(Box)(({ theme }) => ({
  height: '224px',
  width: '224px',
  marginTop: '30px',
  borderRadius: '5px',
  boxShadow: '0px 0px 4px 4px rgba(0, 0, 0, 0.09)',
}))

export const ErrorMessage = styled(Typography)({
  fontWeight: 700,
  fontSize: '32px',
  color: 'red',
})

export const SpinnerContainer = styled(Box)({
  display: 'flex',
  height: '100%',
})

export const CharacterDescriptionContainer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  minWidth: 0,
  margin: '50px',

  [theme.breakpoints.down('md')]: {
    margin: '30px',
  },

  [theme.breakpoints.down('xs')]: {
    margin: '20px',
  },
}))

export const CharacterNameRow = styled(Typography)({
  fontWeight: 700,
  fontSize: '32px',
})
