import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

const pillars = [
  {
    title: "Mythology Reforged",
    description: "Timeless dharmic ideas are retold as living systems, weapons, and codes that still govern destiny."
  },
  {
    title: "Futuristic Civilizations",
    description: "Towering city-states, sacred engines, and intelligent relics reshape how heroes and villains rise."
  },
  {
    title: "Moral Tension",
    description: "Every conflict tests duty, sacrifice, and power, turning epic battles into deeply human choices."
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            eyebrow="Lore"
            title="When Dharma weakens, the universe awakens its protectors"
            description="DMCU is a bold cinematic world that blends ancient Indian mythic imagination with advanced technology, dark prophecy, and cosmic-scale storytelling. The result is a universe that feels sacred, dangerous, and unmistakably modern."
          />
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="prose prose-lg text-muted">
              <p className="text-lg leading-relaxed">
                In the shadowed corridors of forgotten temples and neon-drenched megacities, the ancient forces of Dharma stir once more. Heroes forged from divine essence clash with villains born of cosmic imbalance, each battle echoing the eternal struggle between order and chaos.
              </p>
              <p className="text-lg leading-relaxed">
                The DMCU universe weaves together the profound wisdom of Indian mythology with cutting-edge technology, creating a tapestry where gods walk among mortals and ancient prophecies unfold in holographic displays.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {pillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-6"
                >
                  <h3 className="font-display text-lg uppercase tracking-[0.16em] text-primary mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-7 text-muted">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image/Visual Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card p-8 text-center">
              <div className="relative h-96 bg-gradient-radial rounded-2xl flex items-center justify-center">
                <div className="text-6xl animate-rotate-chakra">🕉️</div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-2xl"></div>
              </div>
              <p className="mt-6 text-primary font-semibold uppercase tracking-[0.28em]">
                The Eternal Cycle
              </p>
              <p className="mt-2 text-sm text-muted">
                Dharma's wheel turns eternally, binding past and future in an unbreakable chain.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
