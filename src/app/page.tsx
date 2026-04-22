// page.tsx - Module 1
// Affichr a l'url "/"
// C'est un serveur component(pas de "use client": s'execute cote serveur)

import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Projet from "@/models/projet"
import styles from "./page.module.css"
import { connectDB } from "@/lib/mongodb"


export const metadata: Metadata = {
  title: "Accueil"
};

// chaque page peut exporter ses propres metadonnees 
// Next.js les fusionne avec celles de  layout.tsx

export default async function HomePage() {
  await connectDB();

  const stats = await Projet.aggregate([
    {
      $group: {
        _id: null,
        totalProjets: { $sum: 1 },
        totalVues: { $sum: "$vues" },

      }
    }
  ])

  const { totalProjets, totalVues } = stats[0] ?? { totalProjets: 0, totalVues: 0 }

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        {/* badge decoratif */}
        <span className={styles.badge}>Disponible pour des missions</span>
        {/* heroInner = flex container avec 2 enfants: texte + photo */}
        <div className={styles.heroInner}>
          {/* Enfant 1 - colonne gauche : texte */}
          <div>
            <h1 className={styles.title}>
              Bonjour, je suis{" "}
              <span className={styles.highlight}>Sadio</span>
              <br />
              Developpeur Web
            </h1>
            <p className={styles.subtitle}>
              Je conçois des interfaces web modernes avec Next.js, React et TypeScript.
              Passionné par la performance et l&apos;expérience utilisateur.
            </p>

            {/* stats dynamiques depuis MongoDB*/}
            <div style={{ display: "flex", gap: "2rem", margin: "1.5rem 0" }}>

              <div>
                <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--color-primary)" }}>
                  {totalProjets}
                </p>
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                  Projets
                </p>
              </div>

              <div>
                <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--color-primary)" }}>
                  {totalVues}
                </p>
                <p style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                  Vues totales
                </p>
              </div>

            </div>
            { /* Boutons d'actions */}
            <div className={styles.actions}>
              <Link href="/projects" className={styles.btnPrimary}>
                Voir mes projets
              </Link>
              <Link href="/contact" className={styles.btnSecondary}>
                Me contacter
              </Link>
            </div>
          </div>

          {/* Enfant 2 - colonne droite : photo */}
          <div className={styles.photoWrapper}>
            <Image
              src="/profile.jpg"
              alt="Photo"
              width={220}
              height={220}
              className={styles.photo} />
          </div>


        </div>
      </div>
    </section>
  );
}