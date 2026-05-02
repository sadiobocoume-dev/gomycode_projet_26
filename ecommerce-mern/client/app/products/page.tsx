import ProducList from "../../components/ProductList";
import ProductFilter from '@/components/ProductFilter'
import Pagination from '@/components/Pagination'
import PageHero from '@/components/PageHero'
import { Product } from '@/types/product'
import { Suspense } from "react";

export default async function ProductsPage({
    searchParams }: {
        searchParams: Promise<{ [key: string]: string | undefined }>
    }) {
    const filters = await searchParams

    const params = new URLSearchParams()
    if (filters.search) params.set('search', filters.search)
    if (filters.category) params.set('category', filters.category)
    if (filters.minPrice) params.set('minPrice', filters.minPrice)
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)
    if (filters.page) params.set('page', filters.page)

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/products?${params.toString()}`

    // revalidate: 60 = Next.js garde la réponse en cache 60 secondes
    // Évite d'appeler le backend à chaque visite et réduit les cold starts
    const res = await fetch(url, { next: { revalidate: 60 } })

    const data: { products: Product[]; total: number; page: number; totalPages: number } = await res.json()

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
                <ProducList products={data.products} />
                <Suspense fallback={null}>
                    <Pagination currentPage={data.page} totalPages={data.totalPages} />
                </Suspense>
            </main>
        </>
    )
}