"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Heart, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ContentCardProps {
  id: string
  title: string
  thumbnailUrl: string
  artistName: string
  categoryName?: string
  viewCount?: number
  likeCount?: number
  score?: number | null
  duration?: string
  href: string
  index: number
}

export function ContentCard({
  id,
  title,
  thumbnailUrl,
  artistName,
  categoryName,
  viewCount,
  likeCount,
  score,
  href,
  index,
}: ContentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={href}>
        <motion.div
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          className="relative overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-2xl"
        >
          {/* Thumbnail */}
          <div className="relative aspect-square w-full overflow-hidden bg-muted">
            <Image
              src={thumbnailUrl || "/images/placeholder-track.jpg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay on hover */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Button
                  size="icon"
                  className="h-16 w-16 rounded-full bg-primary shadow-2xl hover:bg-primary/90"
                >
                  <Play className="h-8 w-8 fill-current" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Score Badge */}
            {score !== null && score !== undefined && score >= 80 && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                className="absolute right-2 top-2"
              >
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg">
                  ⭐ {score}
                </Badge>
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              {categoryName && (
                <Badge variant="outline" className="text-xs">
                  {categoryName}
                </Badge>
              )}
            </div>

            <h3 className="mb-1 line-clamp-1 text-lg font-semibold group-hover:text-primary transition-colors">
              {title}
            </h3>

            <p className="mb-3 text-sm text-muted-foreground">{artistName}</p>

            {/* Stats */}
            {(viewCount !== undefined || likeCount !== undefined) && (
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                {viewCount !== undefined && (
                  <div className="flex items-center gap-1">
                    <Play className="h-3 w-3" />
                    <span>{viewCount.toLocaleString()}</span>
                  </div>
                )}
                {likeCount !== undefined && (
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    <span>{likeCount.toLocaleString()}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}
