'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import AdminRoute from '@/components/AdminRoute'
import api from '@/lib/api'
import { Order } from '@/types/order'

// Définit quelle est la prochaine étape pour chaque statut
// null = pas de transition possible (état final ou géré par Stripe)
const STATUS_FLOW: Record<Order['status'], Order['status'] | null> = {
    en_attente: null,
    payee:      'expediee',
    expediee:   'livree',
    livree:     null,
}

const STATUS_LABELS: Record<Order['status'], string> = {
    en_attente: 'En attente',
    payee:      'Payée',
    expediee:   'Expédiée',
    livree:     'Livrée',
}

export default function AdminOrderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    const router  = useRouter()

    const [order, setOrder]     = useState<Order | null>(null)
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [error, setError]     = useState('')

    useEffect(() => {
        api.get(`/api/orders/admin/${id}`)
            .then(res => setOrder(res.data))
            .catch(() => setError('Commande introuvable'))
            .finally(() => setLoading(false))
    }, [id])

    const handleStatusUpdate = async () => {
        if (!order) return
        const nextStatus = STATUS_FLOW[order.status]
        if (!nextStatus) return

        setUpdating(true)
        setError('')
        try {
            // PATCH envoie seulement le champ modifié — plus léger qu'un PUT complet
            const res = await api.patch(`/api/orders/${id}/status`, { status: nextStatus })
            setOrder(res.data)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erreur lors de la mise à jour')
        } finally {
            setUpdating(false)
        }
    }

    return (
        <AdminRoute>
            <main className="max-w-2xl mx-auto px-4 py-8">

                <button
                    onClick={() => router.push('/admin')}
                    className="text-sm text-gray-400 hover:text-gray-600 mb-6 flex items-center gap-1 transition"
                >
                    ← Retour au dashboard
                </button>

                {loading ? (
                    <p className="text-gray-400">Chargement...</p>

                ) : error ? (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">{error}</div>

                ) : order ? (
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col gap-6">

                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                Commande #{order._id.slice(-8).toUpperCase()}
                            </h1>
                            <p className="text-sm text-gray-400 mt-1">
                                {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                                    day: '2-digit', month: 'long', year: 'numeric'
                                })}
                            </p>
                        </div>

                        {/* Statut actuel + bouton de transition */}
                        <div className="flex items-center justify-between bg-slate-50 rounded-xl px-4 py-4">
                            <div>
                                <p className="text-xs text-gray-400 mb-1">Statut actuel</p>
                                <p className="font-semibold text-gray-800">{STATUS_LABELS[order.status]}</p>
                            </div>

                            {STATUS_FLOW[order.status] ? (
                                <button
                                    onClick={handleStatusUpdate}
                                    disabled={updating}
                                    className="bg-teal-500 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-teal-600 transition disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                                >
                                    {updating
                                        ? 'Mise à jour...'
                                        : `Marquer comme ${STATUS_LABELS[STATUS_FLOW[order.status]!]}`
                                    }
                                </button>
                            ) : (
                                <span className="text-sm text-gray-400 italic">
                                    {order.status === 'livree' ? 'Commande finalisée' : 'En attente de paiement'}
                                </span>
                            )}
                        </div>

                        {error && (
                            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg">{error}</div>
                        )}

                        {/* Récap articles */}
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-semibold text-gray-600 mb-1">Articles</p>
                            {order.items.map((item, i) => (
                                <div key={i} className="flex justify-between text-sm border-b border-gray-50 pb-2">
                                    <span className="text-gray-700">
                                        {(item.product as any)?.name ?? 'Produit'} × {item.quantity}
                                    </span>
                                    <span className="font-medium text-gray-800">
                                        {item.price * item.quantity} Fcfa
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between font-bold text-slate-800 pt-2">
                            <span>Total</span>
                            <span className="text-teal-600">{order.total} Fcfa</span>
                        </div>

                    </div>
                ) : null}

            </main>
        </AdminRoute>
    )
}
