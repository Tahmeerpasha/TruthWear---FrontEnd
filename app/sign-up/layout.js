'use client'
import { Inter } from 'next/font/google'
import { NavbarWithMegaMenu } from '@/components/tailwind/NavbarWithMegaMenu'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {

    return (
        <html lang="en">
            <body className={inter.className}>
                <NavbarWithMegaMenu />
                {children}
            </body>
        </html>
    )
}


