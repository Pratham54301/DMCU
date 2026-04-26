import { motion } from "framer-motion";
import Link from "next/link";
import { buildMediaUrl } from "@/lib/api";

const truncateText = (text, maxLength = 130) => {
  if (!text) {
    return "No description available yet.";
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
};

export default function CharacterCard({ character }) {
  const imageUrl = buildMediaUrl(character.image);
  const imageTransparentUrl = buildMediaUrl(character.imageTransparent);

  return (
    <motion.article
      className="glass-card relative overflow-hidden p-6 transition-all duration-500 group border-2 border-primary/10 hover:border-primary/50 bg-surface/40 hover:bg-surface/80"
      whileHover={{ y: -10 }}
      style={{
         boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)"
      }}
    >
      {/* Animated Gradient Background on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Image Container */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-background h-72 w-full group/image flex items-center justify-center transition-all duration-500 group-hover:shadow-[0_0_30px_rgb(var(--primary-color)/0.4)]">
        {imageUrl ? (
          <>
            {/* Default Background Image */}
            <img 
               src={imageUrl} 
               alt={character.name} 
               className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out origin-center ${imageTransparentUrl ? 'group-hover/image:opacity-0 group-hover/image:scale-110 blur-0 group-hover/image:blur-sm' : 'group-hover/image:scale-105'}`} 
            />
            
            {/* Transparent Image on Hover */}
            {imageTransparentUrl && (
               <img 
                  src={imageTransparentUrl} 
                  alt={character.name} 
                  className="absolute inset-0 w-full h-full object-contain p-2 opacity-0 scale-95 translate-y-4 transition-all duration-500 ease-out group-hover/image:opacity-100 group-hover/image:scale-105 group-hover/image:-translate-y-2" 
                  style={{ filter: "drop-shadow(0 15px 25px rgb(var(--primary-color) / 0.8))" }}
               />
            )}
          </>
        ) : (
          <div className="flex h-72 items-center justify-center bg-gradient-radial px-6 text-center text-sm uppercase tracking-[0.3em] text-primary/70">
            Scanning Neural Links
          </div>
        )}
        
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80 group-hover/image:opacity-40 transition-opacity duration-500 pointer-events-none" />
        
        {/* Role Badge */}
        <div className="absolute bottom-4 left-4 rounded-full border border-primary/30 bg-surface/80 px-3 py-1.5 text-[10px] uppercase font-bold tracking-[0.3em] text-primary/80 backdrop-blur-md pointer-events-none z-10 transition-colors duration-300 group-hover/image:bg-primary/20 group-hover/image:text-primary group-hover/image:border-primary/60">
          {character.category ? character.category.replace(/_/g, ' ') : character.role}
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 mt-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl uppercase tracking-[0.14em] text-text group-hover:text-primary transition-colors duration-300 drop-shadow-md">
            {character.name}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-[0.28em] text-primary/70 group-hover:text-primary/100 transition-colors duration-300">
            {character.title}
          </p>
        </div>

        <div className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/80 shadow-[0_0_10px_rgb(var(--primary-color)/0.2)]">
          DMCU
        </div>
      </div>

      <p className="relative z-10 mt-5 text-sm leading-relaxed text-muted group-hover:text-text/90 transition-colors duration-300">
        {truncateText(character.description)}
      </p>

      {/* Action Button */}
      <div className="relative z-10 mt-8">
        <Link
          href={`/characters/${character._id}`}
          className="inline-block w-full text-center rounded-xl border border-primary/30 bg-primary/5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary transition-all duration-300 hover:bg-primary/20 hover:shadow-[0_0_20px_rgb(var(--primary-color)/0.3)] hover:scale-[1.02] active:scale-95"
        >
          View Full Profile
        </Link>
      </div>
    </motion.article>
  );
}
