'use client'
import { Inter } from 'next/font/google'
import AdminNavbar from '@/components/Admin/AdminNavbar'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {

    return (
        <html lang="en">
            <body className={inter.className}>
                <AdminNavbar />
                {children}
            </body>
        </html>
    )
}


