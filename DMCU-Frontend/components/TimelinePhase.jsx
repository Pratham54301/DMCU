import { motion } from "framer-motion";

export default function TimelinePhase({ phase, title, description, projects, accent }) {
  return (
    <motion.article
      className="glass-card relative h-full overflow-hidden p-6 sm:p-8 transition-all duration-300 hover:shadow-glow"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`}
      />

      <span className="eyebrow">{phase}</span>
      <h3 className="mt-5 font-display text-2xl uppercase tracking-[0.16em] text-text">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-muted sm:text-base">{description}</p>

      <div className="mt-6 space-y-3">
        {projects.map((project) => (
          <motion.div
            key={project}
            className="rounded-2xl border border-primary/20 bg-surface/50 px-4 py-3 text-sm uppercase tracking-[0.24em] text-text/85 hover:bg-primary/10 hover:border-primary/40 transition-all duration-300"
            whileHover={{ x: 4 }}
          >
            {project}
          </motion.div>
        ))}
      </div>
    </motion.article>
  );
}
