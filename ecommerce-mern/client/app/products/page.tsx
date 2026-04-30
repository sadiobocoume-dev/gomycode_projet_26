import ProducList from "../../components/ProductList";
import ProductFilter from '@/components/ProductFilter'
import { Product } from '@/types/product'
import { Suspense } from "react";


//aync = ce composant peut etre des appels reseau
// c'est un server component - s'execute cote serveur, pas ds le naviagteur

// searchParams = les parametres de l'URL recus automatiquement par Next.js
//ex: /products?category=elctronics searchParams = {category: 'electronics'}
export default async function ProductsPage({
    searchParams }: {
        searchParams: { [key: string]: string | undefined }
    }) {
    // On construit les query params a envoyer au backend
    const params = new URLSearchParams()
    if (searchParams.search) params.set('search', searchParams.search)
    if (searchParams.category) params.set('category', searchParams.category)
    if (searchParams.minPrice) params.set('minPrice', searchParams.minPrice)
    if (searchParams.maxPrice) params.set('maxPrice', searchParams.maxPrice)
    // fetch() natif de Next.js - fait la requete au backend
    //process.env.NEXT_PUBLIC_API_URL = http://localhost:5001
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products?${params.toString()}`
    const res = await fetch(url, { cache: 'no-store' })
    // cache: 'no-store' = ne pas mettre en cache, tjrs les donnees fraiches
    // utile pour un catalogue qui peut changer souvent


    const products: Product[] = await res.json()
    return (
        <main className="max-w-6xl mx-auto px-4 py-8">
            {/* Titre de la page */}
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
                Nos Produits
            </h1>
            {/*
                Suspense est obligatoire quand on utilise useSearchParams ds un client Component
                il affiche  "Chargement ..." pendant que le composant se prepare
            */}
            <Suspense fallback={<div>Chargement des filtres...</div>}>
                <ProductFilter />
            </Suspense>

            {/* On passe les produits a ProducList qui les affiche */}
            <ProducList products={products} />
        </main>
    )
}