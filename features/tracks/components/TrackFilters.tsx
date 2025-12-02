"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CategorySelect } from "@/features/categories/components/CategorySelect"
import { Search, X } from "lucide-react"
import { useTrackFilters } from "../hooks/useTrackFilters"

export function TrackFilters() {
  const { filters, updateFilters, clearFilters } = useTrackFilters()

  const hasFilters = filters.search || filters.categoryId || filters.sortBy !== "recent"

  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-end">
      <div className="flex-1 space-y-2">
        <Label>Recherche</Label>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Titre, description..."
            value={filters.search || ""}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="pl-8"
          />
        </div>
      </div>

      <div className="w-full space-y-2 md:w-48">
        <Label>Catégorie</Label>
        <CategorySelect
          value={filters.categoryId || undefined}
          onValueChange={(value) => updateFilters({ categoryId: value })}
        />
      </div>

      <div className="w-full space-y-2 md:w-48">
        <Label>Trier par</Label>
        <Select
          value={filters.sortBy}
          onValueChange={(value: "recent" | "popular" | "score") => updateFilters({ sortBy: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Plus récents</SelectItem>
            <SelectItem value="popular">Plus populaires</SelectItem>
            <SelectItem value="score">Meilleur score</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {hasFilters && (
        <Button 
          variant="ghost" 
          onClick={clearFilters}
          className="mb-0.5"
        >
          <X className="mr-2 h-4 w-4" />
          Effacer
        </Button>
      )}
    </div>
  )
}
