'use client';

import { Box, TextField, InputAdornment, CircularProgress, Typography, Stack, Button } from "@mui/material"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useQuery, useQueryClient, QueryCache } from "react-query"
import * as $ from './CharachterCard.styled'

export const CharachterCard = () => {
    const queryClient = useQueryClient()
    const [cachedCharacters, setCachedCharacters] = useState<Record<string, any>>(() => {                                                                                                                  
        const stored = localStorage.getItem('character-data');                                                                                                                                             
        return stored ? JSON.parse(stored) : {};                                                                                                                                                           
    })

    const [characterId, setCharacterId] = useState<string>('')
    const [id, setId] = useState<string>('')
    const cachedData = queryClient.getQueryData<any>(['character', id]);
    
    const {data, error, isLoading} = useQuery({
        queryKey: ['character', id],
        queryFn: () => fetch(`https://rickandmortyapi.com/api/character/${characterId}`).then(res => res.json()),
        enabled: !!id
    })
    
    
    useEffect(() => {
      if (data && id) {                                                                                                                                                                                  
          const updated = { ...cachedCharacters, [id]: data };
          setCachedCharacters(updated);
          localStorage.setItem('character-data', JSON.stringify(updated));                                                                                                                               
      }
  }, [data, id]) 

    const displayData = cachedData ?? data
    const previousSearches = storedIds.reverse().map((id) => queryClient.getQueryData<any>(['character', id]))

    console.log(previousSearches, 'previousSearches')

  return (
    <Stack component="section" sx={{flexDirection: 'row'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <TextField value={characterId} onChange={(e) => setCharacterId(e.target.value)} label="Enter any number" variant="standard" slotProps={{ 
                input: { endAdornment: <InputAdornment onClick={() => {
                    setId(characterId)
                    const updated = [characterId, ...storedIds.filter(i => i !== characterId)] 
                    localStorage.setItem('character-history', JSON.stringify(updated));
                }
                }  position="end"><Button disabled={isLoading}>Search</Button></InputAdornment> } 
            }}/>
            <Box sx={{borderRadius: '5px', boxShadow: '0px 0px 4px 4px rgba(0, 0, 0, 0.09)'}}>
                {isLoading ? 
                    <CircularProgress aria-label="Loading…" /> :
                    <Image src={data ? displayData.image : "/rick_and_morty.svg"} alt="charachter" width={224} height={224} />
                }
            </Box>
        </Box>
        {displayData && (
            <Box sx={{margin: "30px"}}>
                <Typography sx={{fontFamily:'PTSans', fontWeight: 700, fontSize: '32px'}}>{displayData?.name}</Typography>
                <Stack direction="row" spacing={3}>
                    <$.CharachterDescripionLine>Species</$.CharachterDescripionLine>
                    <$.CharachterDescripionLine>{displayData?.species}</$.CharachterDescripionLine>
                </Stack>
                <Stack direction="row">
                    <$.CharachterDescripionLine>Type</$.CharachterDescripionLine>
                    <$.CharachterDescripionLine>{displayData?.type}</$.CharachterDescripionLine>
                </Stack>
                <Stack direction="row">
                    <$.CharachterDescripionLine>Location</$.CharachterDescripionLine>
                    <$.CharachterDescripionLine>{displayData?.location.name}</$.CharachterDescripionLine>
                </Stack>
                <Stack direction="row">
                    <$.CharachterDescripionLine>Origin</$.CharachterDescripionLine>
                    <$.CharachterDescripionLine>{displayData?.origin.name}</$.CharachterDescripionLine>
                </Stack>
                <Stack direction="row">
                    <$.CharachterDescripionLine>Status</$.CharachterDescripionLine>
                    <$.CharachterDescripionLine>{displayData?.status}</$.CharachterDescripionLine>
                </Stack>
            </Box>
            )
        }
        {cachedData && (
            <Stack direction="column">
                {previousSearches.map((charachter) => <Image key={charachter.id} onClick={(e) => console.log(e)} src={charachter.image} alt="charachter" width={60} height={60}/>)}
            </Stack>
            )
        }
    </Stack>
  )
}