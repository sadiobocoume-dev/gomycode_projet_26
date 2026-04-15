//contact/page.tsx
//affiche a l'url: "contact/"
// le formulaire est "statique pour l'instant"(pas de logique d'envoi)
// C'est un serveur component - on garde "use client" pour plus tard -Module 3
//si on ajoute useState pour gerer l'envoi
import styles from "./page.module.css"


import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "contact"
};

export default function ContactPage() {
    return (
        <div className={styles.page}>
            <p className={styles.label}>Contact</p>
            <h1 className={styles.title}>Travaillons ensemble</h1>
            <p className={styles.subtitle}>
                Tu as un projet en tete ? N&apos;hesite pas a m&apos;ecrire,
                je reponds sous 24h.
            </p>

            <form className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor="name" className={styles.fieldLabel}>Nom</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Ton nom"
                        className={styles.input}
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="email" className={styles.fieldLabel}>Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="ton@email.com"
                        className={styles.input}
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="message" className={styles.fieldLabel}>Message</label>
                    <textarea
                        id="message"
                        placeholder="Décris ton projet..."
                        className={styles.textarea}
                    />
                </div>

                <button type="submit" className={styles.submit}>
                    Envoyer le message
                </button>
            </form>
        </div>
    )
}