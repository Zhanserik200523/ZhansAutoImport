'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuthRedirect from '@/hooks/useAuthRedirect'

export default function CarsPage() {
    useAuthRedirect()
    const [cars, setCars] = useState([])
    const [filteredCars, setFilteredCars] = useState([])
    const [favorites, setFavorites] = useState([])
    const [userRole, setUserRole] = useState(null)
    const [filters, setFilters] = useState({ brand: '', year: '', fuel: '', transmission: '', priceMin: '', priceMax: '' })
    const [brands, setBrands] = useState([])
    const [years, setYears] = useState([])

    const router = useRouter()
    const [currentPage, setCurrentPage] = useState(1)
    const carsPerPage = 6

    const indexOfLastCar = currentPage * carsPerPage
    const indexOfFirstCar = indexOfLastCar - carsPerPage
    const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar)

    const totalPages = Math.ceil(filteredCars.length / carsPerPage)

    useEffect(() => {
        const fetchCars = async () => {
            const res = await fetch('http://localhost:8080/api/cars')
            const data = await res.json()
            setCars(data)
            setFilteredCars(data)

            const uniqueBrands = [...new Set(data.map(car => car.brand))]
            const uniqueYears = [...new Set(data.map(car => car.year))].sort((a, b) => b - a)
            setBrands(uniqueBrands)
            setYears(uniqueYears)
        }

        const fetchFavorites = async () => {
            const token = localStorage.getItem('token')
            const res = await fetch('http://localhost:8080/api/favorites', {
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await res.json()
            setFavorites(data.map(car => car._id))
        }

        const fetchUser = async () => {
            const token = localStorage.getItem('token')
            const res = await fetch('http://localhost:8080/api/profile', {
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await res.json()
            setUserRole(data.role)
        }

        fetchCars()
        fetchFavorites()
        fetchUser()
    }, [])

    useEffect(() => {
        const filtered = cars.filter(car => {
            const withinPriceRange = (!filters.priceMin || car.price >= parseInt(filters.priceMin)) &&
                (!filters.priceMax || car.price <= parseInt(filters.priceMax))

            return (
                (filters.brand === '' || car.brand === filters.brand) &&
                (filters.year === '' || car.year.toString() === filters.year) &&
                (filters.fuel === '' || car.fuel.toLowerCase() === filters.fuel.toLowerCase()) &&
                (filters.transmission === '' || car.transmission.toLowerCase() === filters.transmission.toLowerCase()) &&
                withinPriceRange
            )
        })
        setFilteredCars(filtered)
    }, [filters, cars])

    const toggleFavorite = async (carId) => {
        const token = localStorage.getItem('token')
        const isFav = favorites.includes(carId)
        const method = isFav ? 'DELETE' : 'POST'

        await fetch(`http://localhost:8080/api/favorites/${carId}`, {
            method,
            headers: { Authorization: `Bearer ${token}` },
        })

        const res = await fetch('http://localhost:8080/api/favorites', {
            headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        setFavorites(data.map(car => car._id))
    }

    const resetFilters = () => {
        setFilters({ brand: '', year: '', fuel: '', transmission: '', priceMin: '', priceMax: '' })
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-4 gap-8">
                {/* Фильтр */}
                <div className="bg-white border rounded-xl shadow p-5">
                    <h5 className="text-lg font-semibold mb-4">Фильтр</h5>

                    <div className="space-y-4 text-sm text-gray-700">
                        {/* Марка */}
                        <div>
                            <label className="block mb-1 font-medium">Марка</label>
                            <select className="w-full border rounded px-3 py-2" value={filters.brand} onChange={e => setFilters({ ...filters, brand: e.target.value })}>
                                <option value="">Все</option>
                                {brands.map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                        </div>

                        {/* Год */}
                        <div>
                            <label className="block mb-1 font-medium">Год выпуска</label>
                            <select className="w-full border rounded px-3 py-2" value={filters.year} onChange={e => setFilters({ ...filters, year: e.target.value })}>
                                <option value="">Все</option>
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                        </div>

                        {/* Топливо */}
                        <div>
                            <label className="block mb-1 font-medium">Топливо</label>
                            <select className="w-full border rounded px-3 py-2" value={filters.fuel} onChange={e => setFilters({ ...filters, fuel: e.target.value })}>
                                <option value="">Все</option>
                                <option value="бензин">Бензин</option>
                                <option value="дизель">Дизель</option>
                                <option value="гибрид">Гибрид</option>
                                <option value="электро">Электро</option>
                            </select>
                        </div>

                        {/* Коробка */}
                        <div>
                            <label className="block mb-1 font-medium">Коробка</label>
                            <select className="w-full border rounded px-3 py-2" value={filters.transmission} onChange={e => setFilters({ ...filters, transmission: e.target.value })}>
                                <option value="">Все</option>
                                <option value="автомат">Автомат</option>
                                <option value="механика">Механика</option>
                            </select>
                        </div>

                        {/* Цена */}
                        <div>
                            <label className="block mb-1 font-medium">Цена (₸)</label>
                            <div className="flex gap-2">
                                <input type="number" placeholder="От" className="w-1/2 border rounded px-3 py-2" value={filters.priceMin} onChange={e => setFilters({ ...filters, priceMin: e.target.value })} />
                                <input type="number" placeholder="До" className="w-1/2 border rounded px-3 py-2" value={filters.priceMax} onChange={e => setFilters({ ...filters, priceMax: e.target.value })} />
                            </div>
                        </div>

                        <button className="w-full mt-3 bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition" onClick={resetFilters}>
                            Сбросить фильтры
                        </button>
                    </div>
                </div>

                {/* Список машин */}
                <div className="md:col-span-3 space-y-6">
                    {userRole === 'admin' && (
                        <div className="flex justify-end">
                            <Link href="/cars/new" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition">
                                ➕ Добавить машину
                            </Link>
                        </div>
                    )}

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentCars.map(car => (
                            <div key={car._id} className="bg-white border rounded-xl shadow hover:shadow-md transition overflow-hidden">
                                <img
                                    src={car.images?.[0] || '/no-image.png'}
                                    alt={car.model}
                                    className="w-full h-48 object-cover cursor-pointer"
                                    onClick={() => router.push(`/cars/${car._id}`)}
                                />
                                <div className="p-4 space-y-2">
                                    <h5 className="text-lg font-bold">{car.brand} {car.model} {car.year}</h5>
                                    <p className="text-red-600 font-semibold">₸ {car.price?.toLocaleString() || '—'}</p>
                                    <p className="text-gray-600 text-sm">{car.fuel} · {car.transmission} · {car.mileage} км</p>
                                    <p className="text-gray-600 text-sm">{car.engineVolume} л · {car.drive} · {car.condition}</p>
                                    <p className="text-gray-600 text-sm">{car.bodyType} · {car.country}</p>
                                </div>
                                <div className="flex gap-2 p-4 border-t">
                                    <button
                                        className="flex-1 text-sm py-1.5 border rounded text-red-600 hover:bg-red-50 transition"
                                        onClick={(e) => { e.stopPropagation(); toggleFavorite(car._id); }}
                                    >
                                        {favorites.includes(car._id) ? '💔 Удалить' : '❤️ В избранное'}
                                    </button>
                                    <button
                                        className="flex-1 text-sm py-1.5 border rounded text-blue-600 hover:bg-blue-50 transition"
                                        onClick={() => router.push(`/cars/${car._id}`)}
                                    >
                                        Подробнее
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium border ${
                                        currentPage === i + 1
                                            ? 'bg-blue-600 text-white border-blue-600'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                    } transition`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    )

}
