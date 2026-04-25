import Link from "next/link";

export default function AdminSidebar({ 
  admin, 
  totalCharacters, 
  heroCount, 
  villainCount, 
  activeTab, 
  setActiveTab, 
  onLogout, 
  onCreateNew 
}) {
  return (
    <aside className="section-panel glass-card h-fit overflow-hidden p-6 xl:sticky xl:top-6">
      <div className="rounded-[1.75rem] border border-amber-200/15 bg-[radial-gradient(circle_at_top,rgba(242,200,110,0.2),transparent_38%),linear-gradient(180deg,rgba(13,13,13,0.94),rgba(8,8,8,0.96))] p-5">
        <p className="text-xs uppercase tracking-[0.34em] text-amber-100/70">Admin Console</p>
        <h1 className="mt-4 font-display text-3xl uppercase tracking-[0.18em] text-parchment">DMCU</h1>
        <p className="mt-4 text-sm leading-7 text-ash">
          Manage the universe roster, upload assets, and keep the cinematic archive updated in one place.
        </p>
      </div>

      <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-black/25 p-5">
        <p className="text-xs uppercase tracking-[0.34em] text-amber-100/60">Signed In</p>
        <p className="mt-3 text-lg font-semibold text-parchment">{admin?.name || "Admin"}</p>
        <p className="mt-1 text-sm text-ash">{admin?.email}</p>
      </div>

      <nav className="mt-6 flex flex-col gap-2">
         <a href="#overview" className="admin-nav-link w-full text-left hover:bg-primary/10 hover:text-primary">Dashboard</a>
         
         <button onClick={() => { setActiveTab('characters'); onCreateNew(); }} className={`admin-nav-link w-full text-left ${activeTab === 'characters' ? 'bg-primary/20 text-primary border-primary/40' : ''}`}>Add Character</button>
         <button onClick={() => { setActiveTab('characters'); window.location.hash = 'library'; }} className={`admin-nav-link w-full text-left ${activeTab === 'characters' ? 'bg-primary/10 text-primary border-primary/30' : ''}`}>Manage Characters</button>
         
         <button onClick={() => { setActiveTab('blogs'); onCreateNew(); }} className={`admin-nav-link w-full text-left ${activeTab === 'blogs' ? 'bg-primary/20 text-primary border-primary/40' : ''}`}>Add Blog</button>
         <button onClick={() => { setActiveTab('blogs'); window.location.hash = 'library'; }} className={`admin-nav-link w-full text-left ${activeTab === 'blogs' ? 'bg-primary/10 text-primary border-primary/30' : ''}`}>Manage Blog</button>
         
         <button onClick={() => { setActiveTab('themes'); }} className={`admin-nav-link w-full text-left ${activeTab === 'themes' ? 'bg-primary/20 text-primary border-primary/40' : ''}`}>Theme Settings</button>
         <button onClick={() => { setActiveTab('sections'); }} className={`admin-nav-link w-full text-left ${activeTab === 'sections' ? 'bg-primary/20 text-primary border-primary/40' : ''}`}>Section Manager</button>
         <button onClick={() => { setActiveTab('comics'); }} className={`admin-nav-link w-full text-left ${activeTab === 'comics' ? 'bg-primary/20 text-primary border-primary/40' : ''}`}>Comic Manager</button>
      </nav>

      <div className="mt-6 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
        <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-amber-100/60">Characters</p>
          <p className="mt-2 font-display text-3xl uppercase tracking-[0.12em] text-parchment">{totalCharacters}</p>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-amber-100/60">Heroes</p>
          <p className="mt-2 font-display text-3xl uppercase tracking-[0.12em] text-parchment">{heroCount}</p>
        </div>
        <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
          <p className="text-xs uppercase tracking-[0.28em] text-amber-100/60">Villains</p>
          <p className="mt-2 font-display text-3xl uppercase tracking-[0.12em] text-parchment">{villainCount}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Link href="/" className="ghost-button w-full">
          View Public Site
        </Link>
        <button type="button" className="ghost-button w-full" onClick={onLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}
