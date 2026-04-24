'use client';

import { Box, InputAdornment, CircularProgress, Typography, Stack, Button } from "@mui/material"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import * as $ from './CharacterCard.styled'
import { ICharacter } from "../../types/character"

export const CharacterCard = () => {
    const [cachedCharacters, setCachedCharacters] = useState<Record<string, ICharacter>>({})
   
    const [characterId, setCharacterId] = useState<string | null>(null)                                                                                                                                        
    const [searchId, setSearchId] = useState<string| null>(null)
    
    const {data, error, isLoading} = useQuery<ICharacter>({
        queryKey: ['character', searchId],
        queryFn: () => fetch(`https://rickandmortyapi.com/api/character/${searchId}`).
        then(res => {
            if(!res.ok) {
                throw new Error('Character not found')
            }
            return res.json()
        }),
        enabled:  !!searchId && !cachedCharacters[searchId]
    })
    
    useEffect(() => {
        if(data && searchId) {
            const existing = Object.entries(cachedCharacters).filter(([id]) => id !== searchId)                                                                                                    
            const updatedCachedCharacters = Object.fromEntries(                                                                                                                                            
                [...existing, [searchId, data]].slice(-3)                                                                                                                                                  
            ) as Record<string, ICharacter>                                                                                                                                                            
            setCachedCharacters(updatedCachedCharacters)
            localStorage.setItem('character-data', JSON.stringify(updatedCachedCharacters))
        }
    }, [data, searchId])

    useEffect(() => {                                                                                                                                                                                      
        const stored = localStorage.getItem('character-data')                                                                                                                                         
        if (stored) setCachedCharacters(JSON.parse(stored) as Record<string, ICharacter>)
    }, [])

    const clearCahce = () => {
        setCachedCharacters({})                                                                                                                                                                        
        setCharacterId(null)
        setSearchId(null)
        localStorage.clear()
    }
    

    const displayData: ICharacter | undefined =  searchId !== null ? cachedCharacters[searchId] : data
    
  return (
    <Stack component="section" sx={{flexDirection: 'row', width: '100%'}}>
        <$.CharacterCard>
            <$.ActionBar>
                <$.SearchInputContainer>
                    <$.SearchInput value={characterId ?? ''} onChange={(e) => {
                        setCharacterId(e.target.value)
                     }} 
                     label="Enter any number" variant="standard" slotProps={{ 
                        input: { endAdornment: <InputAdornment position="end">
                            <Button variant="text" onClick={() => setSearchId(characterId)
                        } disabled={isLoading}>Search</Button>
                        </InputAdornment> } 
                    }}/>
                </$.SearchInputContainer>
            <Button onClick={clearCahce} sx={{fontStyle: "italic", alignSelf:'end'}}>Clear All</Button>
            </$.ActionBar>

        <Stack direction="row">
            <$.MainImageContainer>
                {isLoading ? (<Box sx={{display:'flex'}}><CircularProgress sx={{m: 'auto'}} aria-label="Loading…" /></Box> ):
                <Image src={displayData ? displayData.image : "/rick_and_morty.svg"} alt="charachter" width={224} height={224}/>
}    
            </$.MainImageContainer>
        
        <Box sx={{margin: "50px", flex: 1}}>
        {displayData ? (
            <>
            <Typography sx={{fontWeight: 700, fontSize: '32px'}}>{displayData?.name}</Typography>
            <$.CharacterDescription>
                <$.CharacterDescripionLine greytext>Species</$.CharacterDescripionLine>
                <$.CharacterDescripionLine>{displayData?.species}</$.CharacterDescripionLine>
            </$.CharacterDescription>
            <$.CharacterDescription>
                <$.CharacterDescripionLine greytext>Type</$.CharacterDescripionLine>
                <$.CharacterDescripionLine greytext={displayData?.type === '' || displayData?.type === 'unknown'}>{displayData?.type || "unknown"}</$.CharacterDescripionLine>
            </$.CharacterDescription>
            <$.CharacterDescription>
                <$.CharacterDescripionLine greytext>Location</$.CharacterDescripionLine>
                <$.CharacterDescripionLine greytext={displayData?.location.name === '' || displayData?.location.name === 'unknown'}>{displayData?.location.name || "unknown"}</$.CharacterDescripionLine>
            </$.CharacterDescription>
            <$.CharacterDescription>
                <$.CharacterDescripionLine greytext>Origin</$.CharacterDescripionLine>
                <$.CharacterDescripionLine greytext={displayData?.origin.name === '' || displayData?.origin.name === 'unknown'}>{displayData?.origin.name || "unknown"}</$.CharacterDescripionLine>
            </$.CharacterDescription>
            <$.CharacterDescription>
                <$.CharacterDescripionLine greytext>Status</$.CharacterDescripionLine>
                <$.CharacterDescripionLine sx={{color: displayData?.status === 'Dead' ? 'red': 'green'}}>{displayData?.status}</$.CharacterDescripionLine>
            </$.CharacterDescription>
            </>
        ) : error ? ( 
            <$.ErrorMessage>Character not found</$.ErrorMessage> 
        ): null
        }
        </Box>
        
        {Object.keys(cachedCharacters).length > 0 && (
            <Stack direction="column">
                {Object.values(cachedCharacters).reverse().splice(0, 3).map((character: ICharacter) => 
                <$.ChachedCharacter key={character.id} bordered={String(character.id) === characterId || String(character.id) === searchId}>
                    <Image onClick={() => {
                        setCharacterId(String(character.id))
                        setSearchId(String(character.id))
                    }} src={character.image} alt="charachter" width={60} height={60} style={{objectFit:"cover"}} />
                </$.ChachedCharacter>
            )}
            </Stack>
            )
        }
        </Stack>
        </$.CharacterCard>
    </Stack>
  )
}