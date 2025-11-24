"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CheckCircle, Disc3, Music, XCircle } from "lucide-react"
import { useState } from "react"
import type { ModerationItemDto } from "../api/admin.types"

interface ModerationItemProps {
  item: ModerationItemDto
  onModerate: (commentId: string, status: 'Approved' | 'Rejected', reason?: string) => void
  isLoading?: boolean
}

export function ModerationItem({ item, onModerate, isLoading }: ModerationItemProps) {
  const [showRejectDialog, setShowRejectDialog] = useState(false)
  const [rejectReason, setRejectReason] = useState("")

  const handleApprove = () => {
    onModerate(item.commentId, 'Approved')
  }

  const handleReject = () => {
    onModerate(item.commentId, 'Rejected', rejectReason || undefined)
    setShowRejectDialog(false)
    setRejectReason("")
  }

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{item.username}</span>
                  <Badge variant={item.aiSuggestion === 'Approve' ? 'default' : 'destructive'}>
                    IA: {item.aiSuggestion === 'Approve' ? 'Approuver' : 'Rejeter'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {item.trackId ? (
                    <div className="flex items-center gap-1">
                      <Music className="h-3 w-3" />
                      Track
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <Disc3 className="h-3 w-3" />
                      Mixtape
                    </div>
                  )}
                  <span>·</span>
                  <span>{item.contentTitle}</span>
                  <span>·</span>
                  <span>{format(new Date(item.createdAt), "PPp", { locale: fr })}</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="rounded-md bg-muted p-3">
              <p className="text-sm">{item.content}</p>
            </div>

            {/* AI Reason */}
            {item.aiReason && (
              <div className="text-xs text-muted-foreground">
                <strong>Raison IA:</strong> {item.aiReason}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                onClick={handleApprove}
                disabled={isLoading}
                variant="default"
                size="sm"
                className="flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Approuver
              </Button>
              <Button
                onClick={() => setShowRejectDialog(true)}
                disabled={isLoading}
                variant="destructive"
                size="sm"
                className="flex items-center gap-2"
              >
                <XCircle className="h-4 w-4" />
                Rejeter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reject Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rejeter le commentaire</AlertDialogTitle>
            <AlertDialogDescription>
              Voulez-vous ajouter une raison pour le rejet ? (optionnel)
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            placeholder="Raison du rejet..."
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            className="min-h-[100px]"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleReject}>
              Rejeter
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
