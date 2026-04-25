"use client";

import Container from "@/components/Container";
import GlowLink from "@/components/GlowLink";

export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body className="bg-obsidian text-parchment">
        <main className="flex min-h-screen items-center justify-center px-4 py-16">
          <Container className="max-w-3xl">
            <div className="section-panel gold-panel px-8 py-14 text-center sm:px-12">
              <span className="eyebrow">System Override</span>
              <h1 className="mt-6 font-display text-4xl uppercase tracking-[0.18em] text-parchment sm:text-5xl">
                The DMCU portal needs to recover
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-ash sm:text-lg">
                A global rendering issue interrupted the experience. Reset the application or head back to the landing
                page to continue exploring.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button type="button" className="gold-button" onClick={() => reset()}>
                  Reset App
                </button>
                <GlowLink href="/" variant="secondary">
                  Return Home
                </GlowLink>
              </div>
            </div>
          </Container>
        </main>
      </body>
    </html>
  );
}
