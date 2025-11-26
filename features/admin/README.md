# Feature Admin - SuribassMusic

## 📋 Vue d'ensemble

La feature Admin fournit un dashboard complet pour gérer la plateforme SuribassMusic, incluant :

- **Statistiques globales** avec refresh automatique toutes les minutes
- **Queue de modération** des commentaires avec suggestions IA
- **Gestion des scores** avec recalcul en masse
- **Graphiques** et visualisations des données

## 🏗️ Architecture

```
features/admin/
├── api/
│   ├── admin.api.ts          # Fonctions API
│   └── admin.types.ts        # Types TypeScript
├── components/
│   ├── StatsCard.tsx         # Card de statistique
│   ├── GlobalStatsGrid.tsx   # Grid de stats
│   ├── TopCategoriesChart.tsx # Graphique catégories
│   ├── TopPartnersTable.tsx  # Table top partenaires
│   ├── ModerationQueue.tsx   # Queue de modération
│   ├── ModerationItem.tsx    # Item de modération
│   └── ScoreRefreshButton.tsx # Bouton recalcul
├── hooks/
│   ├── useGlobalStats.ts     # Hook stats globales
│   ├── useModerationQueue.ts # Hook queue modération
│   ├── useModerateComment.ts # Hook mutation modération
│   └── useRefreshScores.ts   # Hook recalcul scores
├── schemas/
│   └── admin.schema.ts       # Schémas Zod
└── index.ts                  # Barrel exports
```

## 🔒 Protection des routes

Toutes les pages admin sont protégées avec `AuthGuard` :

```tsx
<AuthGuard roles={["Admin"]}>
  {children}
</AuthGuard>
```

Seuls les utilisateurs avec le rôle **Admin** peuvent accéder.

## 📖 Utilisation

### Accéder au dashboard admin

```
/admin           → Dashboard avec stats
/admin/moderation → Queue de modération
```

### Hooks disponibles

#### useGlobalStats
```tsx
import { useGlobalStats } from "@/features/admin"

const { stats, isLoading, isError, mutate } = useGlobalStats()
// Auto-refresh toutes les 60 secondes
```

#### useModerationQueue
```tsx
import { useModerationQueue } from "@/features/admin"

const { moderation, isLoading, mutate } = useModerationQueue({
  pageIndex: 1,
  pageSize: 20
})
```

#### useModerateComment
```tsx
import { useModerateComment } from "@/features/admin"

const { moderate, isLoading, error } = useModerateComment()

await moderate(commentId, {
  status: 'Approved', // ou 'Rejected'
  reason: 'Raison optionnelle'
})
```

#### useRefreshScores
```tsx
import { useRefreshScores } from "@/features/admin"

const { refresh, isLoading, result } = useRefreshScores()

const response = await refresh()
// Processus lancé en background
```

## 🎨 Composants

### GlobalStatsGrid
Affiche toutes les statistiques principales dans une grille responsive.

```tsx
<GlobalStatsGrid stats={stats} />
```

### TopCategoriesChart
Graphique en barres des catégories les plus populaires.

```tsx
<TopCategoriesChart data={stats.topCategories} />
```

### TopPartnersTable
Table des partenaires avec le plus de vues.

```tsx
<TopPartnersTable data={stats.topPartners} />
```

### ModerationQueue
Liste paginée des commentaires à modérer avec actions.

```tsx
<ModerationQueue />
```

### ScoreRefreshButton
Bouton avec confirmation pour recalculer tous les scores.

```tsx
<ScoreRefreshButton />
```

## 📡 Endpoints API

### GET /admin/stats
Récupère les statistiques globales.

**Response:**
```typescript
{
  totalUsers: number
  totalPartners: number
  totalTracks: number
  totalMixtapes: number
  totalComments: number
  totalViews: number
  totalLikes: number
  newUsersLast30Days: number
  newTracksLast30Days: number
  topCategories: { categoryName: string, trackCount: number }[]
  topPartners: { partnerId: string, partnerName: string, totalViews: number }[]
}
```

### GET /admin/moderation
Queue de modération avec pagination.

**Query params:**
- `pageIndex` (default: 1)
- `pageSize` (default: 20, max: 100)

**Response:**
```typescript
{
  items: ModerationItemDto[]
  pageIndex: number
  totalPages: number
  totalCount: number
  hasPrevious: boolean
  hasNext: boolean
}
```

### POST /admin/moderation/{commentId}
Modérer un commentaire.

**Body:**
```typescript
{
  status: 'Approved' | 'Rejected'
  reason?: string  // Optionnel
}
```

### POST /admin/scoring/refresh
Recalculer tous les scores en arrière-plan.

**Response:**
```typescript
{
  totalProcessed: number
  successCount: number
  errorCount: number
  message: string
}
```

## 🔐 Rôles requis

- **Dashboard** : Admin uniquement
- **Modération** : Admin uniquement
- **Recalcul scores** : Admin uniquement

## 🚀 Stack technique

- **useSWR** : Fetch avec cache et revalidation
- **Recharts** : Graphiques et visualisations
- **date-fns** : Formatage des dates
- **Zod** : Validation des schémas
- **shadcn/ui** : Composants UI
- **Sonner** : Toast notifications

## ⚙️ Configuration

Aucune configuration spécifique requise. L'API URL est configurée globalement dans `lib/fetcher.ts`.

## 📝 Validation

Schémas Zod pour la modération :

```typescript
const moderateCommentSchema = z.object({
  status: z.enum(['Approved', 'Rejected']),
  reason: z.string().max(500).optional(),
})
```

## 🎯 Fonctionnalités

### Auto-refresh
Les stats globales se rafraîchissent automatiquement toutes les 60 secondes.

### Pagination
La queue de modération supporte la pagination complète avec navigation.

### Confirmation
Demande confirmation avant de rejeter un commentaire ou recalculer les scores.

### Feedback utilisateur
Toasts de succès/erreur après chaque action.

### Suggestions IA
Chaque commentaire affiche la suggestion IA (Approuver/Rejeter) avec raison.

---

**Status:** ✅ Opérationnel
**Version:** 1.0.0
