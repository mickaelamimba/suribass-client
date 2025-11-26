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
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { RefreshCw } from "lucide-react"
import { useRefreshScores } from "../hooks/useRefreshScores"

export function ScoreRefreshButton() {
  const { refresh, isLoading } = useRefreshScores()
  const { toast } = useToast()

  const handleRefresh = async () => {
    try {
      const result = await refresh()
      toast({
        title: "Recalcul lancé",
        description: result.message,
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de lancer le recalcul des scores",
        variant: "destructive",
      })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isLoading} variant="outline">
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Recalculer les scores
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Recalculer tous les scores ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action va recalculer tous les scores de popularité pour toutes les tracks et mixtapes.
            Le processus peut prendre plusieurs minutes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleRefresh}>
            Confirmer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
