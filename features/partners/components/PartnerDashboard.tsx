"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Activity } from "lucide-react"
import type { PartnerDashboardDto } from "../api/partners.types"
import { PartnerStats } from "./PartnerStats"

interface PartnerDashboardProps {
  dashboard: PartnerDashboardDto
}

export function PartnerDashboard({ dashboard }: PartnerDashboardProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Overview Stats */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Vue d'ensemble</h2>
        <PartnerStats stats={dashboard.stats} />
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Activité Récente</h2>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Dernières actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            {dashboard.recentActivity && dashboard.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {dashboard.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.type}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      {activity.occurredAt && (
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(activity.occurredAt), "PPP 'à' HH:mm", { locale: fr })}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Aucune activité récente.</p>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
