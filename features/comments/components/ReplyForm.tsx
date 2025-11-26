"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Send, X } from "lucide-react"
import { useState } from "react"
import { useReplyToComment } from "../hooks/useReplyToComment"

interface ReplyFormProps {
  commentId: string
  onReplySent?: () => void
  onCancel?: () => void
}

export function ReplyForm({ commentId, onReplySent, onCancel }: ReplyFormProps) {
  const [content, setContent] = useState("")
  const { replyToComment, isLoading } = useReplyToComment()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) {
      toast({
        title: "Erreur",
        description: "La réponse ne peut pas être vide",
        variant: "destructive",
      })
      return
    }

    try {
      await replyToComment(commentId, { content })
      setContent("")
      toast({
        title: "Réponse publiée",
        description: "Votre réponse a été ajoutée au commentaire",
      })
      onReplySent?.()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la réponse",
        variant: "destructive",
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border bg-background p-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Écrivez votre réponse..."
        className="min-h-[80px] resize-none"
        disabled={isLoading}
        autoFocus
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {content.length}/1000
        </span>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancel}
            disabled={isLoading}
          >
            <X className="mr-1 h-3 w-3" />
            Annuler
          </Button>
          <Button type="submit" size="sm" disabled={isLoading || !content.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                Envoi...
              </>
            ) : (
              <>
                <Send className="mr-1 h-3 w-3" />
                Répondre
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
