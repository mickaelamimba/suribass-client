"use client"

import { AnimatePresence, motion } from "framer-motion"
import type { CommentDto } from "../api/comments.types"
import { CommentItem } from "./CommentItem"

interface CommentListProps {
  comments: CommentDto[]
  isLoading?: boolean
  onCommentUpdated?: () => void
}

export function CommentList({ comments, isLoading, onCommentUpdated }: CommentListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-4 animate-pulse">
            <div className="h-10 w-10 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-20 rounded-lg bg-muted" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <p className="text-muted-foreground">
          Aucun commentaire pour le moment. Soyez le premier à commenter !
        </p>
      </div>
    )
  }

  return (
    <AnimatePresence mode="popLayout">
      <div className="space-y-6">
        {comments.map((comment, index) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: index * 0.05 }}
          >
            <CommentItem comment={comment} onCommentUpdated={onCommentUpdated} />
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  )
}
