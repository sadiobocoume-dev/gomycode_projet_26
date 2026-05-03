import Image from 'next/image'
import { Product } from '@/types/product'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton'

// params = les segments dynamiques de l'URL
//ex: /products/abc123 params.id =. "abc123"

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
        { cache: 'no-store' }
    )

    // si le produit n'existe pas affiche la page 404 de Next.js
    if (!res.ok) {
        notFound()
    }

    const product: Product = await res.json()

    return (
        <main className="max-w-5xl mx-auto px-4 py-8">

            {/* Layout deux colonnes : image à gauche, infos à droite */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                {/* Colonne gauche — Image */}
                <div className="relative h-80 md:h-full min-h-80 rounded-xl overflow-hidden shadow bg-gray-50">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                    />
                </div>

                {/* Colonne droite — Infos */}
                <div className="flex flex-col gap-4">

                    {/* Catégorie */}
                    <span className="text-sm text-teal-500 font-medium uppercase tracking-wide">
                        {product.category}
                    </span>

                    {/* Nom */}
                    <h1 className="text-3xl font-bold text-gray-800">
                        {product.name}
                    </h1>

                    {/* Description */}
                    <p className="text-gray-500 leading-relaxed">
                        {product.description}
                    </p>

                    {/* Prix */}
                    <span className="text-4xl font-bold text-teal-600">
                        {product.price} Fcfa
                    </span>

                    {/* Stock */}
                    <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-500' : 'text-red-500'
                        }`}>
                        {product.stock > 0
                            ? `${product.stock} articles en stock`
                            : 'Rupture de stock'}
                    </p>

                    {/* Note */}
                    <p className="text-sm text-gray-400">
                        Note : {product.rating} / 5
                    </p>

                    <AddToCartButton product={product} />
                </div>
            </div>
        </main>
    )
}