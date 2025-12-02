"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import {
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Mail,
  RefreshCw,
  Send,
  Server,
  Shield,
  XCircle,
} from "lucide-react"
import { useState } from "react"
import { sendTestEmailAction, testEmailConnectionAction } from "../actions/email.actions"
import { useEmailConfig } from "../hooks/useEmailConfig"

export function SettingsAdminClient() {
  const { config, isLoading, isError, errorMessage, refetch } = useEmailConfig()
  const { toast } = useToast()
  
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)
  
  const [isSendingTestEmail, setIsSendingTestEmail] = useState(false)
  const [testEmail, setTestEmail] = useState("")

  const handleTestConnection = async () => {
    setIsTestingConnection(true)
    setConnectionStatus(null)
    
    try {
      const result = await testEmailConnectionAction()
      
      if (result.success && result.data?.isSuccess) {
        setConnectionStatus({
          success: true,
          message: result.data.message,
        })
        toast({
          title: "Connexion réussie",
          description: "Le serveur SMTP est correctement configuré.",
        })
      } else {
        setConnectionStatus({
          success: false,
          message: result.data?.message || result.error || "Échec de la connexion",
        })
        toast({
          title: "Échec de la connexion",
          description: result.error || "Vérifiez votre configuration SMTP.",
          variant: "destructive",
        })
      }
    } catch {
      setConnectionStatus({
        success: false,
        message: "Une erreur est survenue lors du test",
      })
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du test de connexion.",
        variant: "destructive",
      })
    } finally {
      setIsTestingConnection(false)
    }
  }

  const handleSendTestEmail = async () => {
    if (!testEmail) {
      toast({
        title: "Email requis",
        description: "Veuillez entrer une adresse email.",
        variant: "destructive",
      })
      return
    }

    setIsSendingTestEmail(true)
    
    try {
      const result = await sendTestEmailAction({ toEmail: testEmail })
      
      if (result.success) {
        toast({
          title: "Email envoyé",
          description: result.message || `Email de test envoyé à ${testEmail}`,
        })
        setTestEmail("")
      } else {
        toast({
          title: "Échec de l'envoi",
          description: result.error || "Impossible d'envoyer l'email de test.",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi.",
        variant: "destructive",
      })
    } finally {
      setIsSendingTestEmail(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-48" />
        <Skeleton className="h-64" />
        <Skeleton className="h-48" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Section Configuration Email */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Configuration Email</CardTitle>
                <CardDescription>
                  Paramètres du serveur SMTP pour l&apos;envoi d&apos;emails
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {config?.enabled ? (
                <Badge variant="default" className="bg-green-500">
                  <CheckCircle2 className="mr-1 h-3 w-3" />
                  Actif
                </Badge>
              ) : (
                <Badge variant="secondary">
                  <XCircle className="mr-1 h-3 w-3" />
                  Inactif
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => refetch()}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isError ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>
                {errorMessage || "Impossible de charger la configuration email."}
              </AlertDescription>
            </Alert>
          ) : config ? (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Server className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Serveur SMTP</span>
                </div>
                <div className="rounded-lg border p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hôte</span>
                    <span className="font-mono text-sm">{config.smtpHost}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Port</span>
                    <span className="font-mono text-sm">{config.smtpPort}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Utilisateur</span>
                    <span className="font-mono text-sm truncate max-w-[200px]">
                      {config.smtpUsername}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Expéditeur</span>
                </div>
                <div className="rounded-lg border p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-mono text-sm">{config.fromEmail}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Nom</span>
                    <span className="font-mono text-sm">{config.fromName}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SSL/TLS</span>
                    <Badge variant={config.enableSsl ? "default" : "secondary"}>
                      {config.enableSsl ? "Activé" : "Désactivé"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Configuration manquante</AlertTitle>
              <AlertDescription>
                Le service email n&apos;est pas configuré. Ajoutez les variables d&apos;environnement 
                nécessaires dans votre fichier .env
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Section Test de connexion */}
      <Card>
        <CardHeader>
          <CardTitle>Test de connexion SMTP</CardTitle>
          <CardDescription>
            Vérifiez que la connexion au serveur SMTP fonctionne correctement
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleTestConnection}
            disabled={isTestingConnection || !config?.enabled}
          >
            {isTestingConnection ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Test en cours...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Tester la connexion
              </>
            )}
          </Button>

          {connectionStatus && (
            <Alert variant={connectionStatus.success ? "default" : "destructive"}>
              {connectionStatus.success ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              <AlertTitle>
                {connectionStatus.success ? "Connexion réussie" : "Échec de la connexion"}
              </AlertTitle>
              <AlertDescription>{connectionStatus.message}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Section Envoi d'email de test */}
      <Card>
        <CardHeader>
          <CardTitle>Envoyer un email de test</CardTitle>
          <CardDescription>
            Envoyez un email de test pour vérifier que tout fonctionne
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="test-email">Adresse email du destinataire</Label>
              <Input
                id="test-email"
                type="email"
                placeholder="test@example.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                disabled={isSendingTestEmail || !config?.enabled}
              />
            </div>
            <div className="flex items-end">
              <Button
                onClick={handleSendTestEmail}
                disabled={isSendingTestEmail || !testEmail || !config?.enabled}
              >
                {isSendingTestEmail ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Envoi...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Envoyer
                  </>
                )}
              </Button>
            </div>
          </div>

          {!config?.enabled && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Le service email doit être activé pour envoyer des emails de test.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Section Instructions de configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Configuration via variables d&apos;environnement</CardTitle>
          <CardDescription>
            Pour modifier la configuration, mettez à jour les variables d&apos;environnement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto">
            <pre className="whitespace-pre-wrap">
{`# Configuration Email (SMTP)
EMAIL_ENABLED=true
EMAIL_SMTP_HOST=smtp.ionos.fr
EMAIL_SMTP_PORT=587
EMAIL_SMTP_USERNAME=your-email@yourdomain.com
EMAIL_SMTP_PASSWORD=your-email-password
EMAIL_FROM_EMAIL=noreply@yourdomain.com
EMAIL_FROM_NAME=SuribassMusic
EMAIL_ENABLE_SSL=true`}
            </pre>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Après modification des variables d&apos;environnement, redémarrez le serveur pour 
            appliquer les changements.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
