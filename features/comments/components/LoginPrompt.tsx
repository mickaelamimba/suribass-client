"use client"

import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"
import Link from "next/link"

interface LoginPromptProps {
  className?: string
}

export function LoginPrompt({ className }: LoginPromptProps) {
  return (
    <div className={`rounded-lg border border-dashed bg-muted/50 p-8 text-center ${className || ""}`}>
      <LogIn className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
      <h3 className="mb-2 text-lg font-semibold">Connectez-vous pour commenter</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Vous devez être connecté pour laisser un commentaire et interagir avec la communauté.
      </p>
      <div className="flex justify-center gap-4">
        <Button asChild>
          <Link href="/login">Se connecter</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/register">Créer un compte</Link>
        </Button>
      </div>
    </div>
  )
}
