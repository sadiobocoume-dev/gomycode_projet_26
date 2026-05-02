import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types/user'
import { useCartStore } from './cartStore'

interface AuthState {
    user: User | null
    token: string | null
    login:  (user: User, token: string) => void
    logout: () => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        // get() lit l'état courant du store — utile hors des composants React
        (set, get) => ({
            user:  null,
            token: null,

            login: (user, token) => {
                localStorage.setItem('token', token)

                // Restaure le panier sauvegardé pour cet utilisateur
                // Chaque user a sa propre clé cart-{id} → jamais de mélange entre users
                const saved = localStorage.getItem(`cart-${user.id}`)
                if (saved) {
                    useCartStore.getState().restoreCart(JSON.parse(saved))
                } else {
                    useCartStore.getState().clearCart()
                }

                set({ user, token })
            },

            logout: () => {
                const user = get().user // get() lit le user courant avant de le supprimer

                // Sauvegarde le panier sous cart-{userId} avant de le vider
                // Ainsi le même user retrouvera son panier à la prochaine connexion
                if (user) {
                    const items = useCartStore.getState().items
                    localStorage.setItem(`cart-${user.id}`, JSON.stringify(items))
                }

                localStorage.removeItem('token')
                useCartStore.getState().clearCart()
                set({ user: null, token: null })
            },
        }),
        { name: 'auth-storage' }
    )
)
