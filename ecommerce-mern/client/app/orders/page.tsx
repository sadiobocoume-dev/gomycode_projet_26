'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProtectedRoute from '@/components/ProtectedRoute'
import PageHero from '@/components/PageHero'
import api from '@/lib/api'
import { Order } from '@/types/order'

// Badge coloré selon le statut de la commande
// Record<K, V> = objet dont les clés sont de type K et les valeurs de type V
// Si un statut est ajouté dans l'interface Order, TypeScript force à l'ajouter ici
function StatusBadge({ status }: { status: Order['status'] }) {
    const styles: Record<Order['status'], string> = {
        en_attente: 'bg-yellow-50 text-yellow-600',
        payee:      'bg-green-50  text-green-600',
        expediee:   'bg-blue-50   text-blue-600',
        livree:     'bg-gray-50   text-gray-600',
    }

    const labels: Record<Order['status'], string> = {
        en_attente: 'En attente',
        payee:      'Payée',
        expediee:   'Expédiée',
        livree:     'Livrée',
    }

    return (
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${styles[status]}`}>
            {labels[status]}
        </span>
    )
}

export default function OrdersPage() {
    const [orders, setOrders]   = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState('')

    useEffect(() => {
        // Récupère toutes les commandes de l'utilisateur connecté
        // Le backend filtre par req.user.id extrait du JWT
        const fetchOrders = async () => {
            try {
                const res = await api.get('/api/orders/user/mine')
                setOrders(res.data)
            } catch (err: any) {
                setError('Impossible de charger les commandes')
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, []) // [] = une seule fois au montage

    return (
        <ProtectedRoute>
            <>
            <PageHero compact title="Mes commandes" subtitle="Retrouvez l'historique de tous vos achats." />
            <main className="max-w-3xl mx-auto px-4 py-8">

                {loading ? (
                    <p className="text-gray-400 text-center py-12">Chargement...</p>

                ) : error ? (
                    <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg">{error}</div>

                ) : orders.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg mb-6">Tu n'as pas encore de commande</p>
                        <Link
                            href="/products"
                            className="bg-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-600 transition"
                        >
                            Découvrir les produits
                        </Link>
                    </div>

                ) : (
                    <div className="flex flex-col gap-4">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col sm:flex-row justify-between gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                            >
                                {/* Infos commande */}
                                <div className="flex flex-col gap-2">

                                    {/* 8 derniers caractères de l'_id MongoDB */}
                                    <p className="font-mono font-semibold text-gray-800">
                                        #{order._id.slice(-8).toUpperCase()}
                                    </p>

                                    {/* Locale explicite 'fr-FR' → pas de risque d'hydratation */}
                                    <p className="text-sm text-gray-400">
                                        {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                                            day:   '2-digit',
                                            month: 'long',
                                            year:  'numeric'
                                        })}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        {order.items.length} article{order.items.length > 1 ? 's' : ''}
                                    </p>
                                </div>

                                {/* Statut + total + lien */}
                                <div className="flex flex-col items-start sm:items-end gap-2">
                                    <StatusBadge status={order.status} />

                                    <p className="font-bold text-teal-600 text-lg">
                                        {order.total} Fcfa
                                    </p>

                                    <Link
                                        href={`/orders/${order._id}/confirmation`}
                                        className="text-sm text-teal-500 hover:text-teal-700 hover:underline transition-colors"
                                    >
                                        Voir le détail →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </main>
            </>
        </ProtectedRoute>
    )
}
