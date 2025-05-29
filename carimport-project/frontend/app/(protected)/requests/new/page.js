'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function NewRequestPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const carId = searchParams.get('car')

    const [form, setForm] = useState({
        name: '',
        phone: '',
        country: '',
        comment: '',
    })

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const token = localStorage.getItem('token')
        if (!token) {
            alert('Вы не авторизованы')
            router.push('/login')
            return
        }

        const res = await fetch('http://localhost:8080/api/requests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // 🔥 вот этого не хватало
            },
            body: JSON.stringify({ ...form, car: carId })
        })

        if (res.ok) {
            router.push('/thanks')
        } else {
            alert('Ошибка при оформлении заявки')
        }
    }


    return (
        <div className="max-w-xl mx-auto px-4 py-10">
            <div className="bg-white shadow-md rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Оформление заявки на экспорт</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Имя */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ваше имя</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Телефон */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Страна */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Страна</label>
                        <input
                            type="text"
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Комментарий */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Комментарий</label>
                        <textarea
                            name="comment"
                            rows={3}
                            value={form.comment}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Кнопка */}
                    <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition"
                    >
                        Отправить заявку
                    </button>
                </form>
            </div>
        </div>
    )

}
