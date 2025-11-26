import { z } from "zod"

export const registerPartnerSchema = z.object({
  artistName: z
    .string()
    .min(2, "Le nom d'artiste doit contenir au moins 2 caractères")
    .max(50, "Le nom d'artiste ne peut pas dépasser 50 caractères")
    .regex(
      /^[a-zA-Z0-9\s\-_'.]+$/,
      "Le nom d'artiste ne peut contenir que des lettres, chiffres, espaces et - _ ' ."
    ),
  bio: z
    .string()
    .max(1000, "La bio ne peut pas dépasser 1000 caractères")
    .optional()
    .nullable(),
})

export type RegisterPartnerFormData = z.infer<typeof registerPartnerSchema>

export const updatePartnerSchema = z.object({
  artistName: z
    .string()
    .min(2, "Le nom d'artiste doit contenir au moins 2 caractères")
    .max(50, "Le nom d'artiste ne peut pas dépasser 50 caractères")
    .regex(
      /^[a-zA-Z0-9\s\-_'.]+$/,
      "Le nom d'artiste ne peut contenir que des lettres, chiffres, espaces et - _ ' ."
    )
    .optional(),
  bio: z
    .string()
    .max(1000, "La bio ne peut pas dépasser 1000 caractères")
    .optional()
    .nullable(),
  avatarUrl: z
    .string()
    .url("URL invalide")
    .optional()
    .nullable(),
})

export type UpdatePartnerFormData = z.infer<typeof updatePartnerSchema>

export const addCollaborationSchema = z.object({
  trackId: z
    .string()
    .uuid("Track invalide"),
  collaboratorPartnerId: z
    .string()
    .uuid("Partenaire invalide"),
  role: z
    .string()
    .min(1, "Le rôle est requis")
    .max(50, "Le rôle ne peut pas dépasser 50 caractères"),
})

export type AddCollaborationFormData = z.infer<typeof addCollaborationSchema>
