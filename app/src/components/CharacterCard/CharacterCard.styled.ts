import { Typography, Stack, Box, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Card = styled(Stack)(({theme}) => ({
    flexDirection: 'row', 
    margin: '20px 150px',
    justifyContent:'space-between',
    padding: '113px 64px 110px 113px',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        margin: '10px',
        padding: '10px',
      }, 
}))

export const CharacterDescripionLine = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'greytext',
})<{ greytext?: boolean }>(({ greytext }) => ({
  fontSize: '16px',
  color: greytext ? 'rgba(177, 177, 177, 1)' : 'inherit',
  fontWeight: !greytext ? 'bold' : 'inherit',
}))

export const CharacterCard = styled(Box)(({theme}) => ({
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

export const ActionBar = styled(Box)(({theme}) =>({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
   width: '100%',
  },           
}))

export const CharacterDescription = styled(Stack)({
  display: 'grid',
  gridTemplateColumns: '60px 1fr',
  columnGap: '16px',
})

export const ChachedCharacter = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bordered',
})<{ bordered?: boolean }>(({ bordered }) => ({
  height: '60px',
  width: '60px',
  boxSizing: 'content-box',
  margin: '5px',
  padding: '2px',
  border: bordered ? '1px solid blue' : '',
  borderRadius: '5px',
}))

export const MainImageContainer = styled(Box)(({theme}) => ({
  height: '224px',
  width: '224px',
  marginTop: '30px',
  borderRadius: '5px',
  boxShadow: '0px 0px 4px 4px rgba(0, 0, 0, 0.09)',
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

export const ErrorMessage = styled(Typography)({
  fontWeight: 700,
  fontSize: '32px',
  color: 'red',
})

export const CachedCharactersContainer = styled(Stack)(({theme}) =>({
    height: '500px',
    flexDirection: 'column',
    overflow: 'scroll',
    [theme.breakpoints.down('md')]: {
     flexDirection: 'row',
     width: '100%',
     margin: 'auto',
    },
  }))