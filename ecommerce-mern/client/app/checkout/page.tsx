'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import ProtectedRoute from '@/components/ProtectedRoute'
import PageHero from '@/components/PageHero'
import api from '@/lib/api'

export default function CheckoutPage() {
    const router    = useRouter()
    const items     = useCartStore((state) => state.items)
    const clearCart = useCartStore((state) => state.clearCart)
    const user      = useAuthStore((state) => state.user)

    const [loading, setLoading] = useState(false)
    const [error, setError]     = useState('')

    // Calcul du total — même logique que CartSummary
    const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)

    const handleOrder = async () => {
        setLoading(true)
        setError('')

        try {
            // On transforme les articles du cartStore au format attendu par le backend
            // cartStore stocke : { product: Product, quantity }
            // backend attend  : { product: _id, quantity, price }
            const orderItems = items.map((item) => ({
                product:  item.product._id,
                quantity: item.quantity,
                price:    item.product.price, // snapshot du prix au moment de l'achat
            }))

            // L'intercepteur Axios ajoute automatiquement le JWT dans le header
            // → le middleware protect côté backend valide l'utilisateur
            const res = await api.post('/api/orders', { items: orderItems, total })

            const orderId = res.data._id

            // Le panier est vidé uniquement après paiement réussi (dans /payment/:id)
            // Si l'utilisateur revient en arrière, son panier reste intact

            // Redirection vers la page de paiement Stripe (US-17)
            // L'orderId dans l'URL permet à la page de paiement de savoir quelle commande payer
            router.push(`/payment/${orderId}`)

        } catch (err: any) {
            setError(err.response?.data?.message || 'Erreur lors de la commande')
        } finally {
            setLoading(false)
        }
    }

    return (
        <ProtectedRoute>
            <>
            <PageHero compact title="Récapitulatif de commande" subtitle="Vérifiez vos articles et confirmez votre achat." />
            <main className="max-w-3xl mx-auto px-4 py-8">

                {/* Articles du panier */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
                    <h2 className="text-lg font-semibold text-slate-700 mb-4">Tes articles</h2>

                    <div className="flex flex-col gap-3">
                        {items.map((item) => (
                            <div key={item.product._id} className="flex justify-between items-center text-sm">
                                <span className="text-gray-700">
                                    {item.product.name}{' '}
                                    <span className="text-gray-400">× {item.quantity}</span>
                                </span>
                                <span className="font-semibold text-gray-800">
                                    {(item.product.price * item.quantity).toLocaleString()} Fcfa
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between font-bold text-gray-800">
                        <span>Total</span>
                        <span>{total.toLocaleString()} Fcfa</span>
                    </div>
                </div>

                {/* Infos de livraison */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
                    <h2 className="text-lg font-semibold text-slate-700 mb-3">Livraison</h2>
                    <p className="text-sm text-gray-600">
                        Nom : <span className="font-medium text-gray-800">{user?.name}</span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        Email : <span className="font-medium text-gray-800">{user?.email}</span>
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <button
                    onClick={handleOrder}
                    disabled={loading || items.length === 0}
                    className="w-full bg-teal-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-teal-600 transition disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                >
                    {loading ? 'Création de la commande...' : 'Confirmer et payer'}
                </button>

            </main>
            </>
        </ProtectedRoute>
    )
}
