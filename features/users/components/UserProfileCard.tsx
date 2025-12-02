"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import type { UserProfileDto } from "../api/users.types"

interface UserProfileCardProps {
  user: UserProfileDto
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const initials = user.username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const roleLabels = {
    Admin: "Administrateur",
    Partner: "Partenaire",
    User: "Utilisateur",
  }

  const roleColors = {
    Admin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    Partner: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    User: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.partner?.avatarUrl || undefined} />
          <AvatarFallback className="text-lg">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">{user.username}</h2>
            <Badge className={roleColors[user.role]} variant="secondary">
              {roleLabels[user.role]}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Membre depuis</span>
            <span>
              {format(new Date(user.createdAt), "d MMMM yyyy", { locale: fr })}
            </span>
          </div>
          {user.partner && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Nom d&apos;artiste</span>
              <span className="font-medium">{user.partner.artistName}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
