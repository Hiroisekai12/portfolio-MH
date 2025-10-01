# Maurice Portfolio React

Portfolio moderne et performant construit avec Next.js 14, TypeScript, Tailwind CSS et animations GSAP sophistiquées.

## 🚀 Technologies

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** GSAP (ScrollTrigger, TextPlugin, ScrollToPlugin)
- **Performance:** Optimisations bundle, lazy loading, compression
- **Development:** ESLint, Prettier, Hot Reload

## ✨ Fonctionnalités

- ✅ Design minimaliste et épuré (noir/blanc)
- ✅ Animations GSAP premium (dignes des sites AWWWARDS)
- ✅ Cursor magnétique personnalisé
- ✅ Loader animé avec transition fluide
- ✅ Navigation responsive avec menu mobile
- ✅ Scroll smooth et effets parallax
- ✅ Text reveal animations mot par mot
- ✅ Hover effects sophistiqués
- ✅ Compteurs animés
- ✅ Timeline d'expérience interactive
- ✅ Barres de progression pour compétences/langues
- ✅ Cards avec effets de levitation
- ✅ Optimisations de performance
- ✅ SEO optimisé
- ✅ Entièrement responsive

## 🏃‍♂️ Installation et démarrage rapide

```bash
# Installer les dépendances
npm install

# Démarrer en mode développement
npm run dev

# Build pour production
npm run build

# Démarrer en mode production
npm start

# Linting
npm run lint

# Analyser le bundle
npm run analyze
```

## 📁 Structure du projet

```
maurice-portfolio-react/
├── app/                    # App Router Next.js 14
│   ├── globals.css        # Styles globaux + Tailwind
│   ├── layout.tsx         # Layout principal avec métadonnées
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React
│   ├── sections/          # Sections du portfolio
│   │   ├── Hero.tsx       # Section héro avec géométries
│   │   ├── About.tsx      # À propos + compétences
│   │   ├── Technologies.tsx # Technologies groupées
│   │   ├── Languages.tsx  # Langues avec drapeaux
│   │   ├── Stats.tsx      # Statistiques animées
│   │   ├── Experience.tsx # Timeline d'expérience
│   │   ├── Passions.tsx   # Passions et intérêts
│   │   ├── Certifications.tsx # Certifications
│   │   ├── Projects.tsx   # Projets avec hover effects
│   │   ├── Goals.tsx      # Objectifs de carrière
│   │   └── Contact.tsx    # Contact avec liens
│   ├── Loader.tsx         # Loader animé
│   ├── Cursor.tsx         # Cursor magnétique
│   ├── Navigation.tsx     # Navigation responsive
│   └── Footer.tsx         # Footer minimaliste
├── hooks/                 # Hooks personnalisés
│   └── useMagnetic.ts     # Hook pour effets magnétiques
├── next.config.js         # Configuration Next.js
├── tailwind.config.js     # Configuration Tailwind
└── package.json           # Dépendances et scripts
```

## 🎨 Animations et effets

### Animations GSAP implémentées:
- **Hero:** Text reveal avec stagger, géométries flottantes, parallax
- **About:** Animation mot par mot, barres de progression dynamiques
- **Technologies:** Tags avec hover effects sophistiqués
- **Langues:** Barres de progression avec drapeaux
- **Stats:** Compteurs animés déclenchés au scroll
- **Experience:** Timeline avec animations slide-in
- **Projets:** Hover fill effects fluides
- **Contact:** Text reveals et liens magnétiques

### Interactions:
- Cursor magnétique global
- Navigation qui disparaît/réapparaît au scroll
- Smooth scroll pour tous les liens d'ancrage
- Hover effects sur tous les éléments interactifs
- Transitions fluides entre sections

## 🔧 Optimisations de performance

- **Bundle splitting:** Composants et librairies optimisés
- **Lazy loading:** Images et sections chargées à la demande
- **GSAP optimisé:** Plugins importés uniquement si nécessaire
- **Compression:** Gzip activé en production
- **Fonts optimisées:** Google Fonts avec display swap
- **SEO:** Métadonnées complètes et structure sémantique
- **Responsive:** Design mobile-first

## 🌐 Compatibilité

- ✅ Chrome/Edge (moderne)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile (iOS/Android)
- ✅ Tablet
- ✅ Desktop

## 📱 Responsive Design

Le site s'adapte parfaitement à tous les écrans:
- **Mobile:** Menu hamburger, layout vertical
- **Tablet:** Grids adaptées, navigation optimisée
- **Desktop:** Layout complet avec tous les effets

## 🚀 Déploiement

Le projet est prêt pour le déploiement sur:
- **Vercel** (recommandé pour Next.js)
- **Netlify**
- **AWS Amplify**
- **Railway**
- **Surge.sh**

```bash
# Build de production
npm run build

# Le dossier .next/ contient l'application optimisée
```

## 🎯 Performance attendue

- **Lighthouse Score:** 95+ (Performance, Accessibility, SEO)
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Cumulative Layout Shift:** < 0.1
- **Time to Interactive:** < 3s

Ce portfolio respecte toutes les meilleures pratiques modernes et offre une expérience utilisateur premium digne des sites primés sur AWWWARDS ! 🏆