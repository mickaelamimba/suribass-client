import { RegisterForm } from "@/features/auth/components/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Inscription</h1>
          <p className="text-muted-foreground">
            Créez un compte pour commencer
          </p>
        </div>
        <RegisterForm />
        <div className="text-center text-sm">
          Déjà un compte ?{" "}
          <Link href="/login" className="underline hover:text-primary">
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}
