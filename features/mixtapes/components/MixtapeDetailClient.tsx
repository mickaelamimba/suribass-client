"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { MixtapeDetailView } from "@/features/mixtapes/components"
import { useMixtapeById } from "@/features/mixtapes/hooks/useMixtapeById"
import { AlertTriangle, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface MixtapeDetailClientProps {
  id: string
}

export function MixtapeDetailClient({ id }: MixtapeDetailClientProps) {
  const { mixtape, isLoading, isError } = useMixtapeById(id)

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (isError || !mixtape) {
    return (
      <div className="flex flex-col gap-6">
        <Button variant="ghost" asChild className="w-fit pl-0">
          <Link href="/mixtapes">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux mixtapes
          </Link>
        </Button>
        
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>
            Impossible de charger la mixtape. Elle a peut-être été supprimée.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <Button variant="ghost" asChild className="w-fit pl-0">
        <Link href="/mixtapes">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux mixtapes
        </Link>
      </Button>

      <MixtapeDetailView mixtape={mixtape} />
    </div>
  )
}
