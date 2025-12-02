"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PlayerModalProps {
  isOpen: boolean
  onClose: () => void
  embedUrl: string
  title: string
  artistName?: string
  platform?: string
  type: "track" | "mixtape"
}

export function PlayerModal({
  isOpen,
  onClose,
  embedUrl,
  title,
  artistName,
  platform,
  type,
}: PlayerModalProps) {
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
    
    // Spotify
    if (url.includes("spotify.com")) {
      // Spotify ne supporte pas autoplay de la même façon
      return url
    }
    
    return url
  }

  const autoplayUrl = getAutoplayUrl(embedUrl)

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-lg font-semibold line-clamp-1">
                {title}
              </DialogTitle>
              {artistName && (
                <p className="text-sm text-muted-foreground mt-1">{artistName}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {platform && (
                <Badge variant="secondary" className="shrink-0">
                  {platform}
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className={type === "mixtape" ? "aspect-[3/1] w-full" : "aspect-video w-full"}>
          <iframe
            src={autoplayUrl}
            title={`Lecteur pour ${title}`}
            className="h-full w-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
