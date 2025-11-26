"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Unlock } from "lucide-react"
import type { PaginatedBlockedIPsResponse } from "../api/security.types"
import { useUnblockIP } from "../hooks/useUnblockIP"

interface BlockedIPsTableProps {
  data: PaginatedBlockedIPsResponse | undefined
  isLoading: boolean
  onRefresh: () => void
}

export function BlockedIPsTable({ data, isLoading, onRefresh }: BlockedIPsTableProps) {
  const { unblockIP, isLoading: isUnblocking } = useUnblockIP()
  const { toast } = useToast()

  const handleUnblock = async (ip: string) => {
    try {
      await unblockIP(ip)
      toast({
        title: "IP débloquée",
        description: `L'adresse IP ${ip} a été débloquée avec succès.`,
      })
      onRefresh()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de débloquer l'IP.",
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

  if (!data || !data.items || data.items.length === 0) {
    return (
      <Alert>
        <AlertDescription>Aucune adresse IP bloquée.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Adresse IP</TableHead>
            <TableHead>Raison</TableHead>
            <TableHead>Tentatives</TableHead>
            <TableHead>Bloqué le</TableHead>
            <TableHead>Expire le</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-mono">{item.ipAddress}</TableCell>
              <TableCell>{item.reason}</TableCell>
              <TableCell>{item.attempts}</TableCell>
              <TableCell>{format(new Date(item.blockedAt), "PP p", { locale: fr })}</TableCell>
              <TableCell>
                {item.expiresAt
                  ? format(new Date(item.expiresAt), "PP p", { locale: fr })
                  : "Permanent"}
              </TableCell>
              <TableCell>
                <Badge variant={item.isActive ? "destructive" : "secondary"}>
                  {item.isActive ? "Actif" : "Expiré"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                {item.isActive && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleUnblock(item.ipAddress)}
                    disabled={isUnblocking}
                  >
                    <Unlock className="mr-2 h-4 w-4" />
                    Débloquer
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
