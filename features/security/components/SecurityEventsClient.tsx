"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SecurityEventsTable } from "@/features/security/components"
import { useSecurityEvents } from "@/features/security/hooks/useSecurityEvents"

export function SecurityEventsClient() {
  const { events, isLoading } = useSecurityEvents({
    pageIndex: 1,
    pageSize: 50,
  })

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Journal des événements de sécurité</CardTitle>
        </CardHeader>
        <CardContent>
          <SecurityEventsTable data={events} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  )
}
