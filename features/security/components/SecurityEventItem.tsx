import { TableCell, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { SecurityEventDto } from "../api/security.types"
import { SecurityAlertBadge } from "./SecurityAlertBadge"

interface SecurityEventItemProps {
  event: SecurityEventDto
}

export function SecurityEventItem({ event }: SecurityEventItemProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex flex-col">
          <span>{event.eventType}</span>
          <span className="text-xs text-muted-foreground">{event.message}</span>
        </div>
      </TableCell>
      <TableCell>
        <SecurityAlertBadge severity={event.severity} />
      </TableCell>
      <TableCell>
        <div className="flex flex-col text-sm">
          <span>{event.ipAddress}</span>
          {event.geolocation && (
            <span className="text-xs text-muted-foreground">
              {event.geolocation.city}, {event.geolocation.country}
            </span>
          )}
        </div>
      </TableCell>
      <TableCell>
        {event.username ? (
          <div className="flex flex-col text-sm">
            <span>{event.username}</span>
            <span className="text-xs text-muted-foreground">{event.userId}</span>
          </div>
        ) : (
          <span className="text-muted-foreground">-</span>
        )}
      </TableCell>
      <TableCell className="text-right">
        {format(new Date(event.timestamp), "PP p", { locale: fr })}
      </TableCell>
    </TableRow>
  )
}
