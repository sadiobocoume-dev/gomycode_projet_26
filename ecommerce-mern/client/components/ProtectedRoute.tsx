'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'

interface Props {
    children: React.ReactNode // le contenu de la page protégée
}

export default function ProtectedRoute({ children }: Props) {
    const router = useRouter()
    const user   = useAuthStore((state) => state.user)

    // hydrated = Zustand a-t-il fini de lire le localStorage ?
    // false au démarrage (SSR), true après le premier rendu navigateur
    const [hydrated, setHydrated] = useState(false)

    // useEffect s'exécute uniquement dans le navigateur, jamais côté serveur
    // → quand ce code tourne, localStorage est accessible
    // → Zustand a déjà rehydraté l'état depuis localStorage
    useEffect(() => {
        setHydrated(true)
    }, []) // [] = une seule fois, au montage du composant

    // Dès que hydrated est true, on vérifie si l'utilisateur est connecté
    // Si user se déconnecte pendant que la page est ouverte → redirection automatique
    useEffect(() => {
        if (hydrated && !user) {
            router.push('/login')
        }
    }, [hydrated, user, router])

    // Hydratation en cours → rien n'est affiché
    // Évite le "flash" : afficher brièvement le contenu avant de rediriger
    if (!hydrated) return null

    // Hydraté mais pas connecté → null (redirection déjà lancée)
    if (!user) return null

    // Connecté → on affiche le contenu de la page
    return <>{children}</>
}
