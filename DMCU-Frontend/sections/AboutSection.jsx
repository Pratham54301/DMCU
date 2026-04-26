"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { SectionWrapper, CinematicCard } from "@/components/motion/MotionComponents";

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

export default function AboutSection({ content, id }) {
  return (
    <SectionWrapper id={id || "about"}>
      <Container>
        <div className="text-center max-w-4xl mx-auto mb-16">
          <SectionHeading
            eyebrow="Mission"
            title={content?.title || "When Dharma Weakens, The Universe Awakens Its Protectors"}
            align="center"
          />
          <div className="prose prose-lg text-muted mx-auto mt-8">
            <p className="text-lg leading-relaxed">
              {content?.description || "DMCU is a bold cinematic universe forged from the spiritual legacy of Indian mythology and the limitless possibilities of futuristic storytelling."}
            </p>
            {content?.supportingText && (
              <p className="text-base leading-relaxed opacity-80 border-y border-primary/10 py-6 my-8 italic">
                {content.supportingText}
              </p>
            )}
            {content?.secondaryBlock && (
              <p className="text-sm leading-relaxed uppercase tracking-widest text-primary/60 font-semibold">
                {content.secondaryBlock}
              </p>
            )}
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <CinematicCard
              key={pillar.title}
              className="p-8 text-center flex flex-col items-center justify-center min-h-[280px]"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                <span className="text-xl">{index + 1}</span>
              </div>
              <h3 className="font-display text-xl uppercase tracking-[0.2em] text-primary mb-4">
                {pillar.title}
              </h3>
              <p className="text-sm leading-7 text-muted">{pillar.description}</p>
            </CinematicCard>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
