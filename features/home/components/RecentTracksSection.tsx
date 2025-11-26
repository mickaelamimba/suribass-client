"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"
import type { RecentTrackDto } from "../api/home.types"
import { ContentCard } from "./ContentCard"

interface RecentTracksSectionProps {
  tracks: RecentTrackDto[]
}

export function RecentTracksSection({ tracks }: RecentTracksSectionProps) {
  if (!tracks || tracks.length === 0) return null

  return (
    <section className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h2 className="mb-2 flex items-center gap-2 text-3xl font-bold tracking-tight">
            <TrendingUp className="h-8 w-8 text-primary" />
            Nouveaux Tracks
          </h2>
          <p className="text-muted-foreground">
            Les dernières sorties fraîchement ajoutées
          </p>
        </div>
        <Button variant="ghost" asChild className="gap-2">
          <Link href="/tracks">
            Voir tout
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tracks.slice(0, 8).map((track, index) => (
          <ContentCard
            key={track.id}
            id={track.id}
            title={track.title}
            thumbnailUrl={track.thumbnailUrl}
            artistName={track.artistName}
            categoryName={track.categoryName}
            viewCount={track.viewCount}
            likeCount={track.likeCount}
            score={track.score}
            href={`/tracks/${track.id}`}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
