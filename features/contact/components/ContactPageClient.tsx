"use client"

import { Mail, MapPin, MessageCircle } from "lucide-react"
import { ContactForm } from "./ContactForm"

export function ContactPageClient() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">Contactez-nous</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Une question, une suggestion ou besoin d&apos;aide ? Notre équipe est là pour vous accompagner.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Contact Info */}
          <div className="space-y-8 lg:col-span-1">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Envoyez-nous un email à tout moment
                </p>
                <a
                  href="mailto:contact@suribassmusic.com"
                  className="mt-2 inline-block text-sm text-primary hover:underline"
                >
                  contact@suribassmusic.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Support</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Nous répondons généralement sous 24-48h
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Localisation</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Basé en France
                </p>
              </div>
            </div>

            {/* FAQ Teaser */}
            <div className="rounded-lg border bg-muted/50 p-6">
              <h3 className="font-semibold">Questions fréquentes</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Avant de nous contacter, consultez peut-être notre FAQ pour trouver rapidement une réponse à votre question.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
