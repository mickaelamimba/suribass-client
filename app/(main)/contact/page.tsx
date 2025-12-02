import { ContactPageClient } from "@/features/contact"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | SuribassMusic",
  description: "Contactez l'équipe SuribassMusic. Nous sommes là pour répondre à vos questions.",
}

export default function ContactPage() {
  return <ContactPageClient />
}
