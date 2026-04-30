import { Stack, CircularProgress } from '@mui/material'
import Image from 'next/image'
import { CharacterProps } from '../../../../types/character'
import * as $ from './CharactedDescription.styled'

export type TCharacterCard = {
  displayData: CharacterProps | undefined
  isLoading: boolean
  error: unknown
}

export const CharacterDescription = ({ displayData, isLoading, error }: TCharacterCard) => {
  return (
    <Stack data-testid="character-description" direction={{ xs: 'column', md: 'row' }}>
      <$.MainImageContainer>
        {isLoading ? (
          <$.SpinnerContainer>
            <CircularProgress sx={{ m: 'auto' }} aria-label="Loading…" />
          </$.SpinnerContainer>
        ) : (
          <Image
            loading="eager"
            data-testid="character-image"
            src={displayData ? displayData.image : '/rick_and_morty.svg'}
            alt="character"
            width={224}
            height={224}
          />
        )}
      </$.MainImageContainer>

      <$.CharacterDescriptionContainer>
        {displayData ? (
          <>
            <$.CharacterNameRow data-testid="character-name">{displayData?.name}</$.CharacterNameRow>
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
              <$.CharacterDescripionLine
                greytext={displayData?.status === 'unknown'}
                sx={{ color: displayData?.status === 'Dead' ? 'red' : '' }}
              >
                {displayData?.status}
              </$.CharacterDescripionLine>
            </$.CharacterDescription>
          </>
        ) : error ? (
          <$.ErrorMessage data-testid="error-message">{'Character not found'}</$.ErrorMessage>
        ) : null}
      </$.CharacterDescriptionContainer>
    </Stack>
  )
}
