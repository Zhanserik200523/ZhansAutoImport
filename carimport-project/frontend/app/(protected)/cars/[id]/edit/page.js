'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'


export default function EditCarPage() {
    const { id } = useParams()
    const router = useRouter()

    const [form, setForm] = useState(null)
    const [files, setFiles] = useState([])
    const [preview, setPreview] = useState([])

    useEffect(() => {
        const fetchCar = async () => {
            const res = await fetch(`http://localhost:8080/api/cars/${id}`)
            const data = await res.json()
            setForm(data)
            setPreview(data.images || [])
        }
        fetchCar()
    }, [id])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e) => {
        const selected = Array.from(e.target.files)
        setFiles(selected)
        setPreview(selected.map(file => URL.createObjectURL(file)))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        for (const key in form) {
            if (key !== 'images') formData.append(key, form[key])
        }
        files.forEach(file => formData.append('images', file))

        const res = await fetch(`http://localhost:8080/api/cars/${id}`, {
            method: 'PUT',
            body: formData,
        })

        if (res.ok) {
            router.push(`/cars/${id}`)
        } else {
            alert('Ошибка при обновлении машины')
        }
    }

    if (!form) return <div className="container mt-5">Загрузка...</div>

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="bg-white shadow-md rounded-xl p-6 md:p-10">
                <h2 className="text-2xl font-bold text-center mb-8">Редактировать машину</h2>

                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Левая колонка */}
                        <div className="space-y-4">
                            {[
                                { label: 'Марка', name: 'brand' },
                                { label: 'Модель', name: 'model' },
                                { label: 'Год выпуска', name: 'year', type: 'number' },
                                { label: 'Цена (₸)', name: 'price', type: 'number' },
                                { label: 'Пробег (км)', name: 'mileage', type: 'number' },
                                { label: 'Объем двигателя (л)', name: 'engineVolume', type: 'number', step: '0.1' }
                            ].map((field, i) => (
                                <div key={i}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                                    <input
                                        type={field.type || 'text'}
                                        name={field.name}
                                        step={field.step}
                                        value={form[field.name] || ''}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Правая колонка */}
                        <div className="space-y-4">
                            {[
                                { label: 'Топливо', name: 'fuel' },
                                { label: 'Коробка передач', name: 'transmission' },
                                { label: 'Привод', name: 'drive' },
                                { label: 'Состояние', name: 'condition' },
                                { label: 'Тип кузова', name: 'bodyType' },
                                { label: 'Страна', name: 'country' }
                            ].map((field, i) => (
                                <div key={i}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                                    <input
                                        type="text"
                                        name={field.name}
                                        value={form[field.name] || ''}
                                        onChange={handleChange}
                                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Фото */}
                    <div>
                        <label className="block font-semibold mb-2">Новые фото (если нужно заменить):</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            className="block w-full border rounded px-3 py-2 text-sm"
                        />
                        <div className="flex gap-3 flex-wrap mt-4">
                            {preview.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt="preview"
                                    className="w-[100px] h-[70px] object-cover rounded border"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Кнопка */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 text-lg font-semibold bg-yellow-500 hover:bg-yellow-600 text-white rounded transition"
                        >
                            Сохранить изменения
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}
