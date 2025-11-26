export interface CategoryDto {
  id: string
  name: string
  slug: string
  description: string | null
  trackCount: number
  mixtapeCount: number
}

export type CategoriesResponse = CategoryDto[]

export interface CreateCategoryRequest {
  name: string
  description?: string
}

export interface UpdateCategoryRequest {
  name?: string
  description?: string
}
