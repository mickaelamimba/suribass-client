"use client"

import { useSession } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface AuthGuardProps {
  children: React.ReactNode
  roles?: string[]
  redirectTo?: string
}

export function AuthGuard({ children, roles, redirectTo = "/" }: AuthGuardProps) {
  const { user, isLoading, isAuthenticated } = useSession()
  const router = useRouter()
  const [hasChecked, setHasChecked] = useState(false)

  // Attendre que le chargement soit terminé avant de rediriger
  useEffect(() => {
    if (!isLoading) {
      setHasChecked(true)
      if (!isAuthenticated) {
        router.push("/login")
      }
    }
  }, [isLoading, isAuthenticated, router])

  // Afficher le loader pendant le chargement initial
  if (isLoading || !hasChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  // Vérifier les rôles si spécifiés
  if (roles && roles.length > 0) {
    console.log("🛡️ AuthGuard Check:", {
      userRole: user?.role,
      requiredRoles: roles,
      match: user && roles.includes(user.role)
    })

    const hasRequiredRole = user && roles.includes(user.role)
    
    if (!hasRequiredRole) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
          <h1 className="text-2xl font-bold">Accès refusé</h1>
          <p className="text-muted-foreground">
            Vous n'avez pas les permissions pour accéder à cette page
          </p>
          
          {/* Debug Info */}
          <div className="rounded-md bg-muted p-4 text-xs font-mono text-left">
            <p>Role actuel: {JSON.stringify(user?.role)}</p>
            <p>Roles requis: {JSON.stringify(roles)}</p>
          </div>

          <a href={redirectTo} className="text-primary underline">
            Retour à l'accueil
          </a>
        </div>
      )
    }
  }

  return <>{children}</>
}
