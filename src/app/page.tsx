// page.tsx - Module 1
// Affichr a l'url "/"
// C'est un serveur component(pas de "use client": s'execute cote serveur)

import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import styles from "./page.module.css"

export const metadata: Metadata = {
  title: "Accueil"
};

// chaque page peut exporter ses propres metadonnees 
// Next.js les fusionne avec celles de  layout.tsx

export default function HomePage() {
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
            { /* Boutons d'actions */}
            <div>
              <Link href="/projects" className={styles.btnPrimary}>
                Voir mes projets
              </Link>
              <Link href="/contact" className={styles.btnSecondary}>
                Me contacter
              </Link>
            </div>
          </div>

          {/* Enfant 2 - colonne droite : photo */}
          <div className={styles.photowrapper}>
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