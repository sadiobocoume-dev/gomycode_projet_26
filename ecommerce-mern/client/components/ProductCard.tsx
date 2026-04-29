import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/types/product'

//props = les donnes que le composant recoit depuis son parent
// Ici ProductCard recoit un objet product de type Product
interface Props {
    product: Product
}

export default function ProductCard({ product }: Props) {
    return (
        <Link href={`/products/${product._id}`}>
            {/**
             Tailwind utilise ici:
             bg-White fond blanc
             roudnded-xl coins tres arrondis
             shadow ombre portee
             overflow-hidden cache ce qui depasse les coins
             hover:shadow-lg: ombre plus grande au survol
             transition animation fluide
             cursor-pointer
             */}
            <div className="bg-white rounded-xl shadow overflow-hidden hover:shadow-lg transition cursor-pointer">
                {/*Image du produit */}
                <div className="relative h-48 w-full">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover" // remplit le conteneur dans deformer
                    />
                </div>

                {/* Infos du produit */}
                <div className="p-4">
                    {/* Nom du produit - tuncate = coupe avec ... si trop long */}
                    <h3 className="font-semibold text-gray-800 tuncate">
                        {product.name}
                    </h3>

                    {/* categorie - texte petit et gris */}
                    <p className="text-sm text-gray-400 mt-1 capitalize">
                        {product.category}
                    </p>

                    {/* Prix et stock */}
                    <div className='flex justify-between items-center mt-3'>

                        {/* en bleu et gras */}
                        <span className='text-blue-600 font-bold text-lg'>
                            {product.price} Fcfa
                        </span>

                        {/* stock - vert si dispo, rouge si epuise */}
                        <span className={`text-sm font-medium ${product.stock > 0
                            ? 'text-green-500' // stock disponible
                            : 'text-red-500'   //rupture stock
                            }`}>
                            {product.stock > 0 ? `${product.stock} en stock` : 'Epuise'}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}