// projects/page.tsx
// affiche a l'url "/projects"
// Les donnees sont definies ici pour l'instant
//Au module 5 on les chargera cote serveur depuis un fichier externe
// On ajoute <Image> pour les miniatures de projets.
// "fill" mode :

import type { Metadata } from "next";
import Image from "next/image"
import styles from "./page.module.css"

export const metadata: Metadata = {
    title: "Projects"
};

const projects = [
    {
        id: 1,
        title: "Portfolio Next.js",
        description: "Site portfolio personnel construit avec Next.js 16, TypeScript et CSS Modules.",
        tags: ["Next.js", "TypeScript", "CSS Modules"],
        image: "/project-1.jpg", // ← ajouté
    },
    {
        id: 2,
        title: "App Météo",
        description: "Application météo en temps réel qui consomme une API REST externe.",
        tags: ["React", "API REST", "JavaScript"],
        image: "/project-2.jpg", // ← ajouté
    },
    {
        id: 3,
        title: "E-commerce UI",
        description: "Interface d'une boutique en ligne avec panier et filtres dynamiques.",
        tags: ["React", "Node.js", "MongoDB"],
        image: "/project-3.jpg", // ← ajouté
    },
];

export default function ProjectsPage() {
    return (
        <div className={styles.page}>

            <header className={styles.header}>
                <p className={styles.label}>Projets</p>
                <h1 className={styles.title}>Ce que j&apos;ai construit</h1>
            </header>

            <div className={styles.grid}>
                {projects.map((project) => (
                    <div key={project.id} className={styles.card}>
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

                    </div>
                ))}
            </div>

        </div>
    );
}