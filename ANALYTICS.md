# Analytics & Performance Monitoring

Ce portfolio utilise **Vercel Analytics** et **Speed Insights** pour un monitoring complet des performances et du comportement utilisateur.

## 🔧 Configuration

### Composants installés :
- `@vercel/analytics` - Tracking des visiteurs et événements
- `@vercel/speed-insights` - Métriques de performance en temps réel

### Fichiers principaux :
- `components/VercelAnalytics.tsx` - Composant d'intégration
- `components/Analytics.tsx` - Google Analytics (optionnel)
- `hooks/useAnalytics.ts` - Hook personnalisé pour événements

## 📊 Métriques automatiques

### Vercel Analytics collecte :
- **Page views** - Vues de pages automatiques
- **Unique visitors** - Visiteurs uniques
- **Referrers** - Sources de trafic
- **Geolocation** - Localisation des visiteurs

### Speed Insights surveille :
- **Core Web Vitals** (LCP, FID, CLS)
- **Time to First Byte** (TTFB)
- **First Contentful Paint** (FCP)
- **Performance Score** en temps réel

## 🎯 Événements personnalisés

Utilise le hook `useAnalytics()` pour tracker des interactions spécifiques :

```tsx
import { useAnalytics } from '@/hooks/useAnalytics'

function ProjectCard({ project }) {
  const { trackProjectView } = useAnalytics()
  
  const handleClick = () => {
    trackProjectView(project.name, project.technology)
  }
  
  return <div onClick={handleClick}>...</div>
}
```

### Événements disponibles :

- `trackProjectView(name, tech)` - Vue d'un projet
- `trackSectionView(section)` - Vue d'une section
- `trackContactSubmit(type)` - Soumission formulaire
- `trackExternalLink(url, context)` - Clic lien externe
- `trackCVDownload(format)` - Téléchargement CV
- `trackMagneticInteraction(element)` - Interaction curseur

## 🚀 Déploiement

### Production automatique :
1. Deploy sur **Vercel** avec `vercel --prod`
2. Analytics **activés automatiquement**
3. Dashboard accessible dans Vercel

### Pas de configuration requise :
- Vercel Analytics s'active automatiquement
- Speed Insights fonctionne out-of-the-box
- Dashboard temps réel disponible

## 📈 Dashboard & Insights

### Métriques visibles :
- **Visitors** - Nombre de visiteurs uniques
- **Page Views** - Vues de pages totales
- **Top Pages** - Pages les plus visitées
- **Countries** - Répartition géographique
- **Referrers** - Sources de trafic
- **Performance Score** - Note de performance
- **Core Web Vitals** - Métriques de vitesse

### Accès :
1. Dashboard Vercel → Project → Analytics tab
2. Real-time insights during navigation
3. Historical data and trends

## 🎛️ Configuration avancée (optionnel)

### Variables d'environnement :
```env
# Google Analytics (optionnel)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Événements personnalisés avancés :
```tsx
const { trackEvent } = useAnalytics()

// Événement personnalisé
trackEvent('custom_interaction', {
  feature: 'magnetic_cursor',
  position: 'header',
  duration: 1200
})
```

## ✅ Avantages

- **Zero config** - Fonctionne automatiquement
- **Privacy-focused** - Conforme RGPD
- **Real-time** - Métriques instantanées
- **No impact** - Performance optimale
- **Professional** - Dashboard complet

Le portfolio est maintenant équipé d'un système d'analytics professionnel pour optimiser l'expérience utilisateur ! 🎯