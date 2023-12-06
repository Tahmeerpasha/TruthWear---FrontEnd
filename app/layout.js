import { Inter } from 'next/font/google'
import './globals.css'
import StoreProvider from './StoreProvider'
import { NavbarWithMegaMenu } from '@/components/tailwind/NavbarWithMegaMenu'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TruthWear',
  description: 'The only marketplace built specifically for Cristianity focused goods!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <NavbarWithMegaMenu />
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
