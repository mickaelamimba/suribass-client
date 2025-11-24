"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface FailedLoginsChartProps {
  data: {
    timestamp: string
    count: number
  }[]
}

export function FailedLoginsChart({ data = [] }: FailedLoginsChartProps) {
  const formattedData = (data || []).map(item => ({
    ...item,
    formattedDate: format(new Date(item.timestamp), "HH:mm", { locale: fr }),
    fullDate: format(new Date(item.timestamp), "PPpp", { locale: fr }),
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Échecs de connexion (24h)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="formattedDate" />
            <YAxis />
            <Tooltip 
              labelFormatter={(label, payload) => {
                if (payload && payload.length > 0) {
                  return payload[0].payload.fullDate
                }
                return label
              }}
            />
            <Line 
              type="monotone" 
              dataKey="count" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
