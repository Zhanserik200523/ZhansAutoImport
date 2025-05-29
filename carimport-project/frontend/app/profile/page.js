'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AvatarUpload from '@/components/AvatarUpload'
import MyRequests from '@/components/MyRequests'
import useAuthRedirect from '@/hooks/useAuthRedirect'
import '@uploadthing/react/styles.css'


export default function ProfilePage() {
    useAuthRedirect()
    const router = useRouter()
    const [profile, setProfile] = useState(null)


    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return router.push('/login')

        fetch('http://localhost:8080/api/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setProfile(data)
                setForm(prev => ({
                    ...prev,
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    phone: data.phone || ''
                }))
            })
            .catch(() => router.push('/login'))
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('token')
        router.push('/login')
    }

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handlePasswordChange = async e => {
        e.preventDefault()
        const token = localStorage.getItem('token')

        const res = await fetch('http://localhost:8080/api/profile/password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                currentPassword: form.currentPassword,
                newPassword: form.newPassword,
                confirmPassword: form.confirmPassword
            })
        })

        if (res.ok) {
            alert('Пароль обновлён')
            setForm({ ...form, currentPassword: '', newPassword: '', confirmPassword: '' })
        } else {
            const err = await res.json()
            alert(err.message || 'Ошибка при смене пароля')
        }
    }

    const handleProfileUpdate = async e => {
        e.preventDefault()
        const token = localStorage.getItem('token')

        const res = await fetch('http://localhost:8080/api/profile/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                firstName: form.firstName,
                lastName: form.lastName,
                phone: form.phone
            })
        })


        if (res.ok) {
            const updated = await res.json()
            setProfile(updated)
            alert('Профиль обновлён!')
        } else {
            const error = await res.json()
            alert(error.message || 'Ошибка при обновлении профиля')
        }

    }


    if (!profile) return <p className="text-center mt-10">Загрузка...</p>

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-10 text-center text-blue-700">Личный кабинет</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Левая колонка: Профиль */}
                <div className="bg-white border shadow-lg rounded-xl p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Профиль</h2>

                    {/* Аватар */}
                    {profile.avatar ? (
                        <img
                            src={profile.avatar}
                            alt="Аватар"
                            className="w-32 h-32 rounded-full object-cover mb-4 border mx-auto"
                        />
                    ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-500 mb-4 mx-auto border">
                            👤
                        </div>
                    )}

                    {/* Загрузка аватара */}
                    <AvatarUpload
                        onUpload={async (url) => {
                            const token = localStorage.getItem('token')
                            const res = await fetch('http://localhost:8080/api/profile/profile', {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`
                                },
                                body: JSON.stringify({ avatar: url })
                            })

                            if (res.ok) {
                                const updated = await res.json()
                                setProfile(updated)
                                alert('Аватар загружен!')
                            } else {
                                alert('Ошибка при сохранении аватара')
                            }
                        }}
                    />

                    <div className="text-sm text-gray-700 mt-4 space-y-1">
                        <p><span className="font-semibold">Email:</span> {profile.email}</p>
                        <p><span className="font-semibold">Роль:</span> {profile.role}</p>
                    </div>

                    <div className="mt-6">
                        <MyRequests />
                    </div>

                    <button
                        onClick={handleLogout}
                        className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-full font-semibold transition"
                    >
                        Выйти из аккаунта
                    </button>
                </div>

                {/* Правая колонка: Формы */}
                <div className="space-y-8">
                    {/* Редактировать данные */}
                    <div className="bg-white border shadow rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Редактировать данные</h3>
                        <form onSubmit={handleProfileUpdate} className="space-y-3">
                            <input
                                className="w-full border rounded p-2 focus:outline-blue-400"
                                name="firstName"
                                placeholder="Имя"
                                value={form.firstName}
                                onChange={handleChange}
                            />
                            <input
                                className="w-full border rounded p-2 focus:outline-blue-400"
                                name="lastName"
                                placeholder="Фамилия"
                                value={form.lastName}
                                onChange={handleChange}
                            />
                            <input
                                className="w-full border rounded p-2 focus:outline-blue-400"
                                name="phone"
                                placeholder="Телефон"
                                value={form.phone}
                                onChange={handleChange}
                            />
                            <button className="bg-blue-600 hover:bg-blue-700 w-full py-2 text-white rounded-full transition">
                                Сохранить изменения
                            </button>
                        </form>
                    </div>

                    {/* Смена пароля */}
                    <div className="bg-white border shadow rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">Смена пароля</h3>
                        <form onSubmit={handlePasswordChange} className="space-y-3">
                            <input
                                className="w-full border rounded p-2"
                                name="currentPassword"
                                type="password"
                                placeholder="Текущий пароль"
                                value={form.currentPassword}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="w-full border rounded p-2"
                                name="newPassword"
                                type="password"
                                placeholder="Новый пароль"
                                value={form.newPassword}
                                onChange={handleChange}
                                required
                            />
                            <input
                                className="w-full border rounded p-2"
                                name="confirmPassword"
                                type="password"
                                placeholder="Подтверждение пароля"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <button className="bg-yellow-500 hover:bg-yellow-600 w-full py-2 text-white rounded-full transition">
                                Обновить пароль
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )



}
