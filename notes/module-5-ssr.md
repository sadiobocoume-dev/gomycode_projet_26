# Module 5 — Server-Side Rendering

## Les 3 modes de rendu

```
CSR  →  Le navigateur construit la page (React classique)
         Lent au 1er chargement, mauvais SEO.

SSR  →  Le serveur génère le HTML à chaque requête
         Pour les données qui changent souvent (prix, stocks).

SSG  →  Le serveur génère le HTML une fois au build ✅ (notre cas)
         Pages statiques pré-générées → ultra-rapide, SEO parfait.
```

## Server Component `async`
```tsx
// Sans Next.js — on est obligé de passer par useEffect
useEffect(() => { fetch(...).then(setData) }, [])

// Avec Next.js — simple et direct, s'exécute côté serveur
export default async function Page() {
  const data = await getData() // avant d'envoyer le HTML
  return <div>{data.title}</div>
}
```

## Route dynamique `[slug]`
```
src/app/projects/[slug]/page.tsx

/projects/portfolio-nextjs  ──┐
/projects/app-meteo         ──┤── un seul fichier gère toutes ces URLs
/projects/ecommerce-ui      ──┘
```

## `generateStaticParams()` — la fonction la plus importante

### Le problème qu'elle résout
Next.js voit le dossier `[slug]` au build et se pose la question :
**"Quels slugs dois-je pré-générer ?"**
Sans cette fonction, il ne peut pas répondre.

### Ce qu'elle fait
```ts
export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((p) => ({ slug: p.slug }))
  // retourne : [{ slug: "portfolio-nextjs" }, { slug: "app-meteo" }, ...]
}
```
Next.js prend ce tableau et génère une page HTML pour chaque slug au moment du build.

### La timeline
```
SANS generateStaticParams
  Visiteur arrive → serveur génère la page → lent

AVEC generateStaticParams
  Build → 3 pages HTML créées à l'avance
  Visiteur arrive → page HTML déjà prête → instantané
```

### Analogie
Sans : boulanger qui cuit le pain quand le client arrive.
Avec : boulanger qui cuit tous les pains la nuit — tout est prêt à l'ouverture.

## `generateMetadata()` — titre dynamique par page
```ts
export async function generateMetadata({ params }) {
  const project = await getProjectBySlug(params.slug)
  return { title: project.title } // "Portfolio Next.js | Mon Portfolio"
}
```
