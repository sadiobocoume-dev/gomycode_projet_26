//Navbar.tsx
//"use client" est obligatoire ici car on utilise usePathname(),
// un hook react qui ne peut  s'executer que dans le navigateur'

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";


// Donnees de naviagtion centralisee dans un tableau.
//Pour ajouter une page, il suffit d'ajouter un objet ici.

const navLinks = [
    { href: "/", label: "Accueil" },
    { href: "/about", label: "A propos" },
    { href: "/projects", label: "Projets" },
    { href: "/contact", label: "Contact" }
];

export default function Navbar() {
    // usePathname() retourne l'Url courante, ex: "/about"
    const pathname = usePathname();
    return (
        <header className={styles.navbar}>
            <div className={styles.inner}>
                {/*logo cliquable qui remvoie a l'accueil*/}
                <Link href="/" className={styles.logo}>
                    &lt;MonPortfolio /&gt;
                </Link>
                {/* Navigation principal */}
                <nav>
                    <ul className={styles.nav}>
                        {navLinks.map((link) => {
                            // on compare l'URL avec le href du lien
                            const isActive = pathname === link.href
                            return (
                                <li key={link.href}>
                                    <Link href={link.href}
                                        // si le lien est active on ajoute la classe "active"
                                        // en  plus de la classe "link" de base
                                        className={`${styles.link} ${isActive ? styles.active : ""}`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
}