import {
    blockIPAction,
    getBlockedIPsAction,
    getFailedLoginsAction,
    getInjectionAttemptsAction,
    getLockedAccountsAction,
    getRateLimitStatsAction,
    getSecurityDashboardAction,
    getSecurityEventsAction,
    unblockIPAction,
    unlockAccountAction,
} from "../actions/security.actions"
import type {
    BlockIPRequest,
    GetBlockedIPsParams,
    GetFailedLoginsParams,
    GetInjectionAttemptsParams,
    GetRateLimitStatsParams,
    GetSecurityEventsParams,
} from "./security.types"

export const securityApi = {
  // GET - Dashboard overview
  getSecurityDashboard: () => getSecurityDashboardAction(),
  
  // GET - Security events avec filtres
  getSecurityEvents: (params: GetSecurityEventsParams) => 
    getSecurityEventsAction(params),
  
  // GET - Failed login attempts
  getFailedLogins: (params: GetFailedLoginsParams) => 
    getFailedLoginsAction(params),
  
  // GET - Blocked IPs
  getBlockedIPs: (params: GetBlockedIPsParams) => 
    getBlockedIPsAction(params),
  
  // POST - Block IP
  blockIP: async (data: BlockIPRequest) => {
    const result = await blockIPAction(data)
    if (!result.success) {
      throw new Error(result.error || "Failed to block IP")
    }
    return result.data!
  },
  
  // DELETE - Unblock IP
  unblockIP: async (ipAddress: string) => {
    const result = await unblockIPAction(ipAddress)
    if (!result.success) {
      throw new Error(result.error || "Failed to unblock IP")
    }
  },
  
  // GET - Rate limit stats
  getRateLimitStats: (params: GetRateLimitStatsParams) => 
    getRateLimitStatsAction(params),
  
  // GET - Injection attempts
  getInjectionAttempts: (params: GetInjectionAttemptsParams) => 
    getInjectionAttemptsAction(params),
  
  // GET - Locked accounts
  getLockedAccounts: () => getLockedAccountsAction(),
  
  // POST - Unlock account
  unlockAccount: async (userId: string) => {
    const result = await unlockAccountAction(userId)
    if (!result.success) {
      throw new Error(result.error || "Failed to unlock account")
    }
    return result.data!
  },
}
