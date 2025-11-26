import type { CategoryDto } from "../api/categories.types"
import { CategoryBadge } from "./CategoryBadge"

interface CategoryListProps {
  categories: CategoryDto[]
  selectedCategoryId?: string
  onSelectCategory?: (categoryId: string) => void
}

export function CategoryList({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <CategoryBadge
          key={category.id}
          category={category}
          variant={selectedCategoryId === category.id ? "default" : "outline"}
          onClick={() => onSelectCategory?.(category.id)}
        />
      ))}
    </div>
  )
}
