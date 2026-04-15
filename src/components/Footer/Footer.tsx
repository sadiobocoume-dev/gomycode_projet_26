// Footer.tsx — Module 2
// Pas de "use client" ici car on n'utilise pas de hooks.
// C'est un Server Component — plus performant.

import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <ul className={styles.links}>
                <li>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                </li>
                <li>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                </li>
                <li>
                    <Link href="/contact">Contact</Link>
                </li>
            </ul>
            <p>© {currentYear} MonPortfolio — Construit avec Next.js</p>
        </footer>
    );
}
