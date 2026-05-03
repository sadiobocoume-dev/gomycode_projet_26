// layout.tsx = le fichier le plus important de l'app Next.js
// Il enveloppe TOUTES les pages sans exception
// Next.js garantit qu'il ne se démonte jamais lors de la navigation
// → le Header ne clignote pas quand tu changes de page

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
})

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
})

// metadata = balises <title> et <meta description> générées par Next.js
// Importantes pour le SEO — Google lit ces informations
export const metadata: Metadata = {
    title: 'Galsen-Ecommerce-Shop',
    description: 'Découvrez nos produits au meilleur prix — La boutique en ligne sénégalaise',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode // children = la page courante injectée par Next.js
}>) {
    return (
        <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

            {/* min-h-screen flex flex-col
                → le body occupe au minimum toute la hauteur de l'écran
                → les enfants s'empilent verticalement
                C'est ce qui permet au Footer de toujours rester en bas */}
            <body className="min-h-screen flex flex-col bg-sky-50 overflow-x-hidden">

                <Header />

                {/* flex-1 → le main prend tout l'espace disponible
                    entre Header et Footer
                    Peu importe si la page a peu de contenu, le Footer reste en bas */}
                <main className="flex-1">
                    {children}
                </main>

                <Footer />

            </body>
        </html>
    )
}
