"use client";

import { useState } from "react";
import Container from "@/components/Container";
import { SectionWrapper, GlowButton } from "@/components/motion/MotionComponents";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3004);
  };

  return (
    <SectionWrapper id="cta">
      <Container>
        <div className="text-center">
          <div className="glass-card p-12 max-w-2xl mx-auto shadow-glow">
            <h2 className="font-display text-4xl uppercase tracking-[0.16em] text-text mb-4">
              Join the Dharma
            </h2>

            <p className="text-lg text-muted mb-8">
              Be the first to know when new chapters unfold. Enter the universe and stay connected with the latest from DMCU.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your cosmic address"
                    className="w-full px-6 py-4 bg-surface/50 border border-primary/30 rounded-full text-text placeholder-muted focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    required
                  />
                </div>

                <GlowButton type="submit" className="w-full">
                  Awaken Your Journey
                </GlowButton>
              </form>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4 animate-pulse">✨</div>
                <p className="text-primary font-semibold text-lg uppercase tracking-widest">
                  Welcome to the Universe
                </p>
                <p className="text-muted mt-2">
                  Your journey begins now.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  );
}