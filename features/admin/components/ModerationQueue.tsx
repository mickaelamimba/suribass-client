"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { useModerateComment } from "../hooks/useModerateComment"
import { useModerationQueue } from "../hooks/useModerationQueue"
import { ModerationItem } from "./ModerationItem"

export function ModerationQueue() {
  const [page, setPage] = useState(1)
  const { moderation, isLoading, isError, mutate } = useModerationQueue({ pageIndex: page, pageSize: 20 })
  const { moderate, isLoading: isModerating } = useModerateComment()
  const { toast } = useToast()

  const handleModerate = async (commentId: string, status: 'Approved' | 'Rejected', reason?: string) => {
    try {
      await moderate(commentId, { status, reason })
      toast({
        title: "Succès",
        description: `Commentaire ${status === 'Approved' ? 'approuvé' : 'rejeté'}`,
      })
      mutate() // Revalider la queue
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de modérer le commentaire",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Erreur lors du chargement de la queue de modération
        </AlertDescription>
      </Alert>
    )
  }

  if (!moderation || !moderation.items || moderation.items.length === 0) {
    return (
      <Alert>
        <AlertDescription>
          Aucun commentaire en attente de modération
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* Items */}
      <div className="space-y-4">
        {(moderation.items || []).map((item) => (
          <ModerationItem
            key={item.commentId}
            item={item}
            onModerate={handleModerate}
            isLoading={isModerating}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Page {moderation.pageIndex} sur {moderation.totalPages} ({moderation.totalCount} total)
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => p - 1)}
            disabled={!moderation.hasPrevious || isModerating}
          >
            <ChevronLeft className="h-4 w-4" />
            Précédent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => p + 1)}
            disabled={!moderation.hasNext || isModerating}
          >
            Suivant
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
