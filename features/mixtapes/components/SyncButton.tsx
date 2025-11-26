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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useCategories } from "@/features/categories/hooks/useCategories"
import { useToast } from "@/hooks/use-toast"
import { RefreshCw } from "lucide-react"
import { useState } from "react"
import { useSyncMixtapes } from "../hooks/useSyncMixtapes"

export function SyncButton() {
  const [open, setOpen] = useState(false)
  const [tags, setTags] = useState("")
  const [defaultCategoryId, setDefaultCategoryId] = useState<string>("")
  const { sync, isLoading } = useSyncMixtapes()
  const { categories, isLoading: isLoadingCategories } = useCategories()
  const { toast } = useToast()

  const handleSync = async () => {
    try {
      // Envoyer tags comme string et defaultCategoryId
      const result = await sync({
        tags: tags || undefined,
        defaultCategoryId: defaultCategoryId || undefined,
      })
      
      if (result) {
        toast({
          title: "Synchronisation terminée",
          description: `${result.newMixtapes} ajoutées, ${result.updatedMixtapes} mises à jour.`,
        })
        setOpen(false)
        setTags("")
        setDefaultCategoryId("")
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
              Tags
            </Label>
            <Input
              id="tags"
              placeholder="remix"
              className="col-span-3"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Catégorie
            </Label>
            <Select
              value={defaultCategoryId}
              onValueChange={setDefaultCategoryId}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingCategories ? (
                  <SelectItem value="loading" disabled>
                    Chargement...
                  </SelectItem>
                ) : categories.length === 0 ? (
                  <SelectItem value="empty" disabled>
                    Aucune catégorie
                  </SelectItem>
                ) : (
                  categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSync} disabled={isLoading || !defaultCategoryId}>
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
