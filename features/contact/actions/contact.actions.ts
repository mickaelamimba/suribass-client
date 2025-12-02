"use server"

import type { ContactFormData, ContactResponse } from "../api/contact.types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.suribassmusic.com"

export async function sendContactForm(data: ContactFormData): Promise<ContactResponse> {
  try {
    const response = await fetch(`${API_URL}/api/v1/email/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: result.message || "Une erreur est survenue lors de l'envoi du message",
      }
    }

    return {
      success: true,
      message: "Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.",
    }
  } catch (error) {
    console.error("Contact form error:", error)
    return {
      success: false,
      message: "Impossible de contacter le serveur. Veuillez réessayer plus tard.",
    }
  }
}
