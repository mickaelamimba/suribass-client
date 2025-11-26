"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/features/auth"
import { useToast } from "@/hooks/use-toast"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { motion } from "framer-motion"
import { MoreVertical, Reply, Trash2 } from "lucide-react"
import { useState } from "react"
import type { CommentDto } from "../api/comments.types"
import { useDeleteComment } from "../hooks/useDeleteComment"
import { ReplyForm } from "./ReplyForm"


interface CommentItemProps {
  comment: CommentDto
  onCommentUpdated?: () => void
}

export function CommentItem({ comment, onCommentUpdated }: CommentItemProps) {
  const { user } = useAuth()
  const { deleteComment, isLoading: isDeleting } = useDeleteComment()
  const { toast } = useToast()
  const [showReplyForm, setShowReplyForm] = useState(false)

  const canDelete = user && (user.id === comment.userId || user.role === "Admin")

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id)
      toast({
        title: "Commentaire supprimé",
        description: "Le commentaire a été supprimé avec succès",
      })
      onCommentUpdated?.()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le commentaire",
        variant: "destructive",
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="group relative"
    >
      <div className="flex gap-4">
        <Avatar className="h-10 w-10 shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary">
            {comment.userName[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="rounded-lg bg-muted p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{comment.userName}</span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), {
                    addSuffix: true,
                    locale: fr,
                  })}
                </span>
              </div>

              {canDelete && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <p className="whitespace-pre-wrap text-sm">{comment.content}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="h-8 text-xs"
            >
              <Reply className="mr-1 h-3 w-3" />
              Répondre
            </Button>

            {comment.replies && comment.replies.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {comment.replies.length} réponse{comment.replies.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          {showReplyForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <ReplyForm
                commentId={comment.id}
                onReplySent={() => {
                  setShowReplyForm(false)
                  onCommentUpdated?.()
                }}
                onCancel={() => setShowReplyForm(false)}
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
