'use client'

import { useEffect, useState } from 'react'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import { useRouter } from 'next/navigation'

export default function RequestsPage() {
    useAuthRedirect()
    const [requests, setRequests] = useState([])
    const [statusFilter, setStatusFilter] = useState('')
    const [dateSort, setDateSort] = useState('desc')
    const router = useRouter()

    useEffect(() => {
        const fetchRequests = async () => {
            const res = await fetch('http://localhost:8080/api/requests')
            const data = await res.json()
            setRequests(data)
        }
        fetchRequests()
    }, [])

    const handleStatusChange = async (id, newStatus) => {
        const res = await fetch(`http://localhost:8080/api/requests/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        })

        if (res.ok) {
            setRequests(prev => prev.map(r => r._id === id ? { ...r, status: newStatus } : r))
        } else {
            alert('Ошибка при обновлении статуса')
        }
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Удалить заявку?')
        if (!confirmDelete) return

        const res = await fetch(`http://localhost:8080/api/requests/${id}`, { method: 'DELETE' })

        if (res.ok) {
            setRequests(prev => prev.filter(r => r._id !== id))
        } else {
            alert('Ошибка при удалении')
        }
    }

    const filteredRequests = requests
        .filter(r => !statusFilter || r.status === statusFilter)
        .sort((a, b) => dateSort === 'desc'
            ? new Date(b.createdAt) - new Date(a.createdAt)
            : new Date(a.createdAt) - new Date(b.createdAt))

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Заявки на экспорт</h2>

            {/* Фильтры */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <select
                    className="border rounded px-3 py-2"
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">Все статусы</option>
                    <option value="новая">новая</option>
                    <option value="в обработке">в обработке</option>
                    <option value="завершена">завершена</option>
                </select>

                <select
                    className="border rounded px-3 py-2"
                    onChange={(e) => setDateSort(e.target.value)}
                >
                    <option value="desc">Сначала новые</option>
                    <option value="asc">Сначала старые</option>
                </select>
            </div>

            {filteredRequests.length === 0 ? (
                <p className="text-center text-gray-500">Пока заявок нет.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 rounded shadow">
                        <thead className="bg-gray-100">
                        <tr className="text-left">
                            <th className="p-3 border-b">Фото</th>
                            <th className="p-3 border-b">Машина</th>
                            <th className="p-3 border-b">Имя</th>
                            <th className="p-3 border-b">Телефон</th>
                            <th className="p-3 border-b">Страна</th>
                            <th className="p-3 border-b">Комментарий</th>
                            <th className="p-3 border-b">Дата</th>
                            <th className="p-3 border-b">Статус</th>
                            <th className="p-3 border-b">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredRequests.map((req) => (
                            <tr key={req._id} className="hover:bg-gray-50">
                                <td className="p-2">
                                    {req.car?.images?.[0] && (
                                        <img
                                            src={req.car.images[0]}
                                            alt="car"
                                            className="w-32 h-20 object-cover rounded cursor-pointer"
                                            onClick={() => router.push(`/cars/${req.car._id}`)}
                                        />
                                    )}
                                </td>
                                <td className="p-2">{req.car?.brand} {req.car?.model} {req.car?.year}</td>
                                <td className="p-2">{req.name}</td>
                                <td className="p-2">{req.phone}</td>
                                <td className="p-2">{req.country}</td>
                                <td className="p-2">{req.comment}</td>
                                <td className="p-2">{new Date(req.createdAt).toLocaleDateString()}</td>
                                <td className="p-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      req.status === 'завершена' ? 'bg-green-100 text-green-800'
                          : req.status === 'в обработке' ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                  }`}>
                    {req.status}
                  </span>
                                </td>
                                <td className="p-2 space-y-1">
                                    <select
                                        className="w-full border rounded px-2 py-1 text-sm"
                                        value={req.status}
                                        onChange={(e) => handleStatusChange(req._id, e.target.value)}
                                    >
                                        <option value="новая">новая</option>
                                        <option value="в обработке">в обработке</option>
                                        <option value="завершена">завершена</option>
                                    </select>
                                    <button
                                        onClick={() => handleDelete(req._id)}
                                        className="w-full bg-red-100 text-red-600 text-sm py-1 rounded hover:bg-red-200 transition"
                                    >
                                        🗑 Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )

}