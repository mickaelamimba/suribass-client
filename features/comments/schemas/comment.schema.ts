import { z } from "zod"

// Schéma pour ajouter un commentaire
export const addCommentSchema = z.object({
  content: z
    .string()
    .min(1, "Le commentaire ne peut pas être vide")
    .max(1000, "Le commentaire ne peut pas dépasser 1000 caractères"),
  trackId: z.string().uuid().optional(),
  mixtapeId: z.string().uuid().optional(),
})

export type AddCommentFormData = z.infer<typeof addCommentSchema>

// Schéma pour répondre à un commentaire
export const replyCommentSchema = z.object({
  content: z
    .string()
    .min(1, "La réponse ne peut pas être vide")
    .max(1000, "La réponse ne peut pas dépasser 1000 caractères"),
})

export type ReplyCommentFormData = z.infer<typeof replyCommentSchema>
