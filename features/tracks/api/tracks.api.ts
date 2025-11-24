import { apiMutation } from "@/lib/api-helpers"
import { fetcher } from "@/lib/fetcher"
import type {
    CreateTrackRequest,
    ExtractMetadataRequest,
    ExtractedMetadata,
    GetTracksParams,
    PaginatedTracksResponse,
    TrackDetailDto,
    UpdateTrackRequest,
} from "./tracks.types"

export const tracksApi = {
  // GET - Liste des tracks avec filtres et pagination
  getTracks: (params: GetTracksParams) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString()
        }
        return acc
      }, {} as Record<string, string>)
    ).toString()
    
    return fetcher<PaginatedTracksResponse>(
      `/tracks?${queryString}`
    )
  },
  
  // GET - Détail d'une track
  getTrackById: (id: string) =>
    fetcher<TrackDetailDto>(`/tracks/${id}`),
  
  // POST - Extraire métadonnées
  extractMetadata: (data: ExtractMetadataRequest) =>
    apiMutation<ExtractMetadataRequest, ExtractedMetadata>(
      "/tracks/extract-metadata",
      "POST",
      data
    ),
  
  // POST - Créer une track
  createTrack: (data: CreateTrackRequest) =>
    apiMutation<CreateTrackRequest, TrackDetailDto>(
      "/tracks",
      "POST",
      data,
      {
        revalidate: ["/tracks"],
      }
    ),
  
  // PUT - Mettre à jour une track
  updateTrack: (id: string, data: UpdateTrackRequest) =>
    apiMutation<UpdateTrackRequest, TrackDetailDto>(
      `/tracks/${id}`,
      "PUT",
      data,
      {
        revalidate: [`/tracks/${id}`, "/tracks"],
      }
    ),
  
  // DELETE - Supprimer une track
  deleteTrack: (id: string) =>
    apiMutation<undefined, void>(
      `/tracks/${id}`,
      "DELETE",
      undefined,
      {
        revalidate: ["/tracks"],
      }
    ),
}
