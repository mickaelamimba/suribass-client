"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Award, Play, Trophy } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ContentType, type TopContentDto } from "../api/home.types"

interface TopContentSectionProps {
  content: TopContentDto[]
}

export function TopContentSection({ content }: TopContentSectionProps) {
  if (!content || content.length === 0) return null

  // Le top 3 affiché en grand
  const topThree = content.slice(0, 3)
  const rest = content.slice(3, 10)

  return (
    <section className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-gradient-to-r from-yellow-500/10 to-orange-500/10 px-6 py-3">
          <Trophy className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
          <span className="font-semibold">Top Contenu</span>
        </div>
        <h2 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl">
          Les Meilleures Notes IA
        </h2>
        <p className="text-lg text-muted-foreground">
          Le contenu le plus apprécié selon notre algorithme
        </p>
      </motion.div>

      {/* Top 3 - Grande présentation */}
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        {topThree.map((item, index) => {
          const medals = ["🥇", "🥈", "🥉"]
          const gradients = [
            "from-yellow-500 to-orange-500",
            "from-gray-400 to-gray-600",
            "from-orange-700 to-yellow-800",
          ]

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={
                  item.contentType === ContentType.Track
                    ? `/tracks/${item.id}`
                    : `/mixtapes/${item.id}`
                }
              >
                <Card className="group relative overflow-hidden border-2 transition-all hover:shadow-2xl">
                  {/* Numéro de position */}
                  <div className="absolute left-4 top-4 z-10">
                    <motion.div
                      initial={{ rotate: -180, scale: 0 }}
                      animate={{ rotate: 0, scale: 1 }}
                      transition={{
                        delay: index * 0.1 + 0.3,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="text-5xl"
                    >
                      {medals[index]}
                    </motion.div>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-square w-full overflow-hidden bg-muted">
                    <Image
                      src={item.thumbnailUrl || "/images/placeholder-track.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Play button on hover */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Button
                        size="icon"
                        className="h-16 w-16 rounded-full shadow-2xl"
                      >
                        <Play className="h-8 w-8 fill-current" />
                      </Button>
                    </motion.div>

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="mb-1 line-clamp-1 text-lg font-bold">
                        {item.title}
                      </h3>
                      <p className="mb-2 text-sm opacity-90">{item.artistName}</p>
                      <Badge
                        className={`bg-gradient-to-r ${gradients[index]} text-white`}
                      >
                        <Award className="mr-1 h-3 w-3" />
                        Score: {item.score}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Reste du top 10 - Liste compacte */}
      {rest.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {rest.map((item, index) => (
            <Link
              key={item.id}
              href={
                item.contentType === ContentType.Track
                  ? `/tracks/${item.id}`
                  : `/mixtapes/${item.id}`
              }
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <Card className="flex items-center gap-3 p-3 transition-all hover:shadow-lg">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                    #{index + 4}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="line-clamp-1 font-semibold">{item.title}</h4>
                    <p className="line-clamp-1 text-xs text-muted-foreground">
                      {item.artistName}
                    </p>
                  </div>
                  <Badge variant="secondary" className="shrink-0">
                    {item.score}
                  </Badge>
                </Card>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      )}
    </section>
  )
}
