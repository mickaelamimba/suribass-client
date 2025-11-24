"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
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
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import useSWR from "swr"
import { partnersApi } from "../api/partners.api"
import type { PartnerCollaborationsResponse } from "../api/partners.types"
import { AddCollaborationForm } from "./AddCollaborationForm"

interface CollaborationManagerProps {
  partnerId: string
}

export function CollaborationManager({ partnerId }: CollaborationManagerProps) {
  const { data, mutate } = useSWR<PartnerCollaborationsResponse>(
    `/partners/${partnerId}/collaborations`,
    () => partnersApi.getPartnerCollaborations(partnerId)
  )
  const { toast } = useToast()
  const [isAddOpen, setIsAddOpen] = useState(false)

  const handleDelete = async (collaborationId: string) => {
    try {
      await partnersApi.removeCollaboration(collaborationId)
      mutate()
      toast({
        title: "Collaboration supprimée",
        description: "La collaboration a été retirée avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la collaboration.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Collaborations</h2>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter une collaboration
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nouvelle collaboration</DialogTitle>
            </DialogHeader>
            <AddCollaborationForm 
              partnerId={partnerId} 
              onSuccess={() => {
                setIsAddOpen(false)
                mutate()
              }} 
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* With Collaborators */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Mes featurings (sur mes tracks)</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Track</TableHead>
                <TableHead>Collaborateur</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!data?.withCollaborators.length ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    Aucune collaboration sur vos tracks.
                  </TableCell>
                </TableRow>
              ) : (
                data.withCollaborators.map((collab) => (
                  <TableRow key={collab.id}>
                    <TableCell className="font-medium">{collab.trackTitle}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={collab.partnerAvatarUrl || undefined} />
                          <AvatarFallback>{collab.partnerName[0]}</AvatarFallback>
                        </Avatar>
                        <span>{collab.partnerName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{collab.role}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleDelete(collab.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* As Collaborator */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Apparitions (sur tracks des autres)</h3>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Track</TableHead>
                <TableHead>Artiste principal</TableHead>
                <TableHead>Mon Rôle</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!data?.asCollaborator.length ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center text-muted-foreground">
                    Aucune apparition ailleurs.
                  </TableCell>
                </TableRow>
              ) : (
                data.asCollaborator.map((collab) => (
                  <TableRow key={collab.id}>
                    <TableCell className="font-medium">{collab.trackTitle}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={collab.partnerAvatarUrl || undefined} />
                          <AvatarFallback>{collab.partnerName[0]}</AvatarFallback>
                        </Avatar>
                        <span>{collab.partnerName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{collab.role}</Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
