import { Inter } from 'next/font/google'
import './globals.css'
import UserNavbar from '@/components/UserNavbar'
import StoreProvider from './StoreProvider'

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
          {/* <UserNavbar /> */}
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
