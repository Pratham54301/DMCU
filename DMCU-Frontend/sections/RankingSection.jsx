"use client";

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { SectionWrapper } from "@/components/motion/MotionComponents";
import CommunityRankings from "@/components/CommunityRankings";

export default function RankingSection({ content, id }) {
  return (
    <SectionWrapper id={id || "ranking"}>
      <Container>
        <div className="text-center mb-16">
          <SectionHeading
            eyebrow="Influence"
            title={content?.title || "Community Power Rankings"}
            description={content?.description || "Vote and influence the cosmic hierarchy. The most respected entities in the DMCU matrix are determined by your collective voice."}
            align="center"
          />
        </div>

        <div className="max-w-4xl mx-auto">
          <CommunityRankings />
        </div>

        <div className="mt-20 text-center">
            <div className="inline-block p-4 border border-primary/10 bg-surface/20 rounded-2xl backdrop-blur-sm">
               <p className="text-[10px] uppercase tracking-[0.4em] text-primary/60 font-black mb-2">Syncing with Community Core</p>
               <p className="text-[9px] text-muted leading-relaxed">Each vote contributes to the reputation of the entity within the digital multiverse.</p>
            </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}
