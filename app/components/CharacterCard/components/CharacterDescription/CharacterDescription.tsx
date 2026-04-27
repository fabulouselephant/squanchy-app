import { Stack, Typography, Box, CircularProgress } from '@mui/material'
import * as $ from './CharactedDescription.styled'
import Image from 'next/image'
import { ICharacter } from '../../../../types/character'

export type TCharacterCard = {
  displayData: ICharacter | undefined
  isLoading: boolean
  error: unknown
}

export const CharacterDescription = ({ displayData, isLoading, error }: TCharacterCard) => {
  return (
    <Stack data-testid="character-description" direction={{ xs: 'column', md: 'row' }}>
      <$.MainImageContainer>
        {isLoading ? (
          <Box sx={{ display: 'flex', height: '100%' }}>
            <CircularProgress sx={{ m: 'auto' }} aria-label="Loading…" />
          </Box>
        ) : (
          <Image
            data-testid="character-image"
            src={displayData ? displayData.image : '/rick_and_morty.svg'}
            alt="character"
            width={224}
            height={224}
          />
        )}
      </$.MainImageContainer>

      <Box sx={{ margin: { xs: '20px 0', md: '50px' }, flex: 1, minWidth: 0 }}>
        {displayData ? (
          <>
            <Typography data-testid="character-name" sx={{ fontWeight: 700, fontSize: '32px' }}>
              {displayData?.name}
            </Typography>
            <$.CharacterDescription>
              <$.CharacterDescripionLine greytext>Species</$.CharacterDescripionLine>
              <$.CharacterDescripionLine>{displayData?.species}</$.CharacterDescripionLine>
            </$.CharacterDescription>
            <$.CharacterDescription>
              <$.CharacterDescripionLine greytext>Type</$.CharacterDescripionLine>
              <$.CharacterDescripionLine greytext={displayData?.type === '' || displayData?.type === 'unknown'}>
                {displayData?.type || 'unknown'}
              </$.CharacterDescripionLine>
            </$.CharacterDescription>
            <$.CharacterDescription>
              <$.CharacterDescripionLine greytext>Location</$.CharacterDescripionLine>
              <$.CharacterDescripionLine
                greytext={displayData?.location.name === '' || displayData?.location.name === 'unknown'}
              >
                {displayData?.location.name || 'unknown'}
              </$.CharacterDescripionLine>
            </$.CharacterDescription>
            <$.CharacterDescription>
              <$.CharacterDescripionLine greytext>Origin</$.CharacterDescripionLine>
              <$.CharacterDescripionLine
                greytext={displayData?.origin.name === '' || displayData?.origin.name === 'unknown'}
              >
                {displayData?.origin.name || 'unknown'}
              </$.CharacterDescripionLine>
            </$.CharacterDescription>
            <$.CharacterDescription>
              <$.CharacterDescripionLine greytext>Status</$.CharacterDescripionLine>
              <$.CharacterDescripionLine sx={{ color: displayData?.status === 'Dead' ? 'red' : 'green' }}>
                {displayData?.status}
              </$.CharacterDescripionLine>
            </$.CharacterDescription>
          </>
        ) : error ? (
          <$.ErrorMessage data-testid="error-message">Character not found</$.ErrorMessage>
        ) : null}
      </Box>
    </Stack>
  )
}
