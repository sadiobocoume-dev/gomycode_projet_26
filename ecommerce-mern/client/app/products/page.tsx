import ProducList from "../../components/ProductList";
import { Product } from '@/types/product'

//aync = ce composant peut etre des appels reseau
// c'est un server component - s'execute cote serveur, pas ds le naviagteur
export default async function ProductsPage() {

    // fetch() natif de Next.js - fait la requete au backend
    //process.env.NEXT_PUBLIC_API_URL = http://localhost:5001
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
        // cache: 'no-store' = ne pas mettre en cache, tjrs les donnees fraiches
        // utile pour un catalogue qui peut changer souvent
        cache: 'no-store'
    })

    const products: Product[] = await res.json()
    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            {/* Titre de la page */}
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                Nos Produits
            </h1>
            {/* On passe les produits a ProducList qui les affiche */}
            <ProducList products={products} />
        </main>
    )
}