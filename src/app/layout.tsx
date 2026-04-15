// layout.tsx - Module 1
// Ce fichier est les "cadre" de toutes tes pages
// {children} represente le contenu de chaque page individuelle

import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer"

// Metadata : informations pour les moteurs de recherche(SEO)
// Next.js les injecte automatiquement dans le <head>

export const metadata: Metadata = {
  title: {
    template: "%s | Mon Portofolio",
    default: "Mon Portofolio"
  },
  description: "Portofolio de developeur web - projets, competences et contact"
};

export default function RootLayout({
  children
}: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {/* Navbar : affichee en haut sur Toutes les pages*/}
        <Navbar />
        { /* "flex: 1 pousse le footer en bas meme si la page est courte" */}
        <main style={{ flex: 1 }}>
          {children}
        </main>
        { /* Footer: affiche en bas sur toutes les pages*/}
        <Footer />
      </body>
    </html>
  )
}
