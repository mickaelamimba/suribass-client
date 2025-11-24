"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { RefreshCw } from "lucide-react"
import { useState } from "react"
import { useSyncMixtapes } from "../hooks/useSyncMixtapes"

export function SyncButton() {
  const [open, setOpen] = useState(false)
  const [tags, setTags] = useState("")
  const { sync, isLoading } = useSyncMixtapes()
  const { toast } = useToast()

  const handleSync = async () => {
    try {
      const tagList = tags ? tags.split(",").map(t => t.trim()) : undefined
      const result = await sync({ tags: tagList })
      
      if (result) {
        toast({
          title: "Synchronisation terminée",
          description: `${result.newMixtapes} ajoutées, ${result.updatedMixtapes} mises à jour.`,
        })
        setOpen(false)
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "La synchronisation a échoué.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <RefreshCw className="mr-2 h-4 w-4" />
          Synchroniser SoundCloud
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Synchroniser les mixtapes</DialogTitle>
          <DialogDescription>
            Cette action va récupérer les dernières mixtapes depuis SoundCloud.
            Cela peut prendre quelques instants.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="tags" className="text-right">
              Tags (opt)
            </Label>
            <Input
              id="tags"
              placeholder="hip-hop, rnb"
              className="col-span-3"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSync} disabled={isLoading}>
            {isLoading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Synchronisation...
              </>
            ) : (
              "Lancer la synchronisation"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
