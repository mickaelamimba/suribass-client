import { z } from "zod"

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères")
    .regex(
      /^[a-zA-Z0-9\s\-&]+$/,
      "Le nom ne peut contenir que des lettres, chiffres, espaces et - &"
    ),
  description: z
    .string()
    .max(500, "La description ne peut pas dépasser 500 caractères"),
})

export type CreateCategoryFormData = z.infer<typeof createCategorySchema>

export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(50, "Le nom ne peut pas dépasser 50 caractères")
    .regex(
      /^[a-zA-Z0-9\s\-\&]+$/,
      "Le nom ne peut contenir que des lettres, chiffres, espaces et - &"
    ),
  description: z
    .string()
    .max(500, "La description ne peut pas dépasser 500 caractères"),
})

export type UpdateCategoryFormData = z.infer<typeof updateCategorySchema>
