"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Check, Copy, Share2 } from "lucide-react"
import { useState } from "react"
import { useShare } from "../hooks/useShare"

interface ShareButtonProps {
  trackId?: string
  mixtapeId?: string
  title?: string
  size?: "sm" | "default" | "lg" | "icon"
  variant?: "outline" | "ghost" | "default"
  className?: string
}

export function ShareButton({
  trackId,
  mixtapeId,
  title,
  size = "icon",
  variant = "outline",
  className,
}: ShareButtonProps) {
  const { createShareLink, copyToClipboard, shareData, isLoading } = useShare()
  const [copied, setCopied] = useState(false)
  const [open, setOpen] = useState(false)

  const handleOpen = async (isOpen: boolean) => {
    setOpen(isOpen)
    if (isOpen && !shareData) {
      try {
        await createShareLink({ trackId, mixtapeId })
      } catch {
        // Erreur gérée dans le hook
      }
    }
  }

  const handleCopy = async () => {
    const success = await copyToClipboard()
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={className}
          title="Partager"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Partager {title || "ce contenu"}</DialogTitle>
          <DialogDescription>
            Copiez le lien ci-dessous pour partager ce contenu avec vos amis.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-2">
          <Input
            value={shareData?.url || "Génération du lien..."}
            readOnly
            className="flex-1"
          />
          <Button
            onClick={handleCopy}
            disabled={isLoading || !shareData?.url}
            variant="outline"
          >
            {copied ? (
              <Check className={cn("h-4 w-4 text-green-500")} />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        {shareData?.expiresAt && (
          <p className="text-xs text-muted-foreground">
            Ce lien expire le {new Date(shareData.expiresAt).toLocaleDateString("fr-FR")}
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}
