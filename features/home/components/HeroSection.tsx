"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Music, Radio, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20 md:py-32">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-96 w-96 rounded-full bg-primary/5"
            animate={{
              x: ["-25%", "125%"],
              y: ["-25%", "125%"],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              top: `${i * 30}%`,
              left: `${-20 + i * 10}%`,
              filter: "blur(100px)",
            }}
          />
        ))}
      </div>

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge animé */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-2 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              Découvrez les meilleurs sons
            </span>
          </motion.div>

          {/* Titre principal */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 bg-gradient-to-br from-foreground via-foreground to-foreground/60 bg-clip-text text-5xl font-bold tracking-tight text-transparent md:text-7xl"
          >
            Votre destination pour
            <br />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text">
              la musique d'exception
            </span>
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-10 text-xl text-muted-foreground md:text-2xl"
          >
            Explorez des milliers de tracks et mixtapes sélectionnés par nos
            experts. De l'Afrobeat au R&B, trouvez votre prochaine obsession
            musicale.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button size="lg" asChild className="gap-2">
              <Link href="/tracks">
                <Music className="h-5 w-5" />
                Explorer les Tracks
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2">
              <Link href="/mixtapes">
                <Radio className="h-5 w-5" />
                Découvrir les Mixtapes
              </Link>
            </Button>
          </motion.div>

          {/* Stats animées */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8"
          >
            {[
              { label: "Tracks", value: "10K+" },
              { label: "Mixtapes", value: "1K+" },
              { label: "Artistes", value: "500+" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 1 + i * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                className="text-center"
              >
                <div className="mb-1 text-3xl font-bold text-primary md:text-4xl">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
