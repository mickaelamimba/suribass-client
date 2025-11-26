"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth"
import { usePartnerById } from "@/features/partners/hooks/usePartnerById"
import { AlertTriangle, ArrowLeft, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { PartnerProfile } from "./PartnerProfile"
import { PartnerTracksSection } from "./PartnerTracksSection"

interface PartnerDetailClientProps {
  id: string
}

export function PartnerDetailClient({ id }: PartnerDetailClientProps) {
  const { partner, isLoading, isError } = usePartnerById(id)
  const { user } = useAuth()

  const isOwner = user?.id === partner?.id || user?.role === "Admin"

  if (isLoading) {
    return (
      <div className="container flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (isError || !partner) {
    return (
      <div className="container flex flex-col gap-6 py-8">
        <Button variant="ghost" asChild className="w-fit pl-0">
          <Link href="/partners">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux partenaires
          </Link>
        </Button>
        
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>
            Impossible de charger le profil du partenaire.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container flex flex-col gap-8 py-8">
      <div className="flex items-center justify-between">
        <Button variant="ghost" asChild className="pl-0">
          <Link href="/partners">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux partenaires
          </Link>
        </Button>

        {isOwner && (
          <Button variant="outline" asChild>
            <Link href={`/partners/dashboard`}>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
        )}
      </div>

      <PartnerProfile partner={partner} />

      <div className="mt-8">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">Tracks Récentes</h2>
        <PartnerTracksSection partnerId={id} />
      </div>
    </div>
  )
}
