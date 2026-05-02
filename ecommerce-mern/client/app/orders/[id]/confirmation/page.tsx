'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'
import api from '@/lib/api'
import { Order } from '@/types/order'

// Badge dynamique — lit le vrai statut de la commande depuis la base
function StatusBadge({ status }: { status: Order['status'] }) {
    const styles: Record<Order['status'], string> = {
        en_attente: 'bg-yellow-50 text-yellow-600',
        payee:      'bg-green-50  text-green-600',
        expediee:   'bg-blue-50   text-blue-600',
        livree:     'bg-gray-50   text-gray-600',
    }

    const labels: Record<Order['status'], string> = {
        en_attente: 'En attente de paiement',
        payee:      'Payée',
        expediee:   'Expédiée',
        livree:     'Livrée',
    }

    return (
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${styles[status]}`}>
            {labels[status]}
        </span>
    )
}

export default function ConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)

    const [order, setOrder]     = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState('')

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await api.get(`/api/orders/${id}`)
                setOrder(res.data)
            } catch (err: any) {
                setError('Commande introuvable')
            } finally {
                setLoading(false)
            }
        }

        fetchOrder()
    }, [id])

    return (
        <ProtectedRoute>
            <main className="max-w-lg mx-auto px-4 py-16 text-center">

                {loading ? (
                    <p className="text-gray-400">Chargement...</p>

                ) : error ? (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">{error}</div>

                ) : order ? (
                    <>
                        {/* Icône et titre conditionnels selon le vrai statut isPaid */}
                        {order.isPaid ? (
                            <>
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">Commande confirmée !</h1>
                                <p className="text-gray-400 mb-8">Merci pour ton achat. Ta commande a bien été enregistrée.</p>
                            </>
                        ) : (
                            <>
                                <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg className="w-10 h-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">Commande en attente</h1>
                                <p className="text-gray-400 mb-8">Cette commande n'a pas encore été payée.</p>
                            </>
                        )}

                        {/* Récapitulatif */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-left mb-8">

                            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                                <span className="text-sm text-gray-500">Numéro de commande</span>
                                <span className="font-mono font-semibold text-gray-800 text-sm">
                                    #{order._id.slice(-8).toUpperCase()}
                                </span>
                            </div>

                            {/* Statut lu depuis order.status — plus jamais hardcodé */}
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm text-gray-500">Statut</span>
                                <StatusBadge status={order.status} />
                            </div>

                            {order.isPaid && (
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 pb-3 border-b border-gray-100">
                                    <span>🚚</span>
                                    <span>Livraison sous <span className="font-medium text-gray-700">24h maximum</span></span>
                                </div>
                            )}

                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm text-gray-500">Articles</span>
                                <span className="text-sm font-semibold text-gray-800">
                                    {order.items.length} article{order.items.length > 1 ? 's' : ''}
                                </span>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <span className="font-semibold text-gray-700">Total</span>
                                <span className="font-bold text-teal-600 text-lg">
                                    {order.total} Fcfa
                                </span>
                            </div>
                        </div>

                        {/* Actions — conditionnelles selon isPaid */}
                        <div className="flex flex-col gap-3">

                            {!order.isPaid && (
                                <>
                                    {/* CTA principal : pousser le user à finaliser son achat */}
                                    <Link
                                        href={`/payment/${order._id}`}
                                        className="w-full bg-teal-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-600 transition shadow-lg shadow-teal-100"
                                    >
                                        💳 Payer maintenant — {order.total} Fcfa
                                    </Link>

                                    {/* Rassurance sous le bouton — réduit la friction à l'achat */}
                                    <p className="text-xs text-gray-400 text-center">
                                        🔒 Paiement 100% sécurisé via Stripe
                                    </p>
                                </>
                            )}

                            <Link
                                href="/orders"
                                className={`w-full py-3 rounded-xl font-semibold transition ${
                                    order.isPaid
                                        ? 'bg-teal-500 text-white hover:bg-teal-600'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                Voir mes commandes
                            </Link>

                            <Link
                                href="/products"
                                className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition"
                            >
                                Continuer mes achats
                            </Link>
                        </div>
                    </>
                ) : null}

            </main>
        </ProtectedRoute>
    )
}
