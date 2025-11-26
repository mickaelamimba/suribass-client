import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { CategoryDto } from "../api/categories.types"

interface CategoryBadgeProps {
  category: CategoryDto
  onClick?: () => void
  variant?: "default" | "outline" | "secondary" | "destructive"
  className?: string
}

export function CategoryBadge({
  category,
  onClick,
  variant = "secondary",
  className,
}: CategoryBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={cn(
        "cursor-pointer transition-colors hover:bg-secondary/80",
        onClick && "cursor-pointer",
        className
      )}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault()
          e.stopPropagation()
          onClick()
        }
      }}
    >
      {category.name}
    </Badge>
  )
}
