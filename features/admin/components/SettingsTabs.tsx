"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Route, Settings } from "lucide-react"
import { RoutesConfigSection } from "./RoutesConfigSection"
import { SettingsAdminClient } from "./SettingsAdminClient"

export function SettingsTabs() {
  return (
    <Tabs defaultValue="email" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
        <TabsTrigger value="email" className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          Email
        </TabsTrigger>
        <TabsTrigger value="routes" className="flex items-center gap-2">
          <Route className="h-4 w-4" />
          Routes & Accès
        </TabsTrigger>
      </TabsList>

      <TabsContent value="email" className="space-y-6">
        <SettingsAdminClient />
      </TabsContent>

      <TabsContent value="routes" className="space-y-6">
        <RoutesConfigSection />
      </TabsContent>
    </Tabs>
  )
}
