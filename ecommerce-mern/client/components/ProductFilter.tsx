'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function ProductFilter() {
    //useSearchParams = lit les parametres actuels ds l'URL
    //ex: /products?category=electronics searchParams.get('category')= 'electronics'
    const searchParams = useSearchParams()
    const router = useRouter()


    //useState initialise chaque filtre avec la valeur deja ds l'url(si elle existe)
    // Ainsi si le user revient sur la page, les filtres st deja remplies

    const [search, setSearch] = useState(searchParams.get('search') || '')
    const [category, setCategory] = useState(searchParams.get('category') || '')
    const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')

    const handleFilter = () => {
        //URLSearchParams = outil natif pour construire des query strings
        const params = new URLSearchParams()

        // on ajoute les filtres qui ont une valeur
        if (search) params.set('search', search)
        if (category) params.set('category', category)
        if (minPrice) params.set('minPrice', minPrice)
        if (maxPrice) params.set('maxPrice', maxPrice)
        // router.push() navigue vers la nouvelle Url sans recharge la page
        // ex: /products?category=electronics&minPrice=100   
        router.push(`/products?${params.toString()}`)
        // refresh() force le Server Component a re-executer le fetch avec les nouveaux params
        // Sans ca, Next.js utilise le cache et les resultats ne changent pas
        router.refresh()
    }

    const handleReset = () => {
        setSearch('')
        setCategory('')
        setMinPrice('')
        setMaxPrice('')
        router.push('/products')
        router.refresh()
    }
    return (
        /*
          flex flex-col gap-4   → colonne verticale avec espacement
          bg-white p-4 rounded-xl shadow  → carte blanche avec ombre
          md:flex-row  → horizontal sur tablette et desktop
      */
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-end">

            {/* Recherche par mot-clé */}
            <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium text-gray-600">Recherche</label>
                <input
                    type="text"
                    placeholder="Nom du produit..."
                    value={search}
                    // onChange se déclenche à chaque frappe clavier
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>

            {/* Filtre par catégorie */}
            <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium text-gray-600">Catégorie</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    <option value="">Toutes</option>
                    <option value="electronics">Électronique</option>
                    <option value="clothing">Vêtements</option>
                    <option value="food">Alimentation</option>
                    <option value="books">Livres</option>
                    <option value="other">Autre</option>
                </select>
            </div>

            {/* Prix minimum */}
            <div className="flex flex-col gap-1 w-28">
                <label className="text-sm font-medium text-gray-600">Prix min</label>
                <input
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>

            {/* Prix maximum */}
            <div className="flex flex-col gap-1 w-28">
                <label className="text-sm font-medium text-gray-600">Prix max</label>
                <input
                    type="number"
                    placeholder="9999"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>

            {/* Boutons */}
            <div className="flex gap-2">
                <button
                    onClick={handleFilter}
                    className="bg-teal-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-600 transition"
                >
                    Filtrer
                </button>
                <button
                    onClick={handleReset}
                    className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
                >
                    Réinitialiser
                </button>
            </div>
        </div>
    )

}