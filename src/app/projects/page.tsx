//projects/page.tsx
// Les donnees viennent maintenant de MongoDB
// au lieu du fichier statique src/data/projects.ts
import type { Metadata } from "next";
import Image from "next/image"
import Link from "next/link"
import { connectDB } from "@/lib/mongodb"
import Projet from "@/models/projet"
import styles from "./page.module.css"

export const metadata: Metadata = {
    title: "Projects"
};

// "async" permet d'utiliser await directement dans le composant




export default async function ProjectsPage() {
    // Les donnees sont charges sur le serveur, Avant d'envoyer le HTML
    // Le navigateur recoit une page deja construite, SEO parfait

    await connectDB()
    // recupere tous les projest publies dpuis MongoDB
    // .lean() retourne du json Simple - obligatoire ds Next.js
    // .sort avec la valeur _1 trie le projet de facon decroissante
    const projets = await Projet.find({ publie: true })
        .sort({ createdAt: -1 })
        .lean()// retourne du Json simple, pas un objet mongoose

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <p className={styles.label}>Projets</p>
                <h1 className={styles.title}>Ce que j&apos;ai construit</h1>
            </header>

            <div className={styles.grid}>
                {projets.map((projet) => (
                    <Link
                        key={projet._id.toString()}
                        href={`/projects/${projet.slug}`}
                        className={styles.card}
                    >
                        <div className={styles.imageWrapper}>
                            <Image
                                src={projet.image}
                                alt={`Aperçu de ${projet.titre}`}
                                fill
                                className={styles.cardImage}
                                priority
                                sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw"
                            />
                        </div>

                        <div className={styles.cardBody}>
                            <h2 className={styles.cardTitle}>{projet.titre}</h2>
                            <p className={styles.cardDesc}>{projet.description}</p>
                            <div className={styles.tags}>
                                {(projet.tags as string[]).map((tag) => (
                                    <span key={tag} className={styles.tag}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}