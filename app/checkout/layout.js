'use client'
import { Inter } from 'next/font/google'
import TransactionStatus from '@/components/User/TransactionStatus'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {

    return (
        <html lang="en">
            <body className={inter.className}>
                <TransactionStatus />
                {children}
            </body>
        </html>
    )
}


