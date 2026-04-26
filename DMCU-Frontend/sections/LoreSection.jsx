"use client";

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { SectionWrapper } from "@/components/motion/MotionComponents";
import UniverseMap from "@/components/UniverseMap";

export default function LoreSection({ content }) {
  return (
    <SectionWrapper id="lore">
      <Container>
        <div className="text-center mb-16">
          <SectionHeading
            eyebrow="Cosmic Geography"
            title={content?.title || "Multiverse Nexus Map"}
            description={content?.description || "Explore the sacred geography and pivotal locations of the DMCU saga. Decrypt lore archives from every Yuga across the digital multiverse."}
            align="center"
          />
        </div>

        <UniverseMap />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8">
           {[
             { label: "Matrix Sync", value: "Active", color: "text-green-500" },
             { label: "Data Points", value: "882", color: "text-primary" },
             { label: "Yugas Tracked", value: "4/4", color: "text-primary" },
             { label: "Signal Strength", value: "98%", color: "text-primary" }
           ].map(stat => (
             <div key={stat.label} className="p-6 border border-white/5 bg-white/5 rounded-xl text-center">
                <p className="text-[9px] uppercase tracking-[0.4em] text-muted mb-2">{stat.label}</p>
                <p className={`font-display text-xl uppercase tracking-widest ${stat.color}`}>{stat.value}</p>
             </div>
           ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
