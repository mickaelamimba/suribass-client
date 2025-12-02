"use client"

import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { useState } from "react"

interface MixtapePlayerProps {
  embedUrl: string
  title: string
  thumbnailUrl?: string
}

export function MixtapePlayer({ embedUrl, title, thumbnailUrl }: MixtapePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Ajouter autoplay à l'URL de l'embed SoundCloud
  const getAutoplayUrl = (url: string) => {
    if (!url) return url
    const separator = url.includes("?") ? "&" : "?"
    return `${url}${separator}auto_play=true`
  }

  // Si on n'a pas de thumbnail ou si on joue déjà, afficher l'iframe
  if (isPlaying || !thumbnailUrl) {
    return (
      <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-black sm:aspect-[3/1]">
        <iframe
          width="100%"
          height="100%"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={isPlaying ? getAutoplayUrl(embedUrl) : embedUrl}
          title={title}
          className="h-full w-full"
        />
      </div>
    )
  }

  // Sinon afficher le thumbnail avec bouton play
  return (
    <div 
      className="group relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-black sm:aspect-[3/1] cursor-pointer"
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
