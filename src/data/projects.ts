// data/projects.ts
// Source unique de verite pour tous les projets
// Dans un vari projet, ce fetch() irait chercher les donnees 
// depuis une API (Github, Notion, CMS).



export type Project = {
    id: number
    slug: string  // identifiant dans l'url : /projects/portofolio-nextjs
    title: string
    description: string
    longDescription: string
    tags: string[]
    image: string
    github: string
    demo: string
}

// simule une source de donnees externe
const projects: Project[] = [
    {
        id: 1,
        slug: "portfolio-nextjs",
        title: "Portfolio Next.js",
        description: "Site portfolio personnel construit avec Next.js 16, TypeScript et CSS Modules.",
        longDescription:
            "Ce projet est un site portfolio complet construit avec Next.js 16. " +
            "Il utilise l'App Router, le Server-Side Rendering, les CSS Modules " +
            "et le composant Image optimisé de Next.js. Déployé sur Vercel.",
        tags: ["Next.js", "TypeScript", "CSS Modules"],
        image: "/project-1.jpg",
        github: "https://github.com",
        demo: "https://vercel.com",
    },
    {
        id: 2,
        slug: "app-meteo",
        title: "App Météo",
        description: "Application météo en temps réel qui consomme une API REST externe.",
        longDescription:
            "Application météo qui consomme l'API OpenWeatherMap. " +
            "L'utilisateur peut rechercher n'importe quelle ville et voir " +
            "les prévisions sur 5 jours avec des icônes dynamiques.",
        tags: ["React", "API REST", "JavaScript"],
        image: "/project-2.jpg",
        github: "https://github.com",
        demo: "https://vercel.com",
    },
    {
        id: 3,
        slug: "ecommerce-ui",
        title: "E-commerce UI",
        description: "Interface d'une boutique en ligne avec panier et filtres dynamiques.",
        longDescription:
            "Interface complète d'une boutique en ligne avec système de panier, " +
            "filtres par catégorie et tri par prix. Construit avec React et " +
            "une API Node.js/MongoDB en backend.",
        tags: ["React", "Node.js", "MongoDB"],
        image: "/project-3.jpg",
        github: "https://github.com",
        demo: "https://vercel.com",
    },
];

// Fonction qui simule un fetch asynchrone
// dans un vrai projet : export async function getProjects() { return await fetch}

export async function getProjects(): Promise<Project[]> {
    return projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
    return projects.find((p) => p.slug === slug);
}