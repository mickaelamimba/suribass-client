"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import type { PaginatedSecurityEventsResponse } from "../api/security.types"
import { SecurityEventItem } from "./SecurityEventItem"

interface SecurityEventsTableProps {
  data: PaginatedSecurityEventsResponse | undefined
  isLoading: boolean
}

export function SecurityEventsTable({ data, isLoading }: SecurityEventsTableProps) {
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
        <AlertDescription>Aucun événement de sécurité trouvé.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Événement</TableHead>
            <TableHead>Sévérité</TableHead>
            <TableHead>Source (IP)</TableHead>
            <TableHead>Utilisateur</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.items.map((event) => (
            <SecurityEventItem key={event.id} event={event} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
