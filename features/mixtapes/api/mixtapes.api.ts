import { apiMutation } from "@/lib/api-helpers"
import { fetcher } from "@/lib/fetcher"
import type {
    GetMixtapesParams,
    MixtapeDetailDto,
    PaginatedMixtapesResponse,
    SyncResultDto,
    SyncSoundCloudRequest,
    UpdateMixtapeRequest,
} from "./mixtapes.types"

export const mixtapesApi = {
  // GET - Liste des mixtapes avec filtres et pagination
  getMixtapes: (params: GetMixtapesParams) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString()
        }
        return acc
      }, {} as Record<string, string>)
    ).toString()
    
    return fetcher<PaginatedMixtapesResponse>(
      `/mixtapes?${queryString}`
    )
  },
  
  // GET - Détail d'une mixtape
  getMixtapeById: (id: string) =>
    fetcher<MixtapeDetailDto>(`/mixtapes/${id}`),
  
  // POST - Synchroniser depuis SoundCloud (Admin only)
  syncFromSoundCloud: (data?: SyncSoundCloudRequest) =>
    apiMutation<SyncSoundCloudRequest | undefined, SyncResultDto>(
      "/mixtapes/sync",
      "POST",
      data,
      {
        revalidate: ["/mixtapes"], // Invalide la liste des mixtapes
      }
    ),
  
  // PUT - Mettre à jour une mixtape (Admin only)
  updateMixtape: (id: string, data: UpdateMixtapeRequest) =>
    apiMutation<UpdateMixtapeRequest, MixtapeDetailDto>(
      `/mixtapes/${id}`,
      "PUT",
      data,
      {
        revalidate: [`/mixtapes/${id}`, "/mixtapes"],
      }
    ),
}
