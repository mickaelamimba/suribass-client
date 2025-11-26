"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send } from "lucide-react"
import { useState } from "react"
import { useAddComment } from "../hooks/useAddComment"

interface CommentFormProps {
  trackId?: string
  mixtapeId?: string
  onCommentAdded?: () => void
}

export function CommentForm({ trackId, mixtapeId, onCommentAdded }: CommentFormProps) {
  const [content, setContent] = useState("")
  const { addComment, isLoading } = useAddComment()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      toast({
        title: "Erreur",
        description: "Le commentaire ne peut pas être vide",
        variant: "destructive",
      })
      return
    }

    if (content.length > 1000) {
      toast({
        title: "Erreur",
        description: "Le commentaire ne peut pas dépasser 1000 caractères",
        variant: "destructive",
      })
      return
    }

    try {
      await addComment({ content, trackId, mixtapeId })
      setContent("")
      toast({
        title: "Commentaire ajouté",
        description: "Votre commentaire a été publié avec succès",
      })
      onCommentAdded?.()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le commentaire",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Partagez votre avis, vos impressions..."
        className="min-h-[120px] resize-none"
        disabled={isLoading}
      />
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {content.length}/1000 caractères
        </span>
        <Button type="submit" disabled={isLoading || !content.trim()}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Publication...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Publier
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
