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
import { Search } from "lucide-react"
import type { TrackFiltersData } from "../schemas/track.schema"

interface TrackFiltersProps {
  filters: TrackFiltersData
  onFiltersChange: (filters: TrackFiltersData) => void
}

export function TrackFilters({ filters, onFiltersChange }: TrackFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border bg-card p-4 md:flex-row md:items-end">
      <div className="flex-1 space-y-2">
        <Label>Recherche</Label>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Titre, description..."
            value={filters.search || ""}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-8"
          />
        </div>
      </div>

      <div className="w-full space-y-2 md:w-48">
        <Label>Catégorie</Label>
        <CategorySelect
          value={filters.categoryId}
          onValueChange={(value) => onFiltersChange({ ...filters, categoryId: value })}
        />
      </div>

      <div className="w-full space-y-2 md:w-48">
        <Label>Trier par</Label>
        <Select
          value={filters.sortBy || "recent"}
          onValueChange={(value: any) => onFiltersChange({ ...filters, sortBy: value })}
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
      
      {filters.categoryId && (
        <Button 
          variant="ghost" 
          onClick={() => onFiltersChange({ ...filters, categoryId: undefined })}
          className="mb-0.5"
        >
          Effacer filtres
        </Button>
      )}
    </div>
  )
}
