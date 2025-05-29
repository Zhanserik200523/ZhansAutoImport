'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import useAuthRedirect from '@/hooks/useAuthRedirect'


export default function CarDetailsPage() {
    useAuthRedirect()
    const { id } = useParams()
    const router = useRouter()

    const [car, setCar] = useState(null)
    const [selectedImg, setSelectedImg] = useState(null)
    const [userRole, setUserRole] = useState(null)

    const handleDelete = async () => {
        const confirm = window.confirm('Ты уверен, что хочешь удалить эту машину?')
        if (!confirm) return

        const res = await fetch(`http://localhost:8080/api/cars/${car._id}`, {
            method: 'DELETE',
        })

        if (res.ok) {
            router.push('/cars')
        } else {
            alert('Ошибка при удалении')
        }
    }
    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token')
            const res = await fetch('http://localhost:8080/api/profile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = await res.json()
            setUserRole(data.role)
        }

        fetchUser()
    }, [])

    useEffect(() => {
        const fetchCar = async () => {
            const res = await fetch(`http://localhost:8080/api/cars/${id}`)
            const data = await res.json()
            setCar(data)
            setSelectedImg(data.images?.[0])
        }

        if (id) fetchCar()
    }, [id])

    if (!car) return <div className="container mt-5">Загрузка...</div>

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid md:grid-cols-2 gap-8">

                {/* Фото и превью */}
                <div>
                    <img
                        src={selectedImg}
                        alt="car"
                        className="rounded-xl w-full h-[400px] object-cover mb-4"
                    />
                    <div className="flex gap-2 flex-wrap">
                        {car.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt="preview"
                                onClick={() => setSelectedImg(img)}
                                className={`w-24 h-16 rounded object-cover cursor-pointer border-2 ${
                                    selectedImg === img ? 'border-blue-600' : 'border-transparent'
                                } hover:border-blue-400 transition`}
                            />
                        ))}
                    </div>
                </div>

                {/* Информация */}
                <div>
                    <h2 className="text-3xl font-bold mb-2">{car.brand} {car.model} {car.year}</h2>
                    <p className="text-2xl text-red-600 font-semibold mb-4">
                        ₸ {car.price ? car.price.toLocaleString() : '—'}
                    </p>

                    <ul className="space-y-2 text-sm text-gray-700 mb-6">
                        <li><strong>Марка:</strong> {car.brand}</li>
                        <li><strong>Модель:</strong> {car.model}</li>
                        <li><strong>Год выпуска:</strong> {car.year}</li>
                        <li><strong>Пробег:</strong> {car.mileage} км</li>
                        <li><strong>Объём двигателя:</strong> {car.engineVolume} л</li>
                        <li><strong>Топливо:</strong> {car.fuel}</li>
                        <li><strong>Коробка:</strong> {car.transmission}</li>
                        <li><strong>Привод:</strong> {car.drive}</li>
                        <li><strong>Состояние:</strong> {car.condition}</li>
                        <li><strong>Тип кузова:</strong> {car.bodyType}</li>
                        <li><strong>Страна:</strong> {car.country}</li>
                    </ul>

                    {/* Кнопки */}
                    <div className="space-y-3">
                        {userRole === 'admin' && (
                            <>
                                <button
                                    onClick={handleDelete}
                                    className="w-full py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 transition"
                                >
                                    Удалить машину
                                </button>
                                <Link
                                    href={`/cars/${car._id}/edit`}
                                    className="block w-full text-center py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
                                >
                                    ✏️ Редактировать
                                </Link>
                            </>
                        )}
                        <button
                            onClick={() => router.push(`/requests/new?car=${car._id}`)}
                            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            📦 Оформить заявку
                        </button>
                        <button
                            onClick={() => router.push(`/chat`)}
                            className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                            Связаться с менеджером
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}
