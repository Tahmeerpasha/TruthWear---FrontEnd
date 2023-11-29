import { Inter } from 'next/font/google'
import AdminNavbar from '@/components/AdminNavbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'TruthWear',
    description: 'The only marketplace built specifically for Cristianity focused goods!',
}

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
