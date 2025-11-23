"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth-client"

export function LogoutButton() {
  return (
    <Button onClick={signOut} variant="outline">
      Se déconnecter
    </Button>
  )
}
