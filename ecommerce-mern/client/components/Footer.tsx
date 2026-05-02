// Footer = Server Component
// Aucun hook, aucune interactivité → pas besoin de 'use client'
// Rendu une seule fois côté serveur, plus performant

import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-8">

                <div className="flex flex-col md:flex-row justify-between items-center gap-4">

                    <span className="text-lg font-bold text-teal-600">Galsen-Ecommerce-Shop</span>

                    <nav className="flex items-center gap-6">
                        <Link
                            href="/products"
                            className="text-sm text-gray-500 hover:text-teal-600 transition"
                        >
                            Produits
                        </Link>
                        <Link
                            href="/cart"
                            className="text-sm text-gray-500 hover:text-teal-600 transition"
                        >
                            Panier
                        </Link>
                    </nav>

                    {/* getFullYear() → l'année se met à jour automatiquement chaque année */}
                    <p className="text-sm text-gray-400">
                        © {new Date().getFullYear()} Galsen-Ecommerce-Shop. Tous droits réservés.
                    </p>

                </div>

            </div>
        </footer>
    )
}
