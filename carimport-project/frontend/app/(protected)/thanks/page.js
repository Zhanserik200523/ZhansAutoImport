'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import useAuthRedirect from '@/hooks/useAuthRedirect'

export default function ThanksPage() {
    useAuthRedirect()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="max-w-xl mx-auto px-4 py-16">
            <div className="bg-white shadow-lg rounded-xl p-8 text-center">
                <h2 className="text-2xl font-bold text-green-600 mb-4">Спасибо за заявку!</h2>
                <p className="text-lg text-gray-700 mb-6">
                    Мы получили вашу заявку и скоро свяжемся с вами.
                </p>

                <div className="flex justify-center gap-4 flex-wrap">
                    <Link
                        href="/cars"
                        className="px-5 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
                    >
                        ← Вернуться к каталогу
                    </Link>
                    <Link
                        href="/profile"
                        className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Перейти в профиль
                    </Link>
                </div>
            </div>
        </div>
    )

}
