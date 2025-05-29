'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuthRedirect from '@/hooks/useAuthRedirect'
export default function AdminUsersPage() {
    useAuthRedirect()
    const [users, setUsers] = useState([])
    const [profile, setProfile] = useState(null)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return router.push('/login')

        fetch('http://localhost:8080/api/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setProfile(data)

                // даже если не админ — просто не покажем таблицу
                fetch('http://localhost:8080/api/users', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                    .then(res => res.json())
                    .then(setUsers)
                    .catch(console.error)
            })
            .catch(() => router.push('/login'))
    }, [])

    if (!profile) return <p className="text-center mt-10">Загрузка...</p>

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-center mb-6">Пользователи</h2>

            {profile.role !== 'admin' ? (
                <p className="text-center text-gray-500">У вас нет доступа для просмотра пользователей.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm bg-white rounded shadow">
                        <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Имя</th>
                            <th className="p-3 border">Фамилия</th>
                            <th className="p-3 border">Телефон</th>
                            <th className="p-3 border">Роль</th>
                            <th className="p-3 border">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(users) && users.map(u => (
                            <tr key={u._id} className="hover:bg-gray-50">
                                <td className="p-3 border">{u.email}</td>
                                <td className="p-3 border">{u.firstName}</td>
                                <td className="p-3 border">{u.lastName}</td>
                                <td className="p-3 border">{u.phone}</td>
                                <td className="p-3 border">
                                    <select
                                        value={u.role}
                                        onChange={e => changeRole(u._id, e.target.value)}
                                        className="w-full border px-2 py-1 rounded"
                                    >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </td>
                                <td className="p-3 border">
                                    <button
                                        onClick={() => deleteUser(u._id)}
                                        className="text-red-600 hover:text-red-800 text-sm px-3 py-1 border border-red-500 rounded transition"
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

async function changeRole(userId, newRole) {
    const token = localStorage.getItem('token')
    await fetch(`http://localhost:8080/api/users/${userId}/role`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
    })
}

async function deleteUser(userId) {
    const token = localStorage.getItem('token')
    await fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
    })
    window.location.reload()
}
