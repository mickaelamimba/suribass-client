"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MixtapeGrid } from "@/features/mixtapes/components/MixtapeGrid"
import { useMixtapes } from "@/features/mixtapes/hooks/useMixtapes"
import { TrackGrid } from "@/features/tracks/components/TrackGrid"
import { useTracks } from "@/features/tracks/hooks/useTracks"
import { AlertTriangle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useCategoryBySlug } from "../hooks/useCategoryBySlug"

interface CategoryDetailClientProps {
  slug: string
}

export function CategoryDetailClient({ slug }: CategoryDetailClientProps) {
  const { category, isLoading, isError } = useCategoryBySlug(slug)
  
  // Récupérer les tracks et mixtapes de cette catégorie
  const { tracks, isLoading: isLoadingTracks } = useTracks(
    category?.id ? { categoryId: category.id } : {}
  )
  const { mixtapes, isLoading: isLoadingMixtapes } = useMixtapes(
    category?.id ? { categoryId: category.id } : {}
  )

  if (isLoading) {
    return (
      <div className="container flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (isError || !category) {
    return (
      <div className="container flex flex-col gap-6 py-8">
        <Button variant="ghost" asChild className="w-fit pl-0">
          <Link href="/categories">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux catégories
          </Link>
        </Button>
        
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>
            Impossible de charger la catégorie.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <Button variant="ghost" asChild className="mb-6 pl-0">
        <Link href="/categories">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux catégories
        </Link>
      </Button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">{category.name}</h1>
        {category.description && (
          <p className="mt-2 text-lg text-muted-foreground">
            {category.description}
          </p>
        )}
      </div>

      <Tabs defaultValue="tracks" className="space-y-6">
        <TabsList>
          <TabsTrigger value="tracks">Tracks ({category.trackCount})</TabsTrigger>
          <TabsTrigger value="mixtapes">Mixtapes ({category.mixtapeCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="tracks">
          <TrackGrid 
            tracks={tracks?.items} 
            isLoading={isLoadingTracks || !category.id} 
          />
        </TabsContent>

        <TabsContent value="mixtapes">
          <MixtapeGrid 
            mixtapes={mixtapes?.items} 
            isLoading={isLoadingMixtapes || !category.id} 
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
