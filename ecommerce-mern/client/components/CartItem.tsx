'use client'

import Image from 'next/image'
import { CartItem as CartItemType, useCartStore } from '@/store/cartStore'

// On importe le type CartItem depuis le store et on le renomme CartItemType
// pour éviter le conflit avec le nom du composant lui-même
interface Props {
    item: CartItemType
}

export default function CartItem({ item }: Props) {
    // On souscrit uniquement aux fonctions dont on a besoin
    // → optimisation : ce composant ne re-rend pas si items[] change dans le store
    const removeItem = useCartStore((state) => state.removeItem)
    const updateQty  = useCartStore((state) => state.updateQty)

    return (
        <div className="flex gap-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-4 items-center hover:shadow-md transition-shadow duration-200">

            {/* Image produit */}
            {/* flex-shrink-0 → empêche l'image de se réduire si l'espace manque */}
            <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Nom + prix — flex-1 → prend tout l'espace disponible entre l'image et les boutons */}
            <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
                <p className="text-teal-600 font-bold mt-1">{item.product.price.toLocaleString()} Fcfa</p>
            </div>

            {/* Contrôle de quantité : − [qty] + */}
            <div className="flex items-center gap-2">
                <button
                    onClick={() => updateQty(item.product._id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-gray-600 flex items-center justify-center transition"
                >
                    −
                </button>

                <span className="w-6 text-center font-semibold text-gray-800">
                    {item.quantity}
                </span>

                <button
                    onClick={() => updateQty(item.product._id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-gray-600 flex items-center justify-center transition"
                >
                    +
                </button>
            </div>

            {/* Supprimer l'article complètement */}
            <button
                onClick={() => removeItem(item.product._id)}
                className="text-red-400 hover:text-red-600 text-sm font-medium transition ml-2"
            >
                Supprimer
            </button>

        </div>
    )
}
