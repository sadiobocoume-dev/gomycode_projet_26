'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import api from '@/lib/api'
import { Product } from '@/types/product'
import ProductCard from '@/components/ProductCard'

/* ── Avis clients ── */
const TESTIMONIALS = [
    {
        id: 1,
        name: 'Fatou Diallo',
        location: 'Thiès, Mour 3',
        rating: 5,
        comment:
            'Super boutique ! J\'ai commandé un ventilateur en ligne et je l\'ai reçu le lendemain matin. Les prix sont honnêtes et le service est rapide. Je recommande à tout le quartier !',
        initials: 'FD',
        color: 'bg-teal-500',
    },
    {
        id: 2,
        name: 'Moussa Ndiaye',
        location: 'Thiès Centre',
        rating: 5,
        comment:
            'Vraiment pratique de pouvoir commander sans se déplacer. Le paiement en ligne est sécurisé et j\'ai reçu ma confirmation immédiatement. Mon colis était bien emballé.',
        initials: 'MN',
        color: 'bg-indigo-400',
    },
    {
        id: 3,
        name: 'Aïssatou Sow',
        location: 'Thiès, Randoulène',
        rating: 4,
        comment:
            'Bonne expérience d\'achat. Large choix de produits, interface simple à utiliser. La livraison a pris 2 jours mais le produit correspond exactement à la description.',
        initials: 'AS',
        color: 'bg-amber-400',
    },
    {
        id: 4,
        name: 'Ibrahima Fall',
        location: 'Thiès, Mbour Route',
        rating: 5,
        comment:
            'Je suis client depuis l\'ouverture. Chaque commande s\'est bien passée. C\'est rassurant d\'avoir une boutique locale qu\'on peut aller voir en cas de problème.',
        initials: 'IF',
        color: 'bg-rose-400',
    },
]

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <svg
                    key={star}
                    className={`w-4 h-4 ${star <= rating ? 'text-amber-400' : 'text-slate-200'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    )
}

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading]   = useState(true)

    useEffect(() => {
        api.get('/api/products')
            .then(({ data }) => {
                const list: Product[] = data.products ?? data
                setProducts(list.slice(0, 6))
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="flex flex-col">

            {/* ══════════════════════════════════════
                HERO — doux, aéré
            ══════════════════════════════════════ */}
            <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-indigo-50 to-blue-100">

                {/* Cercles décoratifs très doux */}
                <div className="absolute -top-32 -right-32 w-[28rem] h-[28rem] bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

                <div className="relative max-w-5xl mx-auto px-4 py-24 flex flex-col items-center text-center gap-7">

                    {/* Badge localisation */}
                    <span className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-slate-200 text-slate-500 text-xs font-medium px-4 py-1.5 rounded-full shadow-sm">
                        <svg className="w-3.5 h-3.5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Thiès, Sénégal · Mour 3, près du château d'eau
                    </span>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 leading-tight max-w-3xl tracking-tight">
                        Votre commerce de{' '}
                        <span className="text-teal-500">proximité</span>,{' '}
                        livré chez vous
                    </h1>

                    <p className="text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed">
                        Galsen-Ecommerce-Shop, c'est la boutique du quartier en version numérique. Commandez
                        en ligne, payez en toute sécurité et recevez vos articles directement
                        à domicile — sans vous déplacer.
                    </p>

                    {/* Indicateurs */}
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Siège : Mour 3, Thiès
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Livraison sous 24h
                        </span>
                        <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            Paiement sécurisé
                        </span>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-3 mt-1">
                        <Link
                            href="/products"
                            className="bg-teal-500 text-white font-semibold px-8 py-3 rounded-xl text-sm
                                       shadow-md shadow-teal-200 hover:bg-teal-600 hover:shadow-teal-300
                                       transition-all duration-200"
                        >
                            Voir nos produits →
                        </Link>
                        <Link
                            href="/register"
                            className="bg-white text-slate-600 font-semibold px-8 py-3 rounded-xl text-sm
                                       border border-slate-200 shadow-sm
                                       hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800
                                       transition-all duration-200"
                        >
                            Créer un compte
                        </Link>
                    </div>

                </div>
            </section>

            {/* ══════════════════════════════════════
                CATALOGUE
            ══════════════════════════════════════ */}
            <section className="bg-slate-50 py-16 px-4">
                <div className="max-w-6xl mx-auto">

                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                        <div>
                            <p className="text-xs font-semibold text-teal-500 uppercase tracking-widest mb-1">Catalogue</p>
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Nos produits du moment</h2>
                            <p className="text-sm text-slate-400 mt-1">Disponibles maintenant à Thiès</p>
                        </div>
                        <Link
                            href="/products"
                            className="text-sm font-semibold text-teal-500 hover:text-teal-700 transition-colors duration-200 whitespace-nowrap"
                        >
                            Tout voir →
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl h-72 animate-pulse" />
                            ))}
                        </div>
                    ) : products.length === 0 ? (
                        <p className="text-center text-slate-400 py-16">Aucun produit disponible pour le moment.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}

                    {!loading && products.length > 0 && (
                        <div className="text-center mt-10">
                            <Link
                                href="/products"
                                className="inline-block bg-white text-teal-600 border border-teal-200 font-semibold px-8 py-3 rounded-xl text-sm
                                           shadow-sm hover:bg-teal-50 hover:border-teal-300 hover:shadow-md
                                           transition-all duration-200"
                            >
                                Voir tout le catalogue
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* ══════════════════════════════════════
                AVIS CLIENTS
            ══════════════════════════════════════ */}
            <section className="bg-white py-16 px-4">
                <div className="max-w-6xl mx-auto">

                    <div className="text-center mb-12">
                        <p className="text-xs font-semibold text-teal-500 uppercase tracking-widest mb-1">Témoignages</p>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">Ce que disent nos clients</h2>
                        <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
                            Des habitants de Thiès partagent leur expérience avec Galsen-Ecommerce-Shop
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {TESTIMONIALS.map((t) => (
                            <div
                                key={t.id}
                                className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col gap-4
                                           hover:-translate-y-1 hover:shadow-lg hover:border-slate-200
                                           transition-all duration-300 cursor-default"
                            >
                                <StarRating rating={t.rating} />

                                <p className="text-sm text-slate-500 leading-relaxed flex-1">
                                    &ldquo;{t.comment}&rdquo;
                                </p>

                                <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${t.color}`}>
                                        {t.initials}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-700">{t.name}</p>
                                        <p className="text-xs text-slate-400">{t.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Note globale */}
                    <div className="mt-12 text-center">
                        <div className="inline-flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl px-6 py-3">
                            <StarRating rating={5} />
                            <span className="text-sm font-semibold text-amber-700">4.9 / 5</span>
                            <span className="text-sm text-slate-400">basé sur +120 avis clients</span>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    )
}
