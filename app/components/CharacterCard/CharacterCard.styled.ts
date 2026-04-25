import { Stack, Box, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Card = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  margin: '20px 100px',
  justifyContent: 'space-between',
  padding: '113px 64px 110px 113px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    margin: '10px',
    padding: '10px',
  },
}))

export const CharacterCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    margin: '32px 24px',
    flexDirection: 'column',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '16px',
    flexDirection: 'column',
  },
}))

export const ActionBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))


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




