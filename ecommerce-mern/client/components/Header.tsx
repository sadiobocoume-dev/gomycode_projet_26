'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'

const NAV_LINKS = [
    { href: '/products',      label: 'Produits',      icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
    { href: '/orders',        label: 'Mes commandes',  icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { href: '/about',         label: 'À propos',       icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { href: '/founder',       label: 'Le fondateur',   icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { href: '/partenariats',  label: 'Partenariats',   icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
    { href: '/contact',       label: 'Contact',        icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
]

const DROPDOWN_LINKS = NAV_LINKS.slice(2) // À propos, Fondateur, Partenariats, Contact

export default function Header() {
    const router = useRouter()

    const user   = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)
    const items  = useCartStore((state) => state.items)

    const [mounted, setMounted]           = useState(false)
    const [search, setSearch]             = useState('')
    const [menuOpen, setMenuOpen]         = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => { setMounted(true) }, [])

    // Ferme le dropdown desktop si on clique en dehors
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    // Bloque le scroll de la page quand le menu mobile est ouvert
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

    const handleLogout = () => {
        logout()
        setMenuOpen(false)
        router.push('/')
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const q = search.trim()
        if (!q) return
        router.push(`/products?search=${encodeURIComponent(q)}`)
        setMenuOpen(false)
        setSearch('')
    }

    const closeMenu = () => setMenuOpen(false)

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center gap-4">

                {/* Logo */}
                <Link href="/" onClick={closeMenu} className="text-xl font-bold text-teal-600 hover:text-teal-700 transition shrink-0">
                    Galsen-Ecommerce-Shop
                </Link>

                {/* Barre de recherche desktop */}
                <form
                    onSubmit={handleSearch}
                    className="hidden md:flex flex-1 max-w-sm items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden
                               focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 transition-all duration-200"
                >
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Rechercher un produit..."
                        className="flex-1 bg-transparent px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
                    />
                    <button type="submit" className="px-3 py-2 text-slate-400 hover:text-teal-600 transition-colors" aria-label="Rechercher">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                </form>

                {/* Navigation desktop */}
                <nav className="hidden md:flex items-center gap-5 shrink-0">
                    <Link href="/products" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition">
                        Produits
                    </Link>
                    <Link href="/orders" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition">
                        Mes commandes
                    </Link>

                    {/* Menu déroulant desktop */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen((v) => !v)}
                            className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-teal-600 transition"
                        >
                            Explorer
                            <svg
                                className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute top-full left-0 mt-3 w-52 bg-white rounded-2xl shadow-lg border border-slate-100 py-2 z-50">
                                {DROPDOWN_LINKS.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-teal-600 transition-colors"
                                    >
                                        <svg className="w-4 h-4 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                                        </svg>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </nav>

                {/* Zone droite */}
                <div className="flex items-center gap-3 ml-auto">

                    {/* Panier */}
                    <Link href="/cart" className="relative" onClick={closeMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500 hover:text-teal-600 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {mounted && itemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {itemCount}
                            </span>
                        )}
                    </Link>

                    {/* Auth desktop uniquement */}
                    {!mounted ? null : user ? (
                        <div className="hidden md:flex items-center gap-3">
                            <span className="text-sm text-slate-500">
                                Bonjour, <span className="font-semibold text-slate-800">{user.name}</span>
                            </span>
                            <button onClick={handleLogout} className="text-sm font-medium text-red-400 hover:text-red-600 transition">
                                Déconnexion
                            </button>
                        </div>
                    ) : (
                        <div className="hidden md:flex items-center gap-2">
                            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition">
                                Connexion
                            </Link>
                            <Link href="/register" className="text-sm font-medium bg-teal-500 text-white px-4 py-2 rounded-xl hover:bg-teal-600 transition">
                                S'inscrire
                            </Link>
                        </div>
                    )}

                    {/* Bouton hamburger mobile */}
                    <button
                        onClick={() => setMenuOpen((v) => !v)}
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 text-slate-600 hover:text-teal-600 transition"
                        aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                    >
                        {menuOpen ? (
                            // Icône X quand le menu est ouvert
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            // Icône hamburger (3 lignes)
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Menu mobile déroulant */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">

                    {/* Barre de recherche */}
                    <div className="px-4 pt-4 pb-2">
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden
                                       focus-within:border-teal-400 focus-within:ring-2 focus-within:ring-teal-100 transition-all duration-200"
                        >
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher un produit..."
                                autoFocus
                                className="flex-1 bg-transparent px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none"
                            />
                            <button type="submit" className="px-3 py-2 text-slate-400 hover:text-teal-600 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0118 0z" />
                                </svg>
                            </button>
                        </form>
                    </div>

                    {/* Liens de navigation */}
                    <nav className="px-2 py-2">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeMenu}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-teal-600 transition-colors"
                            >
                                <svg className="w-4 h-4 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                                </svg>
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Section auth mobile */}
                    {mounted && (
                        <div className="px-4 py-4 border-t border-slate-100">
                            {user ? (
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-slate-500">
                                        Bonjour, <span className="font-semibold text-slate-800">{user.name}</span>
                                    </span>
                                    <button
                                        onClick={handleLogout}
                                        className="text-sm font-medium text-red-400 hover:text-red-600 transition"
                                    >
                                        Déconnexion
                                    </button>
                                </div>
                            ) : (
                                <div className="flex gap-3">
                                    <Link
                                        href="/login"
                                        onClick={closeMenu}
                                        className="flex-1 text-center text-sm font-medium border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-50 transition"
                                    >
                                        Connexion
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={closeMenu}
                                        className="flex-1 text-center text-sm font-medium bg-teal-500 text-white px-4 py-2.5 rounded-xl hover:bg-teal-600 transition"
                                    >
                                        S'inscrire
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </header>
    )
}
