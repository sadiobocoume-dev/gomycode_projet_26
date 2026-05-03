'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import AdminRoute from '@/components/AdminRoute'
import PageHero from '@/components/PageHero'
import api from '@/lib/api'
import { Order } from '@/types/order'
import { Product } from '@/types/product'

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
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${styles[status]}`}>
            {labels[status]}
        </span>
    )
}

function AdminContent() {
    const searchParams = useSearchParams()
    const [orders, setOrders]     = useState<Order[]>([])
    const [products, setProducts] = useState<Product[]>([])
    const [tab, setTab]           = useState<'orders' | 'products'>(
        searchParams.get('tab') === 'products' ? 'products' : 'orders'
    )
    const [loading, setLoading]   = useState(true)

    useEffect(() => {
        const fetchAll = async () => {
            try {
                // Promise.all lance les deux requêtes en parallèle — plus rapide qu'en séquence
                const [ordersRes, productsRes] = await Promise.all([
                    api.get('/api/orders/admin/all'),
                    api.get('/api/products'),
                ])
                setOrders(ordersRes.data)
                // L'API produits peut retourner { products: [...] } ou directement [...]
                setProducts(productsRes.data.products ?? productsRes.data)
            } finally {
                setLoading(false)
            }
        }
        fetchAll()
    }, [])

    const handleDelete = async (productId: string) => {
        if (!confirm('Supprimer ce produit ?')) return
        await api.delete(`/api/products/${productId}`)
        setProducts((prev) => prev.filter((p) => p._id !== productId))
    }

    return (
        <>
        <PageHero compact title="Dashboard Admin" subtitle="Gérez vos commandes et votre catalogue produits." />
        <main className="max-w-5xl mx-auto px-4 py-8">
                <p className="text-sm text-slate-400 mb-6">
                    {orders.length} commande{orders.length > 1 ? 's' : ''} · {products.length} produit{products.length > 1 ? 's' : ''}
                </p>

                {/* Onglets */}
                <div className="flex gap-2 mb-6">
                    {(['orders', 'products'] as const).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                                tab === t
                                    ? 'bg-teal-500 text-white'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {t === 'orders' ? 'Commandes' : 'Produits'}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <p className="text-gray-400 text-center py-12">Chargement...</p>

                ) : tab === 'orders' ? (

                    /* ── Onglet Commandes ── */
                    <div className="flex flex-col gap-3">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row justify-between gap-3 hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="flex flex-col gap-1">
                                    <p className="font-mono font-semibold text-gray-800 text-sm">
                                        #{order._id.slice(-8).toUpperCase()}
                                    </p>
                                    {/* user est populé → on accède à name/email via cast any */}
                                    <p className="text-sm text-gray-500">
                                        {(order.user as any)?.name} — {(order.user as any)?.email}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {new Date(order.createdAt).toLocaleDateString('fr-FR', {
                                            day: '2-digit', month: 'long', year: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div className="flex flex-col items-start sm:items-end gap-2">
                                    <StatusBadge status={order.status} />
                                    <p className="font-bold text-teal-600">{order.total} Fcfa</p>
                                    <Link
                                        href={`/admin/orders/${order._id}`}
                                        className="text-xs text-teal-500 hover:text-teal-700 hover:underline transition-colors"
                                    >
                                        Gérer →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                ) : (

                    /* ── Onglet Produits ── */
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-end mb-2">
                            <Link
                                href="/admin/products/new"
                                className="bg-teal-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-teal-600 transition"
                            >
                                + Nouveau produit
                            </Link>
                        </div>

                        {products.map((product) => (
                            <div
                                key={product._id}
                                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col sm:flex-row justify-between gap-3 hover:shadow-md transition-shadow duration-200"
                            >
                                <div>
                                    <p className="font-semibold text-gray-800">{product.name}</p>
                                    <p className="text-sm text-gray-400">
                                        {product.category} · {product.price} Fcfa
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={`/admin/products/${product._id}/edit`}
                                        className="text-sm px-3 py-1 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                                    >
                                        Modifier
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(product._id)}
                                        className="text-sm px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </main>
        </>
    )
}

export default function AdminPage() {
    return (
        <Suspense fallback={<p className="text-center py-12 text-gray-400">Chargement...</p>}>
            <AdminRoute>
                <AdminContent />
            </AdminRoute>
        </Suspense>
    )
}
