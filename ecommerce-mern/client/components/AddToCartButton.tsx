'use client'

import { useRouter } from 'next/navigation'
import { Product } from '@/types/product'
import { useCartStore } from '@/store/cartStore'

export default function AddToCartButton({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem)
    const router  = useRouter()

    const handleClick = () => {
        addItem(product)
        router.push('/cart')
    }

    return (
        <button
            onClick={handleClick}
            disabled={product.stock === 0}
            className="mt-4 bg-teal-500 text-white py-3 px-6 rounded-xl font-semibold
                       hover:bg-teal-600 transition disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
        >
            {product.stock > 0 ? 'Ajouter au panier' : 'Rupture de stock'}
        </button>
    )
}
