'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Header() {
    const router = useRouter()
    const [userRole, setUserRole] = useState(null)
    const [loading, setLoading] = useState(true)

    const handleLogout = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token')
            if (!token) return

            try {
                const res = await fetch('http://localhost:8080/api/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                const data = await res.json()
                setUserRole(data.role)
            } catch (err) {
                console.error('Ошибка профиля:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    return (
        <header className="bg-white border-b shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Логотип */}
                <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition">
                    ZhansAutoImport
                </Link>

                {/* Навигация */}
                <nav className="flex items-center gap-4 text-gray-700 text-sm font-medium overflow-x-auto">
                    <Link href="/profile" className="hover:text-blue-600 transition">Профиль</Link>
                    <Link href="/cars" className="hover:text-blue-600 transition">Машины</Link>
                    <Link href="/favorites" className="hover:text-blue-600 transition">Избранное</Link>

                    {userRole === 'user' && (
                        <Link href="/chat" className="hover:text-blue-600 transition">Чат с Менеджером</Link>
                    )}

                    {userRole === 'admin' && (
                        <>
                            <Link href="/requests" className="hover:text-blue-600 transition">Заявки</Link>
                            <Link href="/admin/chat" className="hover:text-blue-600 transition">Чат с пользователями</Link>
                            <Link href="/admin/users" className="hover:text-blue-600 transition">Список пользователей</Link>
                        </>
                    )}

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-full text-sm transition"
                    >
                        <LogOut className="w-4 h-4" />
                        Выйти
                    </button>
                </nav>
            </div>
        </header>
    )
}
