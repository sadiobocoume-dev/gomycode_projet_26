// projects/[slug]/page.tsx- Module 5
// chaque page projet charge ses donnes depuis Mongodb
// le compteur de vues s'increment a chaque visite


import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link"
import { connectDB } from "@/lib/mongodb"
import Projet from "@/models/projet"
import styles from "./page.module.css"

// pre-genere les page au build depuis MongoDB
//Next.js appelera cette page pour chaque slug retourne
export async function generateStaticParams() {
    await connectDB()
    const projets = await Projet.find({ publie: true }).lean()
    // Retourne un tableau d'objets { slug: "..."}
    return projets.map((p) => ({ slug: p.slug }))
}

// genere les metadonnes dynamiquement selon le projet

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    await connectDB();
    const projet = await Projet.findOne({ slug }).lean();
    return {
        title: projet?.titre ?? "Projet introuvable",
    };
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    await connectDB();

    // Recupere le projet Et incremente les vues en une seule requete
    // {new:true} retourne le document avec modificarion
    const projet = await Projet.findOneAndUpdate(
        { slug },
        { $inc: { vues: 1 } },
        { returnDocument: 'after' }
    ).lean();
    // si le slug n'existe pas , affiche un message d'erreur
    if (!projet) {
        return (
            <div className={styles.page}>
                <p>Projet introuvable.</p>
                <Link href={"/projects"}>Retour aux projets</Link>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            {/* Bouton retour */}
            <Link href={"/projects"} className={styles.back}>
                Retour aux projets
            </Link>

            {/* Image principale */}

            <div className={styles.imageWrapper}>
                <Image
                    src={projet.image}
                    alt={projet.titre}
                    fill
                    className={styles.image}
                    priority
                    sizes="(max-width: 768px) 100vw, 900px"
                />
            </div>

            {/* Contenu */}
            <div className={styles.content}>
                <h1 className={styles.title}>{projet.titre}</h1>

                {/* Compteur de vues */}
                <p style={{ color: "var(--color-text-muted)", marginBottom: "1rem" }}>
                    {projet.vues} vue{projet.vues > 1 ? "s" : ""}
                </p>

                <div className={styles.tags}>
                    {(projet.tags as string[]).map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                </div>

                <p className={styles.description}>{projet.longDescription}</p>

                {/* Liens */}
                <div className={styles.links}>
                    <a
                        href={projet.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btnSecondary}
                    >
                        GitHub
                    </a>
                    <a
                        href={projet.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btnPrimary}
                    >
                        Voir la demo
                    </a>
                </div>
            </div>

        </div>
    );
}