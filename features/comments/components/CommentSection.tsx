"use client"

import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/features/auth"
import { MessageSquare } from "lucide-react"
import { useMixtapeComments } from "../hooks/useMixtapeComments"
import { useTrackComments } from "../hooks/useTrackComments"
import { CommentForm } from "./CommentForm"
import { CommentList } from "./CommentList"
import { LoginPrompt } from "./LoginPrompt"

interface CommentSectionProps {
  trackId?: string
  mixtapeId?: string
}

export function CommentSection({ trackId, mixtapeId }: CommentSectionProps) {
  const { user } = useAuth()

  // Utiliser le hook approprié selon le type de contenu
  const trackCommentsHook = useTrackComments(trackId || "", {})
  const mixtapeCommentsHook = useMixtapeComments(mixtapeId || "", {})

  const { comments, isLoading, mutate } = trackId
    ? trackCommentsHook
    : mixtapeCommentsHook

  const handleCommentUpdate = () => {
    mutate()
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-6 w-6" />
        <h2 className="text-2xl font-bold">
          Commentaires
          {comments && comments.length > 0 && (
            <span className="ml-2 text-lg font-normal text-muted-foreground">
              ({comments.length})
            </span>
          )}
        </h2>
      </div>

      <Separator />

      <div className="space-y-8">
        {/* Formulaire de commentaire ou prompt de connexion */}
        {user ? (
          <div>
            <h3 className="mb-4 text-lg font-semibold">Laisser un commentaire</h3>
            <CommentForm
              trackId={trackId}
              mixtapeId={mixtapeId}
              onCommentAdded={handleCommentUpdate}
            />
          </div>
        ) : (
          <LoginPrompt />
        )}

        {/* Liste des commentaires */}
        <div>
          <CommentList
            comments={comments || []}
            isLoading={isLoading}
            onCommentUpdated={handleCommentUpdate}
          />
        </div>
      </div>
    </section>
  )
}
