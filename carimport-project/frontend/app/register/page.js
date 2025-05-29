
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const router = useRouter()
    const [form, setForm] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: ''
    })

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const res = await fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })

        if (res.ok) {
            alert('Успешно! Перенаправление на вход...')
            router.push('/login')
        } else {
            const data = await res.json()
            alert('Ошибка: ' + data.message)
        }
    }

    return (
        <div className="max-w-md mx-auto mt-20 px-6 py-8 border border-gray-200 rounded-2xl shadow-lg bg-white">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
                🚀 Регистрация
            </h2>

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

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Имя</label>
                    <input
                        name="firstName"
                        type="text"
                        placeholder="Ваше имя"
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Фамилия</label>
                    <input
                        name="lastName"
                        type="text"
                        placeholder="Ваша фамилия"
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">Телефон</label>
                    <input
                        name="phone"
                        type="text"
                        placeholder="+7 777 123 4567"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
                >
                    Зарегистрироваться
                </button>
            </form>
        </div>
    )


}
