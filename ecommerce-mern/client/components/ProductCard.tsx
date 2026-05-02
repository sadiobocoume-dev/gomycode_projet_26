'use client'

// ProductCard passe en Client Component car il utilise useCartStore (hook Zustand)
// Avant US-13, c'était un Server Component — maintenant il a de l'interactivité

import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'
import { useCartStore } from '@/store/cartStore'

interface Props {
    product: Product
}

export default function ProductCard({ product }: Props) {
    const addItem = useCartStore((state) => state.addItem)

    const handleAddToCart = (e: React.MouseEvent) => {
        // Problème : le bouton est DANS un <Link>
        // Sans ces deux lignes, cliquer sur le bouton naviguerait aussi vers /products/:id

        e.preventDefault()    // annule l'action par défaut du navigateur (suivre le lien)
        e.stopPropagation()   // arrête la propagation de l'événement vers le <Link> parent
        addItem(product)
    }

    return (
        <Link href={`/products/${product._id}`}>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden
                            hover:-translate-y-1 hover:shadow-md hover:border-slate-200
                            transition-all duration-300 cursor-pointer">

                <div className="relative h-48 w-full bg-gray-50">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                    />
                </div>

                <div className="p-4">
                    <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-400 mt-1 capitalize">{product.category}</p>

                    <div className="flex justify-between items-center mt-3">
                        <span className="text-teal-600 font-bold text-lg">
                            {product.price} Fcfa
                        </span>
                        <span className={`text-sm font-medium ${
                            product.stock > 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                            {product.stock > 0 ? `${product.stock} en stock` : 'Épuisé'}
                        </span>
                    </div>

                    {/* disabled si stock = 0 → bouton grisé et non cliquable */}
                    <button
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                        className="mt-3 w-full bg-teal-500 text-white py-2 rounded-xl text-sm font-semibold
                                   hover:bg-teal-600 transition-colors duration-200
                                   disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                    >
                        {product.stock > 0 ? 'Ajouter au panier' : 'Épuisé'}
                    </button>
                </div>

            </div>
        </Link>
    )
}
