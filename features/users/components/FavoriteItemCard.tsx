"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { Music, Play, Radio } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { FavoriteItemDto } from "../api/users.types"

interface FavoriteItemCardProps {
  item: FavoriteItemDto
}

export function FavoriteItemCard({ item }: FavoriteItemCardProps) {
  const isTrack = item.contentType === "Track"
  const href = isTrack ? `/tracks/${item.contentId}` : `/mixtapes/${item.contentId}`
  const Icon = isTrack ? Music : Radio

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden">
        <Image
          src={item.thumbnailUrl}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100" />
        
        <Link
          href={href}
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Button size="icon" className="h-12 w-12 rounded-full">
            <Play className="h-6 w-6 ml-1" />
          </Button>
        </Link>

        <div className="absolute left-2 top-2">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            <Icon className="mr-1 h-3 w-3" />
            {isTrack ? "Track" : "Mixtape"}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-4 pb-2">
        <Link href={href} className="line-clamp-1 font-semibold hover:underline">
          {item.title}
        </Link>
        <p className="text-sm text-muted-foreground">{item.artistName}</p>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <p className="text-xs text-muted-foreground">
          {item.addedAt && !isNaN(new Date(item.addedAt).getTime())
            ? `Ajouté ${formatDistanceToNow(new Date(item.addedAt), { addSuffix: true, locale: fr })}`
            : "Ajouté récemment"
          }
        </p>
      </CardContent>
    </Card>
  )
}

export function FavoriteItemSkeleton() {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <CardHeader className="p-4 pb-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <Skeleton className="h-3 w-1/3" />
      </CardContent>
    </Card>
  )
}
