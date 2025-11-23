import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { LogoutButton } from "./logout-button"


export default async function DashboardPage() {
  const user = await auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Bienvenue, {user.username}</CardTitle>
            <CardDescription>
              Informations de votre compte
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Rôle:</strong> {user.role}
            </div>
            <div>
              <strong>Membre depuis:</strong>{" "}
              {user.createdAt ? new Date(user.createdAt).toLocaleDateString("fr-FR") : "N/A"}
            </div>
            {user.partner && (
              <div className="mt-4 rounded-lg bg-primary/10 p-4">
                <h3 className="font-semibold">Artiste: {user.partner.artistName}</h3>
                {user.partner.bio && <p className="mt-2 text-sm">{user.partner.bio}</p>}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>
              Que souhaitez-vous faire ?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-muted-foreground">
              Votre espace de travail est prêt à être utilisé.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
