'use client'

import Image from 'next/image'
import { CartItem as CartItemType, useCartStore } from '@/store/cartStore'

interface Props {
    item: CartItemType
}

export default function CartItem({ item }: Props) {
    const removeItem = useCartStore((state) => state.removeItem)
    const updateQty  = useCartStore((state) => state.updateQty)

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex gap-4 items-start">

                {/* Image */}
                <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Nom, prix, contrôles — empilés verticalement */}
                <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <h3 className="font-semibold text-gray-800 truncate">{item.product.name}</h3>
                    <p className="text-teal-600 font-bold">{item.product.price.toLocaleString()} Fcfa</p>

                    {/* Contrôles quantité + supprimer */}
                    <div className="flex items-center justify-between mt-1">
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

                        <button
                            onClick={() => removeItem(item.product._id)}
                            className="text-red-400 hover:text-red-600 text-sm font-medium transition"
                        >
                            Supprimer
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
