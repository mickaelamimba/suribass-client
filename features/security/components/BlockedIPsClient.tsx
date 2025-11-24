"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BlockedIPsTable, BlockIPDialog } from "@/features/security/components"
import { useBlockedIPs } from "@/features/security/hooks/useBlockedIPs"

export function BlockedIPsClient() {
  const { blockedIPs, isLoading, mutate } = useBlockedIPs({
    pageIndex: 1,
    pageSize: 50,
  })

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <BlockIPDialog onSuccess={() => mutate()} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Adresses IP Bloquées</CardTitle>
        </CardHeader>
        <CardContent>
          <BlockedIPsTable 
            data={blockedIPs} 
            isLoading={isLoading} 
            onRefresh={() => mutate()} 
          />
        </CardContent>
      </Card>
    </div>
  )
}
