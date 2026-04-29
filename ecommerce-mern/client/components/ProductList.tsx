import { Product } from '@/types/product'
import ProductCard from './ProductCard'

interface Props {
    products: Product[] // tableau de produits recus depuis la page
}

export default function ProducList({ products }: Props) {
    // Cas ou il n'ya aucun produit
    if (products.length === 0) {
        return (
            <p className='text-center text-gray-500 mt-10'>
                Aucun produit disponible.
            </p>
        )
    }

    return (
        /* grid affichage en grille css
        grid-cols-1  1 colonne sur mobile
        sm:grid-cols-2 2 colonnes sur tablette
        sm:grid-cols-3  3 colonnes sur desktop (lg = 1024px+)
        gap-6   espace de 24px entre les cartes
         */
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {products.map((product) => (
                //key = identifient unique obligatoire quand on genere une liste
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    )
}