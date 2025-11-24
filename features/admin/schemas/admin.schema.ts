import { z } from "zod"

export const moderateCommentSchema = z.object({
  status: z.enum(['Approved', 'Rejected'], {
    required_error: "Le statut est requis",
  }),
  reason: z.string().max(500, "La raison ne peut pas dépasser 500 caractères").optional(),
})

export type ModerateCommentFormData = z.infer<typeof moderateCommentSchema>
