export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-background flex items-center justify-center">
       <div className="text-center">
          <h1 className="text-4xl font-display text-primary tracking-widest uppercase">Page Not Found</h1>
          <p className="mt-4 text-muted">The requested route could not be found.</p>
       </div>
    </main>
  );
}
