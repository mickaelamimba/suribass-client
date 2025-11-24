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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import type { CategoryDto } from "../api/categories.types"
import { useCategories } from "../hooks/useCategories"
import { useDeleteCategory } from "../hooks/useDeleteCategory"
import { CreateCategoryForm } from "./CreateCategoryForm"
import { UpdateCategoryForm } from "./UpdateCategoryForm"

export function CategoriesAdminClient() {
  const { categories, isLoading, mutate } = useCategories()
  const { deleteCategory } = useDeleteCategory()
  const { toast } = useToast()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<CategoryDto | null>(null)

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id)
      toast({
        title: "Catégorie supprimée",
        description: "La catégorie a été supprimée avec succès.",
      })
      mutate()
    } catch {
      // Error handled by hook
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Catégories</h2>
          <p className="text-muted-foreground">
            Gérez les genres musicaux de la plateforme.
          </p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle Catégorie
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer une catégorie</DialogTitle>
              <DialogDescription>
                Ajoutez un nouveau genre musical au catalogue.
              </DialogDescription>
            </DialogHeader>
            <CreateCategoryForm
              onSuccess={() => {
                setIsCreateOpen(false)
                mutate()
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Tracks</TableHead>
              <TableHead>Mixtapes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                </TableCell>
              </TableRow>
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  Aucune catégorie trouvée.
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {category.slug}
                  </TableCell>
                  <TableCell>{category.trackCount}</TableCell>
                  <TableCell>{category.mixtapeCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingCategory(category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action est irréversible. Cela supprimera la
                              catégorie "{category.name}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(category.id)}
                              className="bg-destructive hover:bg-destructive/90"
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!editingCategory}
        onOpenChange={(open) => !open && setEditingCategory(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier la catégorie</DialogTitle>
            <DialogDescription>
              Modifiez les informations de la catégorie.
            </DialogDescription>
          </DialogHeader>
          {editingCategory && (
            <UpdateCategoryForm
              category={editingCategory}
              onSuccess={() => {
                setEditingCategory(null)
                mutate()
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
