# Module 6 — Déploiement Vercel

## Les 3 commandes à connaître
```bash
npm run dev    # développement local (indulgent)
npm run build  # build de production (strict — même chose que Vercel)
npm run start  # lance le build en local pour tester
```
Toujours faire `npm run build` avant de déployer.
Si ça plante en local, ça plantera sur Vercel.

## Déployer
1. Push le code sur GitHub
2. Connecte-toi sur vercel.com avec GitHub
3. "Add New Project" → sélectionne le dépôt
4. Clique "Deploy" — Vercel détecte Next.js automatiquement

Ensuite, chaque `git push` redéploie automatiquement.

## Variables d'environnement
```bash
# .env.local — jamais commité (dans .gitignore)
NEXT_PUBLIC_API_KEY=ma_cle

# Dans le code
process.env.NEXT_PUBLIC_API_KEY
```
Sur Vercel : Dashboard → Settings → Environment Variables.

`NEXT_PUBLIC_` = accessible côté navigateur.
Sans ce préfixe = côté serveur uniquement.

---

## Erreur commise dans ce module

### `::hover` au lieu de `:hover`
```css
.link::hover { }  /* ❌ :: = pseudo-élément (::before, ::after) */
.link:hover  { }  /* ✅ :  = pseudo-classe  (:hover, :focus)    */
```

La distinction :
- `::` cible une **partie** de l'élément (`::before` crée du contenu avant)
- `:`  cible un **état** de l'élément (`:hover` quand la souris passe dessus)

`hover` est un état → toujours `:hover`.

## Checklist avant chaque déploiement
```
□ npm run build passe sans erreurs
□ Toutes les pages s'affichent en local
□ .gitignore contient node_modules/ et .env.local
□ git add . && git commit && git push
```
