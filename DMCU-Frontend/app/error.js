"use client";

import Container from "@/components/Container";
import GlowLink from "@/components/GlowLink";

export default function Error({ reset }) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <Container className="max-w-3xl">
        <div className="section-panel gold-panel px-8 py-14 text-center sm:px-12">
          <span className="eyebrow">Portal Disturbance</span>
          <h2 className="mt-6 font-display text-4xl uppercase tracking-[0.18em] text-parchment sm:text-5xl">
            A cinematic anomaly interrupted this scene
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-ash sm:text-lg">
            The page hit an unexpected issue while loading. You can try the scene again or return to the main DMCU
            portal.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button type="button" className="gold-button" onClick={() => reset()}>
              Try Again
            </button>
            <GlowLink href="/" variant="secondary">
              Return Home
            </GlowLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
