'use client'

import { useEffect, useState } from 'react'

export default function MyRequests() {
    const [requests, setRequests] = useState([])

    useEffect(() => {
        const fetchRequests = async () => {
            const token = localStorage.getItem('token')
            const res = await fetch('http://localhost:8080/api/requests/mine', {
                headers: { Authorization: `Bearer ${token}` },
            })
            const data = await res.json()
            console.log('Fetched requests:', data)

            if (Array.isArray(data)) {
                setRequests(data)
            } else {
                setRequests([]) // на всякий случай
            }
        }

        fetchRequests()
    }, [])

    const cancelRequest = async (id) => {
        const confirmed = window.confirm('Вы уверены, что хотите отменить заявку?')
        if (!confirmed) return

        const token = localStorage.getItem('token')
        const res = await fetch(`http://localhost:8080/api/requests/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        })

        if (res.ok) {
            setRequests(prev => prev.filter(req => req._id !== id))
        } else {
            alert('Ошибка при удалении заявки')
        }
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 px-4">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">📦 Мои заявки</h3>

            {requests.length === 0 ? (
                <p className="text-gray-500 text-center">Заявок пока нет</p>
            ) : (
                <div className="space-y-4">
                    {requests.map((req) => (
                        <div
                            key={req._id}
                            className="flex items-center justify-between border rounded-lg p-4 shadow-sm hover:shadow transition bg-white"
                        >
                            <div>
                                <p className="text-lg font-semibold text-blue-700">
                                    {req.car?.brand} {req.car?.model}
                                </p>
                                <p className="text-sm text-gray-600">
                                    🌍 {req.country} &nbsp; | &nbsp; 📝 Статус:{" "}
                                    <span
                                        className={`font-medium ${
                                            req.status === "завершена"
                                                ? "text-green-600"
                                                : req.status === "в обработке"
                                                    ? "text-yellow-600"
                                                    : "text-gray-500"
                                        }`}
                                    >
                  {req.status}
                </span>
                                </p>
                            </div>

                            <button
                                onClick={() => cancelRequest(req._id)}
                                className="bg-red-600 text-white text-sm px-4 py-1.5 rounded hover:bg-red-700 transition"
                            >
                                Отменить
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

}
