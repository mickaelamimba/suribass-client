import { z } from "zod"

export const syncMixtapesSchema = z.object({
  tags: z
    .array(z.string())
    .optional()
    .nullable(),
})

export type SyncMixtapesFormData = z.infer<typeof syncMixtapesSchema>

// Schéma pour mettre à jour une mixtape (Admin)
// Note: categoryId removed as it's not available in API response
// TODO: Add back when API provides categoryId in response or implement category lookup by slug
export const updateMixtapeSchema = z.object({
  description: z.string().optional().nullable(),
})

export type UpdateMixtapeFormData = z.infer<typeof updateMixtapeSchema>

export const mixtapeFiltersSchema = z.object({
  categoryId: z.string().uuid().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['recent', 'popular', 'score']).optional(),
})

export type MixtapeFiltersData = z.infer<typeof mixtapeFiltersSchema>
