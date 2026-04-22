//contact/page.tsx
//affiche a l'url: "contact/"
// le formulaire est "statique pour l'instant"(pas de logique d'envoi)
// C'est un serveur component - on garde "use client" pour plus tard -Module 3
//si on ajoute useState pour gerer l'envoi
"use client"
import { useState } from "react"
import styles from "./page.module.css"


export default function ContactPage() {
    const [form, setForm] = useState({ nom: "", email: "", message: "" })
    const [statut, setStatut] = useState<"idle" | "loading" | "error" | "success">("idle")

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setStatut("loading")
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(form)
            })
            if (res.ok) {
                setStatut("success")
                setForm({ nom: "", email: "", message: "" })
            } else {
                setStatut("error")
            }
        } catch {
            setStatut("error")
        }

    }
    return (
        <div className={styles.page}>
            <p className={styles.label}>Contact</p>
            <h1 className={styles.title}>Travaillons ensemble</h1>
            <p className={styles.subtitle}>
                Tu as un projet en tete ? N&apos;hesite pas a m&apos;ecrire,
                je reponds sous 24h.
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label htmlFor="name" className={styles.fieldLabel}>Nom</label>
                    <input
                        name="nom"
                        type="text"
                        placeholder="Ton nom"
                        className={styles.input}
                        value={form.nom}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="email" className={styles.fieldLabel}>Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="ton@email.com"
                        className={styles.input}
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="message" className={styles.fieldLabel}>Message</label>
                    <textarea
                        name="message"
                        placeholder="Décris ton projet..."
                        className={styles.textarea}
                        value={form.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                {/* Message de statut */}
                {statut === "success" && (
                    <p style={{ color: "var(--color-primary)" }}>
                        Message envoyé avec succès ✅
                    </p>
                )}
                {statut === "error" && (
                    <p style={{ color: "red" }}>
                        Une erreur est survenue. Réessaie.
                    </p>
                )}
                <button type="submit"
                    className={styles.submit}
                    disabled={statut === "loading"}
                >
                    {statut === "loading" ? "Envoi en cours..." : "Envoyer le Message"}
                </button>
            </form>
        </div>
    )
}