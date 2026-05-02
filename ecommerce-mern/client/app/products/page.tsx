import ProducList from "../../components/ProductList";
import ProductFilter from '@/components/ProductFilter'
import PageHero from '@/components/PageHero'
import { Product } from '@/types/product'
import { Suspense } from "react";


//aync = ce composant peut etre des appels reseau
// c'est un server component - s'execute cote serveur, pas ds le naviagteur

// searchParams = les parametres de l'URL recus automatiquement par Next.js
//ex: /products?category=elctronics searchParams = {category: 'electronics'}
export default async function ProductsPage({
    searchParams }: {
        searchParams: Promise<{ [key: string]: string | undefined }>
    }) {
    // En Next.js 16, searchParams est une Promise — doit être attendue avant utilisation
    const filters = await searchParams

    // On construit les query params a envoyer au backend
    const params = new URLSearchParams()
    if (filters.search) params.set('search', filters.search)
    if (filters.category) params.set('category', filters.category)
    if (filters.minPrice) params.set('minPrice', filters.minPrice)
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)
    // fetch() natif de Next.js - fait la requete au backend
    //process.env.NEXT_PUBLIC_API_URL = http://localhost:5001
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products?${params.toString()}`
    const res = await fetch(url, { cache: 'no-store' })
    // cache: 'no-store' = ne pas mettre en cache, tjrs les donnees fraiches
    // utile pour un catalogue qui peut changer souvent


    const products: Product[] = await res.json()
    return (
        <>
            <PageHero
                compact
                title="Nos Produits"
                subtitle="Découvrez toute notre sélection de produits locaux livrés à Thiès."
            />
            <main className="max-w-6xl mx-auto px-4 py-8">
                <Suspense fallback={<div className="text-slate-400 text-sm">Chargement des filtres...</div>}>
                    <ProductFilter />
                </Suspense>
                <ProducList products={products} />
            </main>
        </>
    )
}