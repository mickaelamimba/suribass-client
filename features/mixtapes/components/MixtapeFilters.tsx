"use client"

import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"
import type { MixtapeFiltersData } from "../schemas/mixtape.schema"

// TODO: Remplacer par les vraies catégories depuis l'API
const CATEGORIES = [
  { id: "all", name: "Toutes les catégories" },
  { id: "hip-hop", name: "Hip Hop" },
  { id: "rnb", name: "R&B" },
  { id: "afrobeat", name: "Afrobeat" },
  { id: "dancehall", name: "Dancehall" },
]

interface MixtapeFiltersProps {
  filters: MixtapeFiltersData
  onFiltersChange: (filters: MixtapeFiltersData) => void
}

export function MixtapeFilters({ filters, onFiltersChange }: MixtapeFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative flex-1 sm:max-w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une mixtape..."
            className="pl-9"
            value={filters.search || ""}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          />
        </div>
        
        <Select
          value={filters.categoryId || "all"}
          onValueChange={(value) => 
            onFiltersChange({ ...filters, categoryId: value === "all" ? undefined : value })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Select
        value={filters.sortBy || "recent"}
        onValueChange={(value: any) => onFiltersChange({ ...filters, sortBy: value })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Trier par" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Plus récents</SelectItem>
          <SelectItem value="popular">Plus populaires</SelectItem>
          <SelectItem value="score">Meilleur score</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
