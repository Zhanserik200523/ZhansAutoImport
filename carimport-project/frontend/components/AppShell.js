'use client'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { usePathname } from 'next/navigation'

export default function AppShell({ children }) {
    const pathname = usePathname()
    const isAuthPage = pathname === '/login' || pathname === '/register'

    return (
        <>
            {!isAuthPage && <Header />}
            <main className="flex-grow container mx-auto px-4">{children}</main>
            {!isAuthPage && <Footer />}
        </>
    )
}
