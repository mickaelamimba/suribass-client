import {
  getGlobalStatsAction,
  getModerationQueueAction,
  moderateCommentAction,
  refreshAllScoresAction,
} from "../actions/admin.actions"
import type {
  GetModerationParams,
  ModerateCommentRequest
} from "./admin.types"

export const adminApi = {
  // GET - Stats globales (Server Action)
  getGlobalStats: () => getGlobalStatsAction(),
  
  // GET - Queue de modération avec pagination (Server Action)
  getModerationQueue: (params: GetModerationParams) => 
    getModerationQueueAction(params),
  
  // POST - Modérer un commentaire (Server Action)
  moderateComment: async (commentId: string, data: ModerateCommentRequest) => {
    const result = await moderateCommentAction(commentId, data)
    if (!result.success) {
      throw new Error(result.error || "Failed to moderate comment")
    }
    return result.data!
  },
  
  // POST - Refresh tous les scores (Server Action)
  refreshAllScores: async () => {
    const result = await refreshAllScoresAction()
    if (!result.success) {
      throw new Error(result.error || "Failed to refresh scores")
    }
    return result.data!
  },
}
