# 📚 Documentation API - SuribassMusic

Cette documentation décrit tous les endpoints disponibles de l'API SuribassMusic pour développer le frontend.

## 📋 Table des matières

- [Informations générales](#informations-générales)
- [Authentification](#authentification)
- [Format des réponses](#format-des-réponses)
- [Endpoints](#endpoints)
  - [🔐 Auth](#-auth)
  - [🏠 Home](#-home)
  - [📁 Content](#-content)
  - [🎵 Tracks](#-tracks)
  - [💿 Mixtapes](#-mixtapes)
  - [🏷️ Categories](#️-categories)
  - [💬 Comments](#-comments)
  - [❤️ Engagement](#️-engagement)
  - [🤝 Partners](#-partners)
  - [👤 Users](#-users)
  - [☁️ SoundCloud](#️-soundcloud)
  - [⚙️ Admin](#️-admin)

---

## Informations générales

### Base URL
```
/api/v1
```

### Headers requis

| Header | Description |
|--------|-------------|
| `Content-Type` | `application/json` |
| `Authorization` | `Bearer {accessToken}` (pour les routes protégées) |

### Authentification

Les endpoints marqués avec 🔒 requièrent une authentification via JWT Bearer token.  
Les endpoints marqués avec 👑 requièrent le rôle Admin.  
Les endpoints marqués avec 🎤 requièrent le rôle Partner.

---

## Format des réponses

### Réponse standard
```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  errors: string[];
  message?: string;
}
```

### Réponse paginée
```typescript
interface PaginatedResponse<T> {
  items: T[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
```

### Token Response
```typescript
interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string; // ISO 8601 date
  tokenType: "Bearer";
}
```

---

## Endpoints

---

## 🔐 Auth

### POST `/api/v1/auth/register`
Inscrit un nouvel utilisateur et retourne les tokens d'authentification.

**Request Body:**
```json
{
  "email": "user@example.com",
  "username": "monpseudo",
  "password": "motdepasse123"
}
```

| Champ | Type | Requis | Contraintes |
|-------|------|--------|-------------|
| `email` | string | ✅ | Email valide |
| `username` | string | ✅ | 3-50 caractères |
| `password` | string | ✅ | Min. 8 caractères |

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbG...",
    "refreshToken": "abc123...",
    "expiresAt": "2025-12-02T10:00:00Z",
    "tokenType": "Bearer"
  },
  "message": "Inscription réussie"
}
```

---

### POST `/api/v1/auth/login`
Authentifie un utilisateur avec email et mot de passe.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "motdepasse123"
}
```

| Champ | Type | Requis |
|-------|------|--------|
| `email` | string | ✅ |
| `password` | string | ✅ |

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbG...",
    "refreshToken": "abc123...",
    "expiresAt": "2025-12-02T10:00:00Z",
    "tokenType": "Bearer"
  }
}
```

**Erreurs:**
- `401 Unauthorized` - Identifiants invalides

---

### POST `/api/v1/auth/google`
Authentifie un utilisateur via Google OAuth.

**Request Body:**
```json
{
  "idToken": "google_id_token_ici"
}
```

| Champ | Type | Requis |
|-------|------|--------|
| `idToken` | string | ✅ |

**Response:** `200 OK` - Même format que login

---

### POST `/api/v1/auth/refresh`
Rafraîchit les tokens d'authentification.

**Request Body:**
```json
{
  "refreshToken": "votre_refresh_token"
}
```

| Champ | Type | Requis |
|-------|------|--------|
| `refreshToken` | string | ✅ |

**Response:** `200 OK` - Nouveau jeu de tokens

**Erreurs:**
- `401 Unauthorized` - Token invalide ou expiré

---

## 🏠 Home

### GET `/api/v1/home`
Récupère les données pour la page d'accueil.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "recentTracks": [/* TrackDto[] */],
    "topContent": [/* ScoredContentDto[] */],
    "recentMixtapes": [/* MixtapeDto[] */]
  }
}
```

---

### GET `/api/v1/home/featured`
Récupère les tracks mis en avant.

**Query Parameters:**
| Param | Type | Défaut | Description |
|-------|------|--------|-------------|
| `pageIndex` | int | 1 | Numéro de page |
| `pageSize` | int | 12 | Éléments par page |

**Response:** `200 OK` - `PaginatedResponse<TrackDto>`

---

### GET `/api/v1/home/top-content`
Récupère le contenu avec les meilleures notes.

**Query Parameters:**
| Param | Type | Défaut | Description |
|-------|------|--------|-------------|
| `count` | int | 10 | Nombre d'éléments (max 50) |
| `contentType` | string? | null | `Track` ou `Mixtape` |

**Response:** `200 OK` - `List<ScoredContentDto>`

---

### GET `/api/v1/home/recent-mixtapes`
Récupère les mixtapes récentes.

**Query Parameters:**
| Param | Type | Défaut |
|-------|------|--------|
| `pageIndex` | int | 1 |
| `pageSize` | int | 12 |

**Response:** `200 OK` - `PaginatedResponse<MixtapeDto>`

---

## 📁 Content

### GET `/api/v1/content`
Récupère une vue unifiée des tracks et mixtapes avec filtres et tri.

**Query Parameters:**
| Param | Type | Défaut | Description |
|-------|------|--------|-------------|
| `pageIndex` | int | 1 | Numéro de page |
| `pageSize` | int | 10 | Éléments par page |
| `categoryId` | Guid? | null | Filtrer par catégorie |
| `partnerId` | Guid? | null | Filtrer par partenaire |
| `onlyMixtapes` | bool | false | Seulement les mixtapes |
| `onlyTracks` | bool | false | Seulement les tracks |
| `sortByScore` | bool | false | Trier par score IA |

**Response:** `200 OK` - `PaginatedResponse<ContentItemDto>`

---

### GET `/api/v1/content/featured`
Récupère le contenu mis en avant (meilleurs scores IA).

**Query Parameters:**
| Param | Type | Défaut |
|-------|------|--------|
| `limit` | int | 10 |

**Response:** `200 OK` - `List<ContentItemDto>`

---

## 🎵 Tracks

### GET `/api/v1/tracks`
Récupère la liste paginée des tracks.

**Query Parameters:**
| Param | Type | Défaut | Description |
|-------|------|--------|-------------|
| `pageIndex` | int | 1 | Numéro de page |
| `pageSize` | int | 10 | Éléments par page |
| `categoryId` | Guid? | null | Filtrer par catégorie |
| `partnerId` | Guid? | null | Filtrer par partenaire |
| `onlyFeatured` | bool | false | Seulement les mis en avant |

**Response:** `200 OK` - `PaginatedResponse<TrackDto>`

---

### GET `/api/v1/tracks/{id}`
Récupère les détails d'une track.

**Path Parameters:**
| Param | Type |
|-------|------|
| `id` | Guid |

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "...",
    "title": "Ma Track",
    "description": "...",
    "platformUrl": "...",
    "coverUrl": "...",
    "category": {...},
    "partner": {...},
    "engagement": {...},
    "createdAt": "..."
  }
}
```

**Erreurs:**
- `404 Not Found` - Track non trouvée

---

### POST `/api/v1/tracks` 🎤
Crée une nouvelle track. Réservé aux partenaires.

**Request Body:**
```json
{
  "platformUrl": "https://soundcloud.com/artist/track",
  "title": "Titre optionnel",
  "description": "Description optionnelle",
  "categoryId": "guid-de-categorie",
  "playlistInfo": {
    "name": "Nom de playlist",
    "position": 1
  }
}
```

| Champ | Type | Requis | Contraintes |
|-------|------|--------|-------------|
| `platformUrl` | string | ✅ | URL valide |
| `title` | string? | ❌ | Max 200 caractères |
| `description` | string? | ❌ | Max 2000 caractères |
| `categoryId` | Guid | ✅ | - |
| `playlistInfo` | object? | ❌ | - |

**Response:** `201 Created`
```json
{
  "success": true,
  "data": "guid-de-la-track-creee",
  "message": "Track créée avec succès"
}
```

---

### POST `/api/v1/tracks/extract-metadata` 🎤
Extrait les métadonnées d'une URL de plateforme musicale.

**Request Body:**
```json
{
  "url": "https://soundcloud.com/artist/track"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "platform": "SoundCloud",
    "title": "Titre de la track",
    "artist": "Nom de l'artiste",
    "coverUrl": "...",
    "duration": 180
  }
}
```

---

### PUT `/api/v1/tracks/{id}` 🎤
Met à jour une track existante.

**Request Body:**
```json
{
  "title": "Nouveau titre",
  "description": "Nouvelle description",
  "categoryId": "guid-categorie",
  "playlistInfo": {
    "name": "Playlist",
    "position": 2
  }
}
```

| Champ | Type | Requis |
|-------|------|--------|
| `title` | string? | ❌ |
| `description` | string? | ❌ |
| `categoryId` | Guid? | ❌ |
| `playlistInfo` | object? | ❌ |

**Response:** `200 OK`

**Erreurs:**
- `403 Forbidden` - Non autorisé
- `404 Not Found` - Track non trouvée

---

### DELETE `/api/v1/tracks/{id}` 🎤
Supprime une track.

**Response:** `200 OK`

**Erreurs:**
- `403 Forbidden` - Non autorisé
- `404 Not Found` - Track non trouvée

---

## 💿 Mixtapes

### GET `/api/v1/mixtapes`
Récupère la liste paginée des mixtapes.

**Query Parameters:**
| Param | Type | Défaut | Description |
|-------|------|--------|-------------|
| `pageIndex` | int | 1 | Numéro de page |
| `pageSize` | int | 10 | Éléments par page |
| `categoryId` | Guid? | null | Filtrer par catégorie |
| `tags` | string? | null | Filtrer par tags |

**Response:** `200 OK` - `PaginatedResponse<MixtapeDto>`

---

### GET `/api/v1/mixtapes/{id}`
Récupère les détails d'une mixtape.

**Path Parameters:**
| Param | Type |
|-------|------|
| `id` | Guid |

**Response:** `200 OK` - `MixtapeDetailDto`

**Erreurs:**
- `404 Not Found` - Mixtape non trouvée

---

### POST `/api/v1/mixtapes/sync` 👑
Déclenche une synchronisation depuis SoundCloud. Admin uniquement.

**Request Body:**
```json
{
  "tags": "tag1,tag2",
  "defaultCategoryId": "guid-optionnel"
}
```

| Champ | Type | Requis | Contraintes |
|-------|------|--------|-------------|
| `tags` | string? | ❌ | Max 500 caractères |
| `defaultCategoryId` | Guid? | ❌ | - |

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "added": 5,
    "updated": 2,
    "skipped": 1,
    "failed": 0
  },
  "message": "Synchronisation terminée: 5 ajoutées, 2 mises à jour"
}
```

---

### PUT `/api/v1/mixtapes/{id}` 👑
Met à jour une mixtape existante. Admin uniquement.

**Request Body:**
```json
{
  "description": "Nouvelle description",
  "categoryId": "guid-categorie"
}
```

| Champ | Type | Requis | Contraintes |
|-------|------|--------|-------------|
| `description` | string? | ❌ | Max 2000 caractères |
| `categoryId` | Guid? | ❌ | - |

**Response:** `200 OK`

---

## 🏷️ Categories

### GET `/api/v1/categories`
Récupère la liste des catégories.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "name": "Hip-Hop",
      "slug": "hip-hop",
      "description": "..."
    }
  ]
}
```

---

### GET `/api/v1/categories/{slug}`
Récupère une catégorie par son slug.

**Path Parameters:**
| Param | Type |
|-------|------|
| `slug` | string |

**Response:** `200 OK` - `CategoryDto`

**Erreurs:**
- `404 Not Found` - Catégorie non trouvée

---

### POST `/api/v1/categories` 👑
Crée une nouvelle catégorie. Admin uniquement.

**Request Body:**
```json
{
  "name": "Nouvelle Catégorie",
  "description": "Description optionnelle"
}
```

| Champ | Type | Requis | Contraintes |
|-------|------|--------|-------------|
| `name` | string | ✅ | 2-100 caractères |
| `description` | string? | ❌ | Max 500 caractères |

**Response:** `201 Created` - Retourne le GUID de la catégorie

---

### PUT `/api/v1/categories/{id}` 👑
Met à jour une catégorie. Admin uniquement.

**Request Body:**
```json
{
  "name": "Nom modifié",
  "description": "Description modifiée"
}
```

**Response:** `200 OK`

---

### DELETE `/api/v1/categories/{id}` 👑
Supprime une catégorie. Admin uniquement.

**Response:** `200 OK`

---

## 💬 Comments

### GET `/api/v1/comments/track/{trackId}`
Récupère les commentaires d'une track.

**Path Parameters:**
| Param | Type |
|-------|------|
| `trackId` | Guid |

**Query Parameters:**
| Param | Type | Défaut |
|-------|------|--------|
| `pageIndex` | int | 1 |
| `pageSize` | int | 20 |

**Response:** `200 OK` - `List<CommentDto>`

---

### GET `/api/v1/comments/mixtape/{mixtapeId}`
Récupère les commentaires d'une mixtape.

**Path Parameters:**
| Param | Type |
|-------|------|
| `mixtapeId` | Guid |

**Query Parameters:**
| Param | Type | Défaut |
|-------|------|--------|
| `pageIndex` | int | 1 |
| `pageSize` | int | 20 |

**Response:** `200 OK` - `List<CommentDto>`

---

### POST `/api/v1/comments` 🔒
Ajoute un commentaire. Authentification requise.

**Request Body:**
```json
{
  "content": "Mon commentaire",
  "trackId": "guid-track-optionnel",
  "mixtapeId": "guid-mixtape-optionnel"
}
```

| Champ | Type | Requis | Contraintes |
|-------|------|--------|-------------|
| `content` | string | ✅ | 1-1000 caractères |
| `trackId` | Guid? | ⚠️ | Un des deux requis |
| `mixtapeId` | Guid? | ⚠️ | Un des deux requis |

> ⚠️ **Note:** Vous devez spécifier soit `trackId` soit `mixtapeId`, mais pas les deux.

**Response:** `201 Created` - Retourne le GUID du commentaire

---

### POST `/api/v1/comments/{id}/reply` 🔒
Répond à un commentaire existant.

**Path Parameters:**
| Param | Type |
|-------|------|
| `id` | Guid |

**Request Body:**
```json
{
  "content": "Ma réponse au commentaire"
}
```

| Champ | Type | Requis | Contraintes |
|-------|------|--------|-------------|
| `content` | string | ✅ | 1-1000 caractères |

**Response:** `201 Created` - Retourne le GUID de la réponse

---

### DELETE `/api/v1/comments/{id}` 🔒
Supprime un commentaire (propriétaire ou admin).

**Response:** `200 OK`

**Erreurs:**
- `403 Forbidden` - Non autorisé
- `404 Not Found` - Commentaire non trouvé

---

## ❤️ Engagement

### POST `/api/v1/engagement/like` 🔒
Toggle like sur une track ou mixtape.

**Request Body:**
```json
{
  "trackId": "guid-track-optionnel",
  "mixtapeId": "guid-mixtape-optionnel"
}
```

> ⚠️ **Note:** Vous devez spécifier soit `trackId` soit `mixtapeId`, mais pas les deux.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "isLiked": true
  },
  "message": "Like ajouté"
}
```

---

### POST `/api/v1/engagement/favorite` 🔒
Toggle favori sur une track ou mixtape.

**Request Body:**
```json
{
  "trackId": "guid-track-optionnel",
  "mixtapeId": "guid-mixtape-optionnel"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "isFavorited": true
  },
  "message": "Ajouté aux favoris"
}
```

---

### POST `/api/v1/engagement/share`
Génère un lien de partage. Public.

**Request Body:**
```json
{
  "trackId": "guid-track-optionnel",
  "mixtapeId": "guid-mixtape-optionnel"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "token": "abc123",
    "url": "https://...",
    "expiresAt": "2025-12-08T10:00:00Z"
  }
}
```

---

### GET `/api/v1/engagement/stats`
Récupère les stats d'engagement d'une track ou mixtape. Public.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `trackId` | Guid? | ID de la track |
| `mixtapeId` | Guid? | ID de la mixtape |

> ⚠️ Un des deux paramètres est requis.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "likesCount": 42,
    "commentsCount": 15,
    "favoritesCount": 8,
    "sharesCount": 5
  }
}
```

---

## 🤝 Partners

### GET `/api/v1/partners`
Récupère la liste des partenaires.

**Query Parameters:**
| Param | Type | Défaut |
|-------|------|--------|
| `pageIndex` | int | 1 |
| `pageSize` | int | 10 |

**Response:** `200 OK` - `List<PartnerDto>`

---

### GET `/api/v1/partners/{id}`
Récupère le profil d'un partenaire.

**Response:** `200 OK` - `PartnerDashboardDto`

---

### GET `/api/v1/partners/{id}/dashboard` 🔒
Récupère le dashboard d'un partenaire. Propriétaire ou admin uniquement.

**Response:** `200 OK` - `PartnerDashboardDto`

**Erreurs:**
- `403 Forbidden` - Non autorisé
- `404 Not Found` - Partenaire non trouvé

---

### GET `/api/v1/partners/{id}/tracks`
Récupère les tracks d'un partenaire.

**Query Parameters:**
| Param | Type | Défaut |
|-------|------|--------|
| `pageIndex` | int | 1 |
| `pageSize` | int | 10 |

**Response:** `200 OK` - `PaginatedResponse<TrackDto>`

---

### POST `/api/v1/partners/register` 🔒
Inscription comme partenaire.

**Request Body:**
```json
{
  "artistName": "Mon Nom d'Artiste",
  "bio": "Ma bio optionnelle"
}
```

| Champ | Type | Requis | Contraintes |
|-------|------|--------|-------------|
| `artistName` | string | ✅ | 2-100 caractères |
| `bio` | string? | ❌ | Max 2000 caractères |

**Response:** `201 Created` - Retourne le GUID du partenaire

---

### PUT `/api/v1/partners/{id}` 🔒
Met à jour le profil d'un partenaire. Propriétaire uniquement.

**Request Body:**
```json
{
  "artistName": "Nouveau nom",
  "bio": "Nouvelle bio",
  "avatarUrl": "https://..."
}
```

| Champ | Type | Requis | Contraintes |
|-------|------|--------|-------------|
| `artistName` | string? | ❌ | 2-100 caractères |
| `bio` | string? | ❌ | Max 2000 caractères |
| `avatarUrl` | string? | ❌ | URL valide |

**Response:** `200 OK`

---

### POST `/api/v1/partners/collaborations` 🎤
Ajoute une collaboration sur une track. Partenaire uniquement.

**Request Body:**
```json
{
  "trackId": "guid-de-la-track",
  "collaboratorPartnerId": "guid-du-collaborateur",
  "role": "Producer"
}
```

| Champ | Type | Requis | Description |
|-------|------|--------|-------------|
| `trackId` | Guid | ✅ | - |
| `collaboratorPartnerId` | Guid | ✅ | - |
| `role` | string | ✅ | Rôle de collaboration (ex: Producer, Featured, etc.) |

**Response:** `201 Created` - Retourne le GUID de la collaboration

---

## 👤 Users

### GET `/api/v1/users/me` 🔒
Récupère le profil de l'utilisateur courant.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "guid-utilisateur",
    "email": "user@example.com",
    "username": "monpseudo",
    "role": "User",
    "partnerId": "guid-optionnel",
    "isPartner": false
  }
}
```

---

### GET `/api/v1/users/me/favorites` 🔒
Récupère les favoris de l'utilisateur courant.

**Query Parameters:**
| Param | Type | Défaut |
|-------|------|--------|
| `pageIndex` | int | 1 |
| `pageSize` | int | 10 |

**Response:** `200 OK` - `PaginatedResponse<FavoriteItemDto>`

---

## ☁️ SoundCloud

### GET `/api/v1/soundcloud/authorize` 🔒
Initie le flux OAuth SoundCloud. Redirige vers SoundCloud.

**Response:** `302 Found` - Redirection vers SoundCloud

---

### GET `/api/v1/soundcloud/callback`
Callback OAuth SoundCloud. Appelé par SoundCloud après autorisation.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `code` | string? | Code d'autorisation |
| `state` | string? | État CSRF |
| `error` | string? | Erreur éventuelle |

**Response:** `302 Found` - Redirection vers le frontend avec paramètres de succès/erreur

---

### POST `/api/v1/soundcloud/revoke` 🔒
Révoque la connexion SoundCloud de l'utilisateur courant.

**Response:** `200 OK`
```json
{
  "message": "SoundCloud connection revoked"
}
```

---

### GET `/api/v1/soundcloud/status` 🔒
Obtient le statut de connexion SoundCloud de l'utilisateur courant.

**Response:** `200 OK`
```json
{
  "connected": true,
  "expiresAt": "2025-12-15T10:00:00Z"
}
```

---

## ⚙️ Admin

### GET `/api/v1/admin/stats` 👑
Récupère les statistiques globales de la plateforme.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "totalTracks": 150,
    "totalMixtapes": 25,
    "totalUsers": 500,
    "totalPartners": 15,
    "totalComments": 1200,
    "totalLikes": 3500,
    "pendingModerationCount": 5,
    "lastUpdated": "2025-12-01T10:00:00Z"
  }
}
```

---

### GET `/api/v1/admin/moderation` 👑
Récupère les commentaires en attente de modération.

**Query Parameters:**
| Param | Type | Défaut |
|-------|------|--------|
| `pageIndex` | int | 1 |
| `pageSize` | int | 20 |

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "content": "...",
      "authorName": "...",
      "authorId": "...",
      "trackId": "...",
      "mixtapeId": null,
      "createdAt": "..."
    }
  ]
}
```

---

### POST `/api/v1/admin/moderation/{id}` 👑
Modère un commentaire.

**Path Parameters:**
| Param | Type |
|-------|------|
| `id` | Guid |

**Request Body:**
```json
{
  "status": "Approved",
  "reason": "Raison optionnelle"
}
```

| Champ | Type | Requis | Values |
|-------|------|--------|--------|
| `status` | ModerationStatus | ✅ | `Pending`, `Approved`, `Rejected` |
| `reason` | string? | ❌ | Max 500 caractères |

**Response:** `200 OK`

---

### POST `/api/v1/admin/scoring/refresh` 👑
Recalcule tous les scores IA.

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "tracksProcessed": 150,
    "mixtapesProcessed": 25,
    "failedCount": 0,
    "duration": "00:02:30"
  },
  "message": "Scores recalculés: 150 tracks, 25 mixtapes"
}
```

---

## 🔑 Codes d'erreur HTTP

| Code | Description |
|------|-------------|
| `200` | OK - Requête réussie |
| `201` | Created - Ressource créée |
| `302` | Found - Redirection |
| `400` | Bad Request - Données invalides |
| `401` | Unauthorized - Non authentifié |
| `403` | Forbidden - Non autorisé |
| `404` | Not Found - Ressource non trouvée |
| `500` | Internal Server Error - Erreur serveur |

---

## 📝 Notes pour le frontend

### Gestion des tokens
1. Stockez `accessToken` et `refreshToken` de manière sécurisée (ex: HttpOnly cookies ou secure storage)
2. Utilisez `accessToken` dans le header `Authorization: Bearer {token}`
3. Quand le token expire, utilisez `/auth/refresh` pour obtenir de nouveaux tokens
4. Gérez le cas où le refresh token est aussi expiré (déconnexion)

### Pagination
- La pagination utilise `pageIndex` (1-based) et `pageSize`
- Utilisez `hasNextPage` et `hasPreviousPage` pour la navigation
- `totalPages` donne le nombre total de pages

### Gestion des erreurs
```typescript
interface ErrorResponse {
  success: false;
  errors: string[];
  message?: string;
}
```

### Exemple d'appel avec fetch
```typescript
const response = await fetch('/api/v1/tracks', {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`
  }
});

const data = await response.json();
if (data.success) {
  // Utiliser data.data
} else {
  // Afficher data.errors
}
```

---

## 📅 Dernière mise à jour
1 décembre 2025
