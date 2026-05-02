'use client'

import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'

export default function CartSummary() {
    const router = useRouter()
    const items  = useCartStore((state) => state.items)
    const user   = useAuthStore((state) => state.user)

    // reduce() parcourt tous les articles et accumule une valeur unique
    // acc = accumulateur (démarre à 0), item = article courant
    // Résultat : prix total = somme de (prix × quantité) pour chaque article
    const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    const count = items.reduce((acc, item) => acc + item.quantity, 0)

    const handleCheckout = () => {
        if (!user) {
            // Utilisateur non connecté → on le redirige vers login
            // La page checkout sera protégée dans US-15
            router.push('/login')
        } else {
            router.push('/checkout')
        }
    }

    return (
        // sticky top-4 → le résumé reste visible quand on scrolle la liste d'articles
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sticky top-4">

            <h2 className="text-xl font-bold text-gray-800 mb-6">Résumé</h2>

            <div className="flex justify-between text-gray-600 mb-3">
                <span>Articles ({count})</span>
                <span>{total.toLocaleString()} Fcfa</span>
            </div>

            <div className="flex justify-between text-gray-600 mb-4">
                <span>Livraison</span>
                <span className="text-green-500 font-medium">Gratuite</span>
            </div>

            {/* Séparateur + total final */}
            <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-800 text-lg mb-6">
                <span>Total</span>
                <span>{total.toLocaleString()} Fcfa</span>
            </div>

            <button
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="w-full bg-teal-500 text-white py-3 rounded-xl font-semibold hover:bg-teal-600 transition disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
                Passer la commande
            </button>

        </div>
    )
}
