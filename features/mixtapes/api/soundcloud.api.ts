import { apiMutation } from "@/lib/api-helpers"
import { fetcher } from "@/lib/fetcher"
import type {
  SoundCloudAuthResponse,
  SoundCloudRevokeResponse,
  SoundCloudStatus,
} from "./soundcloud.types"

const SOUNDCLOUD_BASE_URL = "/soundcloud"

export const soundcloudApi = {
  // GET - Vérifier le statut de connexion SoundCloud
  getStatus: (token?: string | null) =>
    fetcher<SoundCloudStatus>(`${SOUNDCLOUD_BASE_URL}/status`, {
      token: token || undefined,
    }),

  // GET - Initier l'autorisation OAuth SoundCloud
  // Retourne l'URL de redirection ou redirige directement
  authorize: (token?: string | null) =>
    fetcher<SoundCloudAuthResponse>(`${SOUNDCLOUD_BASE_URL}/authorize`, {
      token: token || undefined,
    }),

  // POST - Révoquer la connexion SoundCloud
  revoke: (token?: string | null) =>
    apiMutation<undefined, SoundCloudRevokeResponse>(
      `${SOUNDCLOUD_BASE_URL}/revoke`,
      "POST",
      undefined,
      {
        revalidate: [`${SOUNDCLOUD_BASE_URL}/status`],
        token,
      }
    ),
}
