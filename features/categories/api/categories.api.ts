import { apiMutation } from "@/lib/api-helpers"
import { fetcher } from "@/lib/fetcher"
import type {
  CategoriesResponse,
  CategoryDto,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "./categories.types"

export const categoriesApi = {
  // GET - Liste toutes les catégories
  getCategories: (token?: string | null) =>
    fetcher<CategoriesResponse>("/categories", { token: token || undefined }),
  
  // GET - Catégorie par slug
  getCategoryBySlug: (slug: string, token?: string | null) =>
    fetcher<CategoryDto>(`/categories/${slug}`, { token: token || undefined }),
  
  // POST - Créer une catégorie (Admin only)
  createCategory: (data: CreateCategoryRequest, token?: string | null) =>
    apiMutation<CreateCategoryRequest, CategoryDto>(
      "/categories",
      "POST",
      data,
      {
        revalidate: ["/categories"],
        token,
      }
    ),
  
  // PUT - Mettre à jour une catégorie (Admin only)
  updateCategory: (id: string, data: UpdateCategoryRequest, token?: string | null) =>
    apiMutation<UpdateCategoryRequest, CategoryDto>(
      `/categories/${id}`,
      "PUT",
      data,
      {
        revalidate: ["/categories"],
        token,
      }
    ),
  
  // DELETE - Supprimer une catégorie (Admin only)
  deleteCategory: (id: string, token?: string | null) =>
    apiMutation<undefined, void>(
      `/categories/${id}`,
      "DELETE",
      undefined,
      {
        revalidate: ["/categories"],
        token,
      }
    ),
}
