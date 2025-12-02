import { SettingsTabs } from "@/features/admin/components/SettingsTabs"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Paramètres | Admin - SuribassMusic",
  description: "Configuration et paramètres de la plateforme SuribassMusic",
}

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">
          Configuration du service email, routes et autres paramètres système
        </p>
      </div>

      <SettingsTabs />
    </div>
  )
}
