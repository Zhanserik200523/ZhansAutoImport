'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AddCarPage() {
    const router = useRouter()

    const [form, setForm] = useState({
        brand: '', model: '', year: '', price: '', mileage: '',
        fuel: '', transmission: '', drive: '', condition: '',
        bodyType: '', engineVolume: '', country: ''
    })

    const [files, setFiles] = useState([])
    const [preview, setPreview] = useState([])

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
        for (const key in form) formData.append(key, form[key])
        files.forEach(file => formData.append('images', file))

        const res = await fetch('http://localhost:8080/api/cars', {
            method: 'POST',
            body: formData
        })

        if (res.ok) {
            router.push('/cars')
        } else {
            alert('Ошибка при добавлении машины')
        }
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-8">Добавить новую машину</h2>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Левая колонка */}
                        <div>
                            {[
                                { label: 'Марка', name: 'brand' },
                                { label: 'Модель', name: 'model' },
                                { label: 'Год выпуска', name: 'year', type: 'number' },
                                { label: 'Цена (₸)', name: 'price', type: 'number' },
                                { label: 'Пробег (км)', name: 'mileage', type: 'number' },
                                { label: 'Объём двигателя (л)', name: 'engineVolume', type: 'number', step: '0.1' }
                            ].map((field, i) => (
                                <div key={i}>
                                    <label className="block text-sm font-medium mb-1">{field.label}</label>
                                    <input
                                        type={field.type || 'text'}
                                        name={field.name}
                                        step={field.step}
                                        value={form[field.name]}
                                        onChange={handleChange}
                                        required={['brand', 'model', 'year', 'price'].includes(field.name)}
                                        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Правая колонка */}
                        <div>
                            {[
                                { label: 'Топливо', name: 'fuel' },
                                { label: 'Коробка передач', name: 'transmission' },
                                { label: 'Привод', name: 'drive' },
                                { label: 'Состояние', name: 'condition' },
                                { label: 'Тип кузова', name: 'bodyType' },
                                { label: 'Страна', name: 'country' }
                            ].map((field, i) => (
                                <div key={i}>
                                    <label className="block text-sm font-medium mb-1">{field.label}</label>
                                    <input
                                        name={field.name}
                                        value={form[field.name]}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Фото */}
                    <div className="mt-6">
                        <label className="block font-semibold mb-2">Фото (до 10):</label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="block w-full border border-gray-300 px-3 py-2 rounded"
                        />

                        <div className="flex flex-wrap gap-3 mt-4">
                            {preview.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt="preview"
                                    className="w-24 h-16 object-cover rounded border border-gray-300"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Кнопка */}
                    <div className="mt-8">
                        <button
                            type="submit"
                            className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700 transition text-lg"
                        >
                            Сохранить машину
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )

}
