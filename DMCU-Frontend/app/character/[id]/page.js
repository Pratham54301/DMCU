import CinematicBackdrop from "@/components/CinematicBackdrop";
import CharacterDetailPage from "@/components/CharacterDetailPage";
import FooterSection from "@/sections/FooterSection";
import SiteHeader from "@/components/SiteHeader";

export const dynamic = "force-dynamic";

export default async function CharacterPage({ params }) {
  const resolvedParams = await params;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-obsidian text-parchment">
      <CinematicBackdrop />
      <SiteHeader />

      <div className="relative z-10 pb-10 pt-10 sm:pt-16">
        <CharacterDetailPage characterId={resolvedParams.id} />
      </div>

      <div className="relative z-10">
        <FooterSection />
      </div>
    </main>
  );
}
