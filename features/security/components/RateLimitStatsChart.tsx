"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface RateLimitStatsChartProps {
  data: {
    timestamp: string
    count: number
  }[]
}

export function RateLimitStatsChart({ data = [] }: RateLimitStatsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rate Limit Hits Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" tickFormatter={(val) => new Date(val).toLocaleTimeString()} />
            <YAxis />
            <Tooltip labelFormatter={(val) => new Date(val).toLocaleString()} />
            <Bar dataKey="count" fill="hsl(var(--primary))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
