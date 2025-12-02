"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CategorySelect } from "@/features/categories/components/CategorySelect"
import { Search, X } from "lucide-react"
import { useMixtapeFilters } from "../hooks/useMixtapeFilters"

export function MixtapeFilters() {
  const { filters, updateFilters, clearFilters } = useMixtapeFilters()

  const hasFilters = filters.search || filters.categoryId || filters.sortBy !== "recent"

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <div className="relative flex-1 sm:max-w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une mixtape..."
            className="pl-9"
            value={filters.search || ""}
            onChange={(e) => updateFilters({ search: e.target.value })}
          />
        </div>
        
        <div className="w-[200px]">
          <CategorySelect
            value={filters.categoryId || undefined}
            onValueChange={(value) => updateFilters({ categoryId: value })}
            placeholder="Toutes les catégories"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={filters.sortBy}
          onValueChange={(value: "recent" | "popular" | "score") => updateFilters({ sortBy: value })}
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

        {hasFilters && (
          <Button variant="ghost" size="icon" onClick={clearFilters}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
