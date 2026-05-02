'use client'

// Cette page a besoin de 'use client' car elle lit directement le store Zustand
// pour décider quoi afficher (panier vide vs liste d'articles)

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import CartItem from '@/components/CartItem'
import CartSummary from '@/components/CartSummary'
import ProtectedRoute from '@/components/ProtectedRoute'
import PageHero from '@/components/PageHero'

export default function CartPage() {
    const items = useCartStore((state) => state.items)

    return (
        <ProtectedRoute>
        <>
            <PageHero compact title="Mon panier" subtitle="Vérifiez vos articles avant de passer commande." />
            <main className="max-w-6xl mx-auto px-4 py-8">

            {items.length === 0 ? (
                // État vide — UX importante : toujours guider l'utilisateur
                // vers l'action suivante plutôt que laisser une page morte
                <div className="text-center py-20">
                    <p className="text-gray-400 text-lg mb-6">Ton panier est vide</p>
                    <Link
                        href="/products"
                        className="bg-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-600 transition"
                    >
                        Voir les produits
                    </Link>
                </div>
            ) : (
                // CSS Grid : 3 colonnes sur grand écran
                // Articles → col-span-2 (2/3 de la largeur)
                // Résumé  → col-span-1 (1/3 de la largeur)
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {items.map((item) => (
                            // key obligatoire sur les listes React
                            // permet à React d'identifier chaque élément pour les mises à jour
                            <CartItem key={item.product._id} item={item} />
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <CartSummary />
                    </div>

                </div>
            )}

        </main>
        </>
        </ProtectedRoute>
    )
}
