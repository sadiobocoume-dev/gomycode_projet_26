//projects/[slug]/page.tsx - module 5
// Route dynamique : /projects/portofolio-nextjs, /projects/app-meteo, etc
//
// "generationStaticParams" : dit a Next.js quelles page genere au build
// sans cette fonction , Next.js genererait les pages a la demande(SSR).
// Avec elle , elle sont pre-generes a l'avance(SSG) ultr-rapide.

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link"
import { getProjects, getProjectBySlug } from "@/data/projects"
import styles from "./page.module.css"

// Genere les parametres statiques au build
//Next.js appelera cette page pour chaque slug retourne
export async function generateStaticParams() {
    const projects = await getProjects();
    // Retourne un tableau d'objets { slug: "..."}
    return projects.map((p) => ({ slug: p.slug }))
}

// genere les metadonnes dynamiquement selon le projet

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);
    return {
        title: project?.title ?? "Projet introuvable",
    };
}

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const project = await getProjectBySlug(slug);
    // si le slug n'existe pas , affiche un message d'erreur
    if (!project) {
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
                    src={project.image}
                    alt={project.title}
                    fill
                    className={styles.image}
                    priority
                    sizes="(max-width: 768px) 100vw, 900px"
                />
            </div>

            {/* Contenu */}
            <div className={styles.content}>
                <h1 className={styles.title}>{project.title}</h1>

                <div className={styles.tags}>
                    {project.tags.map((tag) => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                </div>

                <p className={styles.description}>{project.longDescription}</p>

                {/* Liens */}
                <div className={styles.links}>
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btnSecondary}
                    >
                        GitHub
                    </a>
                    <a
                        href={project.demo}
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