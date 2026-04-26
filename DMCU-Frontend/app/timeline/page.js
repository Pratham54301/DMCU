"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import TimelinePhase from "@/components/TimelinePhase";

const fullPhases = [
  {
    phase: "I",
    title: "The Awakening of Dharma",
    year: "Era 0 - 200",
    description: "The universe recalibrates as the first sacred relics are discovered across multiple sectors.",
    events: ["Discovery of Gada Pulse", "The First Yuga War", "Nexus Core Initialization"],
    status: "Completed"
  },
  {
    phase: "II",
    title: "Shadows of the Void",
    year: "Era 201 - 450",
    description: "A rogue AI system claiming to be Ravana's shadow begins consuming satellite hubs.",
    events: ["Invasion of Kishkindha Hub", "Sudarshan Defense Shield Fail", "Rise of the Vanara Tech-Legion"],
    status: "Ongoing"
  },
  {
    phase: "III",
    title: "The Kalki Protocol",
    year: "Era 451+",
    description: "Total synchronization of all avatars to prevent the final deletion of reality.",
    events: ["Decryption of Matsya Code", "The Final Kurukshetra Battle", "Rebirth of the Multiverse"],
    status: "Planned"
  }
];

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-black text-ash pt-32 pb-20 relative overflow-hidden">
      <CinematicBackdrop />
      <Container className="relative z-10">
        <SectionHeading 
          eyebrow="Chronology"
          title="The Eternal Sagas"
          description="Trace the history of the DMCU across the yugas of digital evolution."
        />

        <div className="mt-20 space-y-32">
           {fullPhases.map((phase, idx) => (
             <div key={phase.phase} className="relative">
                {idx !== fullPhases.length - 1 && (
                  <div className="absolute top-full left-[20px] w-px h-32 bg-gradient-to-b from-primary/40 to-transparent hidden lg:block" />
                )}
                <TimelinePhase phase={phase} index={idx} />
             </div>
           ))}
        </div>
      </Container>
    </main>
  );
}
