# Déploiement du Portfolio Maurice Hermanns

## 🚀 Déploiement sur Vercel (Recommandé)

### Option 1: Deploy automatique via GitHub

1. **Push sur GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: Portfolio Maurice Hermanns"
git branch -M main
git remote add origin https://github.com/votre-username/maurice-portfolio.git
git push -u origin main
```

2. **Connecter Vercel:**
- Aller sur [vercel.com](https://vercel.com)
- Connecter votre compte GitHub
- Importer le repository
- Déploiement automatique ! ✨

### Option 2: Deploy direct via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

## 🌐 Autres plateformes de déploiement

### Netlify
```bash
# Build
npm run build

# Upload du dossier .next sur Netlify
```

### Railway
```bash
# Connecter Railway
npm i -g @railway/cli
railway login
railway init
railway up
```

### Surge.sh (pour sites statiques)
```bash
# Export static
npm run build
npm run export

# Deploy sur Surge
npm i -g surge
surge ./out
```

## ⚙️ Variables d'environnement

Si vous ajoutez des variables d'environnement, créez un fichier `.env.local`:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://votre-domaine.com
NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID
```

## 🔧 Configuration de domaine personnalisé

### Sur Vercel:
1. Aller dans Settings > Domains
2. Ajouter votre domaine
3. Configurer les DNS selon les instructions

### Configuration DNS typique:
```
A Record: @ → 76.76.21.21
CNAME: www → cname.vercel-dns.com
```

## 📊 Monitoring et Analytics

### Google Analytics (recommandé)
1. Créer un compte GA4
2. Ajouter le Measurement ID dans `.env.local`
3. Installer le script de tracking

### Vercel Analytics
```bash
npm i @vercel/analytics
```

Puis ajouter dans `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 🛠️ Optimisations post-déploiement

### Compression d'images
- Utiliser next/image pour l'optimisation automatique
- Formats WebP/AVIF générés automatiquement

### Performance monitoring
- Lighthouse CI pour les tests automatiques
- Web Vitals tracking avec Vercel

### SEO
- Sitemap automatique avec next-sitemap
- Meta tags optimisées (déjà configurées)
- Structure données JSON-LD

## 🔒 Sécurité

- Headers de sécurité configurés dans `next.config.js`
- CSP (Content Security Policy) recommandé
- HTTPS automatique sur Vercel

## 📈 Mise à jour continue

### Workflow recommandé:
```bash
# Développement local
npm run dev

# Test de build
npm run build
npm run start

# Push et deploy automatique
git add .
git commit -m "Update: description des changements"
git push origin main
```

Le site sera automatiquement redéployé sur Vercel ! 🚀

## 📞 Support

Pour toute question technique:
- Documentation Next.js: https://nextjs.org/docs
- Documentation Vercel: https://vercel.com/docs
- GSAP Documentation: https://greensock.com/docs/