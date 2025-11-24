import { apiMutation } from "@/lib/api-helpers"
import { fetcher } from "@/lib/fetcher"
import type {
    AddCollaborationRequest,
    CollaborationDto,
    GetPartnersParams,
    GetPartnerTracksParams,
    PaginatedPartnersResponse,
    PaginatedTracksResponse,
    PartnerCollaborationsResponse,
    PartnerDashboardDto,
    PartnerDetailDto,
    RegisterPartnerRequest,
    UpdatePartnerRequest,
} from "./partners.types"

export const partnersApi = {
  // GET - Liste des partenaires
  getPartners: (params: GetPartnersParams) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString()
        }
        return acc
      }, {} as Record<string, string>)
    ).toString()
    
    return fetcher<PaginatedPartnersResponse>(
      `/partners?${queryString}`
    )
  },
  
  // GET - Profil partenaire
  getPartnerById: (id: string) =>
    fetcher<PartnerDetailDto>(`/partners/${id}`),
  
  // GET - Dashboard partenaire (protégé)
  getPartnerDashboard: (id: string) =>
    fetcher<PartnerDashboardDto>(`/partners/${id}/dashboard`),
  
  // GET - Tracks d'un partenaire
  getPartnerTracks: (id: string, params: GetPartnerTracksParams) => {
    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null) {
          acc[key] = value.toString()
        }
        return acc
      }, {} as Record<string, string>)
    ).toString()
    
    return fetcher<PaginatedTracksResponse>(
      `/partners/${id}/tracks?${queryString}`
    )
  },
  
  // POST - Devenir partenaire
  registerPartner: (data: RegisterPartnerRequest) =>
    apiMutation<RegisterPartnerRequest, PartnerDetailDto>(
      "/partners/register",
      "POST",
      data,
      {
        revalidate: ["/users/me"], // Refresh user pour voir le nouveau rôle
      }
    ),
  
  // PUT - Mettre à jour le profil
  updatePartner: (id: string, data: UpdatePartnerRequest) =>
    apiMutation<UpdatePartnerRequest, PartnerDetailDto>(
      `/partners/${id}`,
      "PUT",
      data,
      {
        revalidate: [`/partners/${id}`, `/partners/${id}/dashboard`],
      }
    ),
  
  // POST - Ajouter une collaboration
  addCollaboration: (data: AddCollaborationRequest) =>
    apiMutation<AddCollaborationRequest, CollaborationDto>(
      "/partners/collaborations",
      "POST",
      data,
      {
        revalidate: [`/partners/${data.collaboratorPartnerId}/collaborations`],
      }
    ),
  
  // GET - Collaborations d'un partenaire
  getPartnerCollaborations: (id: string) =>
    fetcher<PartnerCollaborationsResponse>(`/partners/${id}/collaborations`),
  
  // DELETE - Supprimer une collaboration
  removeCollaboration: (collaborationId: string) =>
    apiMutation<undefined, void>(
      `/partners/collaborations/${collaborationId}`,
      "DELETE",
      undefined
    ),
}
