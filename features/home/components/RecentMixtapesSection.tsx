"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Radio } from "lucide-react"
import Link from "next/link"
import type { RecentMixtapeDto } from "../api/home.types"
import { ContentCard } from "./ContentCard"

interface RecentMixtapesSectionProps {
  mixtapes: RecentMixtapeDto[]
}

export function RecentMixtapesSection({
  mixtapes,
}: RecentMixtapesSectionProps) {
  if (!mixtapes || mixtapes.length === 0) return null

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
            <Radio className="h-8 w-8 text-primary" />
            Mixtapes Récentes
          </h2>
          <p className="text-muted-foreground">
            Les meilleures compilations du moment
          </p>
        </div>
        <Button variant="ghost" asChild className="gap-2">
          <Link href="/mixtapes">
            Voir tout
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mixtapes.slice(0, 8).map((mixtape, index) => (
          <ContentCard
            key={mixtape.id}
            id={mixtape.id}
            title={mixtape.title}
            thumbnailUrl={mixtape.thumbnailUrl}
            artistName={mixtape.artistName}
            categoryName={mixtape.categoryName}
            viewCount={mixtape.viewCount}
            likeCount={mixtape.likeCount}
            score={mixtape.score}
            href={`/mixtapes/${mixtape.id}`}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}
