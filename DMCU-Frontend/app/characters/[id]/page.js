"use client";

import { use } from "react";
import CharacterDetailPage from "@/components/CharacterDetailPage";
import CinematicBackdrop from "@/components/CinematicBackdrop";

export default function CharacterPage({ params }) {
  const resolvedParams = use(params);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-obsidian text-parchment pt-20">
      <CinematicBackdrop />
      <div className="relative z-10">
        <CharacterDetailPage characterId={resolvedParams.id} />
      </div>
    </main>
  );
}
