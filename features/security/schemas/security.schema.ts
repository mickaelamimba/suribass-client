import { z } from "zod"

export const blockIPSchema = z.object({
  ipAddress: z
    .string()
    .min(1, "L'adresse IP est requise")
    .regex(
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      "Adresse IP invalide"
    ),
  reason: z
    .string()
    .min(3, "La raison doit contenir au moins 3 caractères")
    .max(500, "La raison ne peut pas dépasser 500 caractères"),
  duration: z
    .number()
    .int()
    .min(1, "La durée doit être d'au moins 1 heure")
    .max(8760, "La durée ne peut pas dépasser 1 an (8760 heures)")
    .optional()
    .nullable(),
})

export type BlockIPFormData = z.infer<typeof blockIPSchema>

export const securityEventFilterSchema = z.object({
  eventType: z.enum([
    'FailedLogin',
    'AccountLocked',
    'RateLimitExceeded',
    'InjectionAttempt',
    'UnauthorizedAccess',
    'SuspiciousActivity',
    'TokenRevoked',
    'PasswordChanged',
    'AdminAction',
  ]).optional(),
  severity: z.enum(['Low', 'Medium', 'High', 'Critical']).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  ipAddress: z.string().optional(),
  userId: z.string().optional(),
})

export type SecurityEventFilterData = z.infer<typeof securityEventFilterSchema>
