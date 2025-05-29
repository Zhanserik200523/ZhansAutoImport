
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
    const router = useRouter()
    const [form, setForm] = useState({ email: '', password: '' })

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const res = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })

        const data = await res.json()

        if (res.ok) {
            localStorage.setItem('token', data.token)
            alert('Успешный вход!')
            router.push('/profile')
        } else {
            alert('Ошибка: ' + data.message)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 px-6 py-8 border border-gray-200 rounded-2xl shadow-lg bg-white">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Вход в аккаунт</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="example@mail.com"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Пароль</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                >
                    ВОЙТИ
                </button>

                <p className="text-sm text-center text-gray-600">
                    Нет аккаунта?{' '}
                    <Link href="/register" className="text-blue-600 hover:underline font-medium">
                        Зарегистрируйтесь
                    </Link>
                </p>
            </form>
        </div>
    )

}
