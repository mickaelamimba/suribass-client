import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs"

const sortByOptions = ["recent", "popular", "score"] as const

export function useMixtapeFilters() {
  const [filters, setFilters] = useQueryStates(
    {
      search: parseAsString.withDefault(""),
      categoryId: parseAsString,
      sortBy: parseAsStringEnum(sortByOptions).withDefault("recent"),
    },
    {
      history: "push",
      shallow: false,
    }
  )

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      categoryId: null,
      sortBy: "recent",
    })
  }

  // Convertir pour l'API (enlever les valeurs vides)
  const apiFilters = {
    search: filters.search || undefined,
    categoryId: filters.categoryId || undefined,
    sortBy: filters.sortBy,
  }

  return {
    filters,
    apiFilters,
    setFilters,
    updateFilters,
    clearFilters,
  }
}
