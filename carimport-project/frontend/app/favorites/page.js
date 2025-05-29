'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuthRedirect from '@/hooks/useAuthRedirect'


export default function FavoritesPage() {
    useAuthRedirect()
    const [favorites, setFavorites] = useState([])
    const router = useRouter()

    const fetchFavorites = async () => {
        const token = localStorage.getItem('token')
        const res = await fetch('http://localhost:8080/api/favorites', {
            headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        console.log('Favorites response:', data)

        if (Array.isArray(data)) {
            setFavorites(data)
        } else if (Array.isArray(data.favorites)) {
            setFavorites(data.favorites)
        } else {
            console.error('Неверный формат ответа от API /favorites')
        }

    }

    useEffect(() => {
        fetchFavorites()
    }, [])

    const removeFromFavorites = async (carId) => {
        const token = localStorage.getItem('token')
        await fetch(`http://localhost:8080/api/favorites/${carId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        })

        setFavorites(prev => prev.filter(car => car._id !== carId))
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold mb-8 text-blue-700 text-center">❤️ Мои избранные машины</h2>

            {favorites.length === 0 ? (
                <p className="text-center text-gray-500">Вы пока не добавили ни одной машины в избранное.</p>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map(car => (
                        <div
                            key={car._id}
                            className="bg-white border rounded-xl shadow hover:shadow-md transition overflow-hidden"
                        >
                            <img
                                src={car.images?.[0] || '/no-image.png'}
                                alt={car.model}
                                className="w-full h-48 object-cover cursor-pointer"
                                onClick={() => router.push(`/cars/${car._id}`)}
                            />
                            <div className="p-4 space-y-2">
                                <h5 className="text-lg font-semibold">{car.brand} {car.model} {car.year}</h5>
                                <p className="text-red-600 font-bold text-sm">
                                    ₸ {car.price?.toLocaleString()}
                                </p>
                                <p className="text-gray-600 text-sm">{car.fuel} · {car.transmission} · {car.mileage} км</p>
                            </div>
                            <div className="p-4 border-t">
                                <button
                                    className="w-full text-sm text-red-600 border border-red-600 rounded py-2 hover:bg-red-50 transition"
                                    onClick={() => removeFromFavorites(car._id)}
                                >
                                    💔 Удалить из избранного
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

}
