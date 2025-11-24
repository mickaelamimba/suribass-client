import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Disc, Music } from "lucide-react"
import Link from "next/link"
import type { CategoryDto } from "../api/categories.types"

interface CategoryCardProps {
  category: CategoryDto
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Card className="flex h-full flex-col transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle className="line-clamp-1">{category.name}</CardTitle>
        <CardDescription className="line-clamp-2 min-h-[2.5rem]">
          {category.description || "Aucune description"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Music className="h-4 w-4" />
            <span>{category.trackCount} tracks</span>
          </div>
          <div className="flex items-center gap-1">
            <Disc className="h-4 w-4" />
            <span>{category.mixtapeCount} mixtapes</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="secondary">
          <Link href={`/categories/${category.slug}`}>Explorer</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
