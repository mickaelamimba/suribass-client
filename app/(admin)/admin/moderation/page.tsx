import { ModerationQueue } from "@/features/admin/components/ModerationQueue"

export default function ModerationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Queue de modération</h2>
        <p className="text-muted-foreground">
          Commentaires en attente de validation
        </p>
      </div>

      <ModerationQueue />
    </div>
  )
}
