"use client"

import { useHomeData } from "../hooks/useHomeData"
import { HeroSection } from "./HeroSection"
import { RecentMixtapesSection } from "./RecentMixtapesSection"
import { RecentTracksSection } from "./RecentTracksSection"
import { TopContentSection } from "./TopContentSection"

export function HomeClient() {
  const { homeData, isLoading, isError } = useHomeData()

  if (isLoading) {
    return (
      <div className="container min-h-[60vh] py-16">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
            <p className="text-muted-foreground">Chargement du contenu...</p>
          </div>
        </div>
      </div>
    )
  }

  if (isError || !homeData) {
    return (
      <div className="container min-h-[60vh] py-16">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-semibold text-destructive">
              Erreur lors du chargement des données
            </p>
            <p className="text-sm text-muted-foreground">
              Veuillez réessayer plus tard
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col">
      <HeroSection />

      {homeData.topContent && homeData.topContent.length > 0 && (
        <TopContentSection content={homeData.topContent} />
      )}

      {homeData.recentTracks && homeData.recentTracks.length > 0 && (
        <RecentTracksSection tracks={homeData.recentTracks} />
      )}

      {homeData.recentMixtapes && homeData.recentMixtapes.length > 0 && (
        <RecentMixtapesSection mixtapes={homeData.recentMixtapes} />
      )}
    </div>
  )
}
