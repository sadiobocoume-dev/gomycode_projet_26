// projects/page.tsx
// affiche a l'url "/projects"
// Les donnees sont definies ici pour l'instant
//Au module 5 on les chargera cote serveur depuis un fichier externe
// On ajoute <Image> pour les miniatures de projets.
// "fill" mode :
// Module 5 "async" : ce composant s'execute cote serveur et peut await des donnees.
// Next.js genere cette page Une fpis au build(SSG par defaut)
import type { Metadata } from "next";
import Image from "next/image"
import Link from "next/link"
import styles from "./page.module.css"
import { getProjects } from "@/data/projects";


export const metadata: Metadata = {
    title: "Projects"
};

// "async" permet d'utiliser await directement dans le composant




export default async function ProjectsPage() {
    // Les donnees sont charges sur le serveur, Avant d'envoyer le HTML
    // Le navigateur recoit une page deja construite, SEO parfait
    const projects = await getProjects();
    return (
        <div className={styles.page}>

            <header className={styles.header}>
                <p className={styles.label}>Projets</p>
                <h1 className={styles.title}>Ce que j&apos;ai construit</h1>
            </header>

            <div className={styles.grid}>
                {projects.map((project) => (
                    // Link sur toute la carte , navige vers /projects/[slug]
                    <Link key={project.id} href={`/projects/${project.slug}`} className={styles.card}>

                        {/* Conteneur de l'image - position: relative obligatoire pour fill */}
                        <div className={styles.imageWrapper}>
                            <Image
                                src={project.image}
                                alt={`Apercu du projet ${project.title}`}
                                fill     // remplit le conteneur parent
                                className={styles.cardImage}
                                sizes="(max-width:600px) 100vw, (max-width:900px) 50vw, 33vw"
                            // "sizes" indique a next.js a choisir la bonne taille d'image
                            // selon la largeur de l'ecran : economie de bande passante
                            />
                        </div>
                        <div className={styles.cardBody}>
                            <h2 className={styles.cardTitle}>{project.title}</h2>
                            <p className={styles.cardDesc}>{project.description}</p>
                            <div className={styles.tags}>
                                {project.tags.map((tag) => (
                                    <span key={tag} className={styles.tag}>{tag}</span>
                                ))}
                            </div>
                        </div>


                    </Link>
                ))}
            </div>

        </div>
    );
}