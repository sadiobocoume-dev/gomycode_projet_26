// about/page.tsx
// affiche a l'URL: "/about" 
// Note : pas besoin de configurer cette route nulle part
//Next.js cree automatiquement grace au nom du dossier

import type { Metadata } from "next";
import styles from "./page.module.css"

export const metadata: Metadata = {
    title: "À propos"
}

// Donnees centralisee facile a modifier
const skills = [
    "HTML / CSS", "JavaScript", "TypeScript",
    "React", "Next.js", "Node.js",
    "Git", "Figma", "REST API",
];

export default function AboutPage() {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <p className={styles.label}>A propos</p>
                <h1 className={styles.title}>Qui suis-je</h1>
            </header>
            <div className={styles.grid}>
                {/* colonne gauche : biographie */}
                <div className={styles.bio}>
                    <p>
                        Je suis un développeur web passionné, spécialisé dans la création
                        d&apos;interfaces modernes et performantes. J&apos;aime transformer
                        des idées complexes en expériences utilisateur simples et élégantes.
                    </p>
                    <p>
                        Mon parcours m&apos;a amené à travailler sur des projets variés,
                        du développement front-end en React/Next.js jusqu&apos;à la mise
                        en place d&apos;APIs avec Node.js.
                    </p>
                    <p>
                        En dehors du code, je m&apos;intéresse a la meditation du Coran
                        et a l&apos;etude de la langue arabe.
                    </p>
                </div>
                {/* colonne droite : competences  */}
                <div>
                    <h2 className={styles.skillsTitle}>Mes competences</h2>
                    <div className={styles.skills}>
                        {skills.map((skill) => (
                            <span key={skill} className={styles.skill}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}