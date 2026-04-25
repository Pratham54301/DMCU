import { motion } from "framer-motion";
import Container from "@/components/Container";
import GlowLink from "@/components/GlowLink";
import { useTheme } from "@/app/theme-context";

const highlights = ["Mythic Worldbuilding", "Future Dharma", "Cinematic Lore"];

export default function HeroSection() {
  const { theme } = useTheme();

  const getAnimationProps = (index = 0) => {
    const type = theme?.heroSection?.animationType || 'fade';
    const speed = theme?.animations?.speed || 1;
    
    switch (type) {
      case 'slide': return { initial: { opacity: 0, x: -100 }, animate: { opacity: 1, x: 0 }, transition: { duration: speed, delay: 0.2 * index } };
      case 'scale': return { initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1 }, transition: { duration: speed, delay: 0.4 * index } };
      case 'cinematic': return { initial: { opacity: 0, letterSpacing: '1em', y: 40 }, animate: { opacity: 1, letterSpacing: '0.22em', y: 0 }, transition: { duration: speed * 2, ease: "easeOut" } };
      default: return { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: speed, delay: 0.2 * index } };
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-background transition-colors duration-1000">
        {theme?.heroSection?.backgroundStyle === 'gradient' && (
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,rgb(var(--primary)/0.3)_0%,transparent_70%)]" />
        )}
        
        {theme?.heroSection?.backgroundStyle === 'particles' && (
          <div className="absolute inset-0">
            {[...Array(60)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.1, 0.4, 0.1], y: [0, -100] }}
                transition={{ duration: 3 + Math.random() * 4, repeat: Infinity }}
                className="absolute w-1 h-1 bg-primary rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 102}%`,
                }}
              />
            ))}
          </div>
        )}

        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      </div>

      <Container className="relative z-10 text-center">
        <motion.div {...getAnimationProps(1)}>
          <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] uppercase tracking-[0.22em] text-text glow-text mb-4 leading-none select-none">
            DMCU
          </h1>
        </motion.div>

        <motion.div {...getAnimationProps(2)}>
          <p className="text-xl md:text-2xl text-primary/90 mt-6 mb-12 glow-text uppercase tracking-[0.4em] font-medium">
            A New Era of Dharma Begins
          </p>
        </motion.div>

        <motion.div {...getAnimationProps(3)}>
          <GlowLink href="#characters" className="animate-pulse-glow">
            Explore Universe
          </GlowLink>
        </motion.div>

        <motion.div
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item}
              whileHover={{ y: -5, scale: 1.05 }}
              className="glass-card p-6 text-center group transition-all"
            >
              <p className="text-primary font-semibold uppercase tracking-[0.28em] text-xs transition-transform group-hover:scale-110">
                {item}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
