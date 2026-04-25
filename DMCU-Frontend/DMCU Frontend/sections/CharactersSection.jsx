"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CharacterCard from "@/components/CharacterCard";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { fetchJson } from "@/lib/api";

const skeletonCards = Array.from({ length: 3 }, (_, index) => index);

function CharacterCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden p-6">
      <div className="h-60 animate-pulse rounded-2xl bg-surface/50" />
      <div className="mt-6 h-6 w-2/3 animate-pulse rounded-full bg-surface/50" />
      <div className="mt-3 h-4 w-1/2 animate-pulse rounded-full bg-surface/50" />
      <div className="mt-5 space-y-3">
        <div className="h-4 animate-pulse rounded-full bg-surface/50" />
        <div className="h-4 w-11/12 animate-pulse rounded-full bg-surface/50" />
        <div className="h-4 w-4/5 animate-pulse rounded-full bg-surface/50" />
      </div>
      <div className="mt-6 h-12 w-40 animate-pulse rounded-full bg-surface/50" />
    </div>
  );
}

export default function CharactersSection() {
  const [characters, setCharacters] = useState([]);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const loadCharacters = async () => {
      try {
        setStatus("loading");
        setErrorMessage("");

        const payload = await fetchJson("/api/characters", {
          signal: controller.signal
        });

        setCharacters(Array.isArray(payload.data) ? payload.data : []);
        setStatus("success");
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setErrorMessage(error.message || "Unable to load characters right now.");
        setStatus("error");
      }
    };

    loadCharacters();

    return () => controller.abort();
  }, [reloadKey]);

  return (
    <section id="characters" className="relative py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionHeading
            eyebrow="Characters"
            title="Icons of light, shadow, and destiny"
            description="The home page now pulls directly from the DMCU Backend character API, turning this section into a live roster with image-driven cards and direct links into each character profile."
          />
        </motion.div>

        {status === "loading" && (
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {skeletonCards.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CharacterCardSkeleton />
              </motion.div>
            ))}
          </div>
        )}

        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="glass-card p-8 text-center">
              <p className="font-display text-2xl uppercase tracking-[0.14em] text-text">
                Character feed unavailable
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                {errorMessage}
              </p>
              <button
                type="button"
                className="gold-button mt-8"
                onClick={() => setReloadKey((currentValue) => currentValue + 1)}
              >
                Retry Fetch
              </button>
            </div>
          </motion.div>
        )}

        {status === "success" && characters.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="glass-card p-8 text-center">
              <p className="font-display text-2xl uppercase tracking-[0.14em] text-text">
                No characters yet
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                The backend connection is working, but there are no character records in MongoDB yet. Add a character
                from the admin API and this grid will populate automatically.
              </p>
            </div>
          </motion.div>
        )}

        {status === "success" && characters.length > 0 && (
          <>
            <div className="mt-8 mb-12 flex flex-wrap justify-center gap-3">
              {[
                { id: "all", label: "All" },
                { id: "hero", label: "Hero" },
                { id: "tech_support", label: "Tech Support" },
                { id: "villain", label: "Villain" },
                { id: "villain_followers", label: "Villain Followers" },
                { id: "grey_character", label: "Grey Character" },
                { id: "myth_character", label: "Myth Character" },
                { id: "vishnu_avatar", label: "Vishnu Avatar" },
                { id: "mother_devtas_avatar", label: "Mother Devtas" }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setCategoryFilter(filter.id)}
                  className={`px-4 py-2 rounded-full border text-xs uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-md ${
                    categoryFilter === filter.id 
                      ? "border-primary bg-primary/20 text-primary shadow-[0_0_15px_rgba(255,215,0,0.4)]"
                      : "border-primary/20 bg-surface/50 text-muted hover:border-primary/50 hover:text-text"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {characters
                .filter((char) => categoryFilter === "all" || char.category === categoryFilter)
                .map((character, index) => (
                <motion.div
                  key={character._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                  viewport={{ once: true }}
                >
                  <CharacterCard character={character} />
                </motion.div>
              ))}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
