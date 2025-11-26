"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/features/auth"
import { usePartners } from "@/features/partners/hooks/usePartners"
import { Search } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { PartnerGrid } from "./PartnerGrid"

export function PartnersListClient() {
  const [search, setSearch] = useState("")
  const { partners, isLoading } = usePartners({
    pageIndex: 1,
    pageSize: 20,
    search: search || undefined,
  })
  const { user } = useAuth()

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Partenaires</h1>
          <p className="text-muted-foreground">
            Découvrez nos artistes partenaires et leurs créations exclusives.
          </p>
        </div>
        
        {user && user.role !== "Partner" && (
          <Button asChild>
            <Link href="/partners/register">Devenir Partenaire</Link>
          </Button>
        )}
      </div>

      <div className="mb-8 flex max-w-sm items-center space-x-2">
        <Input
          placeholder="Rechercher un artiste..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button size="icon" variant="ghost">
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <PartnerGrid partners={partners} isLoading={isLoading} />
    </div>
  )
}
