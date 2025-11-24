"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    CartesianGrid,
    Cell,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import type { PartnerDashboardDto } from "../api/partners.types"
import { PartnerStats } from "./PartnerStats"

interface PartnerDashboardProps {
  dashboard: PartnerDashboardDto
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export function PartnerDashboard({ dashboard }: PartnerDashboardProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Overview Stats */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Vue d'ensemble</h2>
        <PartnerStats stats={dashboard.stats} />
      </section>

      {/* Analytics Charts */}
      <section className="grid gap-8 lg:grid-cols-2">
        {/* Views Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution des vues (30 jours)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboard.analytics.viewsTrend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                  fontSize={12}
                />
                <YAxis fontSize={12} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  contentStyle={{ borderRadius: '8px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Likes Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution des likes (30 jours)</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dashboard.analytics.likesTrend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                  fontSize={12}
                />
                <YAxis fontSize={12} />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  contentStyle={{ borderRadius: '8px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="likes" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Tracks by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition par catégorie</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboard.analytics.tracksByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {dashboard.analytics.tracksByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
