# Module 3 — CSS Modules

## L'idée centrale
Chaque fichier `.module.css` est isolé.
La classe `.card` dans `projects/page.module.css` ne conflicte jamais
avec une classe `.card` dans un autre fichier.
Next.js génère un nom unique automatiquement : `card_xK9mP`.

## Utilisation
```tsx
import styles from "./page.module.css"

<div className={styles.card}>        // une classe
<div className={`${styles.card} ${styles.featured}`}>  // deux classes
<div className={`${styles.card} ${isActive ? styles.active : ""}`}> // conditionnelle
```

## Variables CSS
Définies dans `globals.css`, utilisables partout :
```css
:root { --color-primary: #6c63ff; }

/* Dans n'importe quel .module.css */
color: var(--color-primary);
```

## `clamp()` — responsive sans media query
```css
font-size: clamp(1.5rem, 4vw, 3rem);
/*               min    préféré  max  */
```
S'adapte automatiquement à la taille de l'écran.

---

## Erreurs commises dans ce module

### 1. `display: grid` oublié
```css
/* ❌ grid-template-columns est ignoré sans display: grid */
.grid {
  grid-template-columns: 1fr 1fr;
}

/* ✅ */
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
```
Même logique pour flexbox : `justify-content` sans `display: flex` = ignoré.

### 2. Deux classes avec le même nom dans un fichier
```css
/* ❌ La deuxième définition écrase la première silencieusement */
.label { color: var(--color-primary); }  /* badge */
...
.label { color: var(--color-text); }     /* label formulaire */
```
Solution : donner des noms distincts. Ex: `.label` et `.fieldLabel`.

### 3. Classe utilisée dans le TSX mais absente du CSS
```tsx
<input className={styles.input} />  // styles.input = undefined
```
Le navigateur n'affiche aucune erreur — il applique juste aucun style.
Toujours vérifier que la classe existe dans le `.module.css` correspondant.
