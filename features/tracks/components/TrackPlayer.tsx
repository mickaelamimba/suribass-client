"use client"

import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { useState } from "react"

interface TrackPlayerProps {
  embedUrl: string
  platform: 'SoundCloud' | 'YouTube' | 'Spotify'
  title: string
  thumbnailUrl?: string
}

export function TrackPlayer({ embedUrl, platform, title, thumbnailUrl }: TrackPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Ajouter autoplay à l'URL de l'embed
  const getAutoplayUrl = (url: string) => {
    if (!url) return url
    
    // SoundCloud
    if (url.includes("soundcloud.com")) {
      const separator = url.includes("?") ? "&" : "?"
      return `${url}${separator}auto_play=true`
    }
    
    // YouTube
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const separator = url.includes("?") ? "&" : "?"
      return `${url}${separator}autoplay=1`
    }
    
    return url
  }

  // Si on n'a pas de thumbnail ou si on joue déjà, afficher l'iframe
  if (isPlaying || !thumbnailUrl) {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-black/5 shadow-lg">
        <iframe
          src={isPlaying ? getAutoplayUrl(embedUrl) : embedUrl}
          title={`Lecteur ${platform} pour ${title}`}
          className="h-full w-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  // Sinon afficher le thumbnail avec bouton play
  return (
    <div 
      className="group relative aspect-video w-full overflow-hidden rounded-lg bg-black/5 shadow-lg cursor-pointer"
      onClick={() => setIsPlaying(true)}
    >
      <img
        src={thumbnailUrl}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity group-hover:bg-black/50">
        <Button
          size="icon"
          className="h-16 w-16 rounded-full bg-primary text-primary-foreground shadow-xl hover:bg-primary/90 hover:scale-110 transition-transform"
        >
          <Play className="h-8 w-8 ml-1 fill-current" />
        </Button>
      </div>
    </div>
  )
}
