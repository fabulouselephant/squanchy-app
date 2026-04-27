import type { Metadata } from 'next'
import { PT_Sans } from 'next/font/google'
import ReactQueryProvider from './utils/providers/ReactQueryProvider'
import { MuiThemeProvider } from './utils/providers/ThemeProvider'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

const ptSans = PT_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-pt-sans',
})

export const metadata: Metadata = {
  title: 'Squanchy App',
  description: 'Created to see all the  fantastic characters in Rick & Morty series',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={ptSans.variable}>
      <body>
        <AppRouterCacheProvider>
          <MuiThemeProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </MuiThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
