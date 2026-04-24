'use client';                                                                                                                                                                                          
                                                                                                                                                                                                         
  import { createTheme, ThemeProvider } from '@mui/material/styles';
  import CssBaseline from '@mui/material/CssBaseline';                                                                                                                                                   
                                                                                                                                                                                                         
  const theme = createTheme({
      typography: {                                                                                                                                                                                      
          fontFamily: 'var(--font-pt-sans)',
      },
  })

  export const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {                                                                                                                     
      return (
          <ThemeProvider theme={theme}>                                                                                                                                                                  
              <CssBaseline />
              {children}
          </ThemeProvider>
      )
  }
