import { EditTrackClient } from "@/features/tracks/components/EditTrackClient"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Modifier Track | SuribassMusic",
  description: "Mettez à jour les informations de votre track.",
}

interface EditTrackPageProps {
  params: Promise<{ id: string }>
}

export default async function EditTrackPage({ params }: EditTrackPageProps) {
  const { id } = await params
  return <EditTrackClient id={id} />
}
