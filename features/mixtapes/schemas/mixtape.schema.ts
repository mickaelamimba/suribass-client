import { z } from "zod"

export const syncMixtapesSchema = z.object({
  tags: z
    .array(z.string())
    .optional()
    .nullable(),
})

export type SyncMixtapesFormData = z.infer<typeof syncMixtapesSchema>

export const updateMixtapeSchema = z.object({
  description: z
    .string()
    .max(2000, "La description ne peut pas dépasser 2000 caractères")
    .optional()
    .nullable(),
  categoryId: z
    .string()
    .uuid("Catégorie invalide")
    .optional(),
})

export type UpdateMixtapeFormData = z.infer<typeof updateMixtapeSchema>

export const mixtapeFiltersSchema = z.object({
  categoryId: z.string().uuid().optional(),
  search: z.string().optional(),
  sortBy: z.enum(['recent', 'popular', 'score']).optional(),
})

export type MixtapeFiltersData = z.infer<typeof mixtapeFiltersSchema>
