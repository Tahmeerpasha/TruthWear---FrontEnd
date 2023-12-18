'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from './StoreProvider'
import { NavbarWithMegaMenu } from '@/components/tailwind/NavbarWithMegaMenu'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import SplashScreen from '@/components/SplashScreen'

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'TruthWear',
//   description: 'The only marketplace built specifically for Cristianity focused goods!',
// }

export default function RootLayout({ children }) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isLoading, setIsLoading] = useState(isHome)

  useEffect(() => {
    if (!isLoading) return
  }, [isLoading])

  return (
    <html lang="en">
      <StoreProvider>

        <body className={inter.className}>
          {isLoading && isHome ?
            <SplashScreen finishLoading={() => setIsLoading(false)} /> :
            <>
              <NavbarWithMegaMenu />
              {children}
            </>
          }
        </body>
      </StoreProvider>
    </html>
  )
}
