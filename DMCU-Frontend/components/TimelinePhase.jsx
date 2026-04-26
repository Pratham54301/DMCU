import { motion } from "framer-motion";

export default function TimelinePhase({ phase, index }) {
  if (!phase) return null;

  const { title, description, events = [], status, year } = phase;

  return (
    <motion.article
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="glass-card relative h-full overflow-hidden p-8 sm:p-12 transition-all duration-500 hover:shadow-glow group"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors duration-500" />

      <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
         <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-4">
               <span className="text-primary font-black text-4xl opacity-20">PHASE {phase.phase}</span>
               <span className="text-[10px] uppercase tracking-[0.5em] text-muted">{year}</span>
            </div>
            <h3 className="font-display text-3xl uppercase tracking-widest text-text">{title}</h3>
            <p className="text-ash text-sm leading-relaxed uppercase tracking-widest">{description}</p>
         </div>

         <div className="flex flex-col gap-3 min-w-[280px]">
            <h4 className="text-[9px] uppercase tracking-[0.5em] text-primary/40 font-black mb-2">Key Events</h4>
            {events.map((event) => (
              <motion.div
                key={event}
                className="rounded-xl border border-white/5 bg-white/5 px-5 py-3 text-[10px] uppercase tracking-widest text-parchment hover:bg-primary/5 hover:border-primary/20 transition-all duration-300"
                whileHover={{ x: 10 }}
              >
                {event}
              </motion.div>
            ))}
            <div className="mt-4 pt-4 border-t border-white/5">
               <span className={`text-[8px] uppercase tracking-[0.4em] font-black px-3 py-1 rounded-full border ${status === 'Completed' ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/5' : status === 'Ongoing' ? 'border-primary/20 text-primary bg-primary/5' : 'border-white/10 text-muted'}`}>
                  {status}
               </span>
            </div>
         </div>
      </div>
    </motion.article>
  );
}
