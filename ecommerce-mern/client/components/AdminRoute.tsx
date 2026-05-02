'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

export default function AdminRoute({ children }: { children: React.ReactNode }) {
    const user   = useAuthStore((state) => state.user)
    const router = useRouter()
    const [mounted, setMounted] = useState(false)

    useEffect(() => { setMounted(true) }, [])

    // Pas connecté du tout → login
    useEffect(() => {
        if (!mounted) return
        if (!user) router.push('/login')
    }, [mounted, user, router])

    if (!mounted) return null

    // Connecté mais pas admin → message d'accès refusé
    if (user && user.role !== 'admin') {
        return (
            <main className="max-w-lg mx-auto px-4 py-24 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Accès refusé</h1>
                <p className="text-gray-400 text-sm">
                    Cette page est réservée aux administrateurs.
                </p>
            </main>
        )
    }

    if (!user) return null

    return <>{children}</>
}
