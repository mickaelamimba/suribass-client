import { z } from "zod"

// URL validation pour plateformes supportées
const platformUrlRegex = {
  soundcloud: /^https?:\/\/(www\.)?soundcloud\.com\/.+/,
  youtube: /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/.+/,
  spotify: /^https?:\/\/open\.spotify\.com\/track\/.+/,
}

export const extractMetadataSchema = z.object({
  url: z
    .string()
    .url("URL invalide")
    .refine(
      (url) => {
        return Object.values(platformUrlRegex).some(regex => regex.test(url))
      },
      "La plateforme n'est pas supportée. Utilisez SoundCloud, YouTube ou Spotify."
    ),
})

export type ExtractMetadataFormData = z.infer<typeof extractMetadataSchema>

export const createTrackSchema = z.object({
  platformUrl: z
    .string()
    .url("URL invalide")
    .refine(
      (url) => {
        return Object.values(platformUrlRegex).some(regex => regex.test(url))
      },
      "La plateforme n'est pas supportée. Utilisez SoundCloud, YouTube ou Spotify."
    ),
  title: z
    .string()
    .min(1, "Le titre doit contenir au moins 1 caractère")
    .max(200, "Le titre ne peut pas dépasser 200 caractères")
    .optional(),
  description: z
    .string()
    .max(2000, "La description ne peut pas dépasser 2000 caractères")
    .optional()
    .nullable(),
  categoryId: z
    .string()
    .uuid("Catégorie invalide"),
  playlistInfo: z
    .string()
    .max(500, "Les infos playlist ne peuvent pas dépasser 500 caractères")
    .optional()
    .nullable(),
})

export type CreateTrackFormData = z.infer<typeof createTrackSchema>

export const updateTrackSchema = z.object({
  title: z
    .string()
    .min(1, "Le titre doit contenir au moins 1 caractère")
    .max(200, "Le titre ne peut pas dépasser 200 caractères")
    .optional(),
  description: z
    .string()
    .max(2000, "La description ne peut pas dépasser 2000 caractères")
    .optional()
    .nullable(),
  categoryId: z
    .string()
    .uuid("Catégorie invalide")
    .optional(),
  playlistInfo: z
    .string()
    .max(500, "Les infos playlist ne peuvent pas dépasser 500 caractères")
    .optional()
    .nullable(),
})

export type UpdateTrackFormData = z.infer<typeof updateTrackSchema>

export const trackFiltersSchema = z.object({
  categoryId: z.string().uuid().optional(),
  partnerId: z.string().uuid().optional(),
  onlyFeatured: z.boolean().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['recent', 'popular', 'score']).optional(),
})

export type TrackFiltersData = z.infer<typeof trackFiltersSchema>
