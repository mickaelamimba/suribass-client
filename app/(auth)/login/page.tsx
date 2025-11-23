import { LoginForm } from "@/features/auth/components/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Connexion</h1>
          <p className="text-muted-foreground">
            Entrez vos identifiants pour accéder à votre compte
          </p>
        </div>
        <LoginForm />
        <div className="text-center text-sm">
          Pas encore de compte ?{" "}
          <Link href="/register" className="underline hover:text-primary">
            S'inscrire
          </Link>
        </div>
      </div>
    </div>
  );
}
