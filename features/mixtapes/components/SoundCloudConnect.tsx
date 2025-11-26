"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle2, Loader2, XCircle } from "lucide-react"
import { useSoundCloud } from "../hooks/useSoundCloud"

interface SoundCloudConnectProps {
  onConnectionChange?: (connected: boolean) => void
}

export function SoundCloudConnect({ onConnectionChange }: SoundCloudConnectProps) {
  const { status, isLoading, isConnecting, isRevoking, connect, revoke } = useSoundCloud()
  const { toast } = useToast()

  const handleConnect = () => {
    // La méthode connect() redirige directement l'utilisateur
    // pas besoin de gérer les erreurs ici car la redirection se fait côté serveur
    connect()
    // onConnectionChange sera appelé après le retour du callback OAuth
  }

  const handleRevoke = async () => {
    try {
      await revoke()
      toast({
        title: "Connexion révoquée",
        description: "Votre compte SoundCloud a été déconnecté avec succès.",
      })
      onConnectionChange?.(false)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de révoquer la connexion. Veuillez réessayer.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  const isConnected = status?.connected || false

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Connexion SoundCloud</CardTitle>
            <CardDescription>
              {isConnected
                ? "Votre compte SoundCloud est connecté"
                : "Connectez votre compte SoundCloud pour synchroniser vos mixtapes"}
            </CardDescription>
          </div>
          {isConnected ? (
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          ) : (
            <XCircle className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isConnected && status?.expiresAt && (
          <p className="text-sm text-muted-foreground">
            Expire le : {new Date(status.expiresAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </CardContent>
      <CardFooter>
        {isConnected ? (
          <Button
            variant="destructive"
            onClick={handleRevoke}
            disabled={isRevoking}
          >
            {isRevoking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Déconnecter SoundCloud
          </Button>
        ) : (
          <Button
            onClick={handleConnect}
            disabled={isConnecting}
          >
            {isConnecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Connecter SoundCloud
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
