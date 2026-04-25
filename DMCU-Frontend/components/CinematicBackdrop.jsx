export default function CinematicBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(30,144,255,0.08),transparent_20%),radial-gradient(circle_at_50%_55%,rgba(212,175,55,0.06),transparent_32%),linear-gradient(180deg,#0A0A0A_0%,#0F0F0F_45%,#050505_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[32rem] bg-gradient-radial opacity-70 blur-3xl" />
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(212,175,55,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.04)_1px,transparent_1px)] [background-size:7rem_7rem]" />
      <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary/12 blur-[130px]" />
      <div className="absolute bottom-24 right-0 h-80 w-80 rounded-full bg-accent/10 blur-[140px]" />
    </div>
  );
}
