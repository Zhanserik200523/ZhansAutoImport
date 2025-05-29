'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function useAuthRedirect() {
    const router = useRouter()

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                router.push('/login')
                return
            }

            const res = await fetch('http://localhost:8080/api/profile', {
                headers: { Authorization: `Bearer ${token}` },
            })

            if (res.status === 401) {
                localStorage.removeItem('token')
                router.push('/login')
            }
        }

        checkToken()
    }, [router])
}
