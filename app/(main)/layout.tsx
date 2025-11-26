
import { AppSidebar } from "@/components/layout/AppSidebar"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar className="hidden md:flex" />
      <main className="flex-1 overflow-y-auto bg-background p-6">
        {children}
      </main>
    </div>
  )
}
