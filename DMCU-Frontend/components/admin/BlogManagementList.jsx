import Link from "next/link";
import { buildMediaUrl } from "@/lib/api";

const formatDate = (value) => new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(value));

function BlogRowSkeleton() {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <div className="h-28 w-full animate-pulse rounded-[1.5rem] bg-white/5 lg:w-36" />
        <div className="flex-1 space-y-3">
          <div className="h-6 w-40 animate-pulse rounded-full bg-white/5" />
          <div className="h-4 w-56 animate-pulse rounded-full bg-white/5" />
          <div className="h-4 w-full animate-pulse rounded-full bg-white/5" />
        </div>
      </div>
    </div>
  );
}

export default function BlogManagementList({ blogs, status, errorMessage, deletingId, activeBlogId, onRefresh, onEdit, onDelete }) {
  return (
    <section id="library" className="section-panel glass-card overflow-hidden p-6 sm:p-8 mt-8">
      <div className="flex flex-col gap-4 border-b border-primary/20 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow">Records & Lore Library</span>
          <h2 className="mt-4 font-display text-3xl uppercase tracking-[0.16em] text-primary sm:text-4xl">
            Edit or remove chronicles
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-muted sm:text-base">
            These articles populate the Lore & Saga endpoints. Edit to revise the lore, or delete entirely.
          </p>
        </div>
        <button type="button" className="ghost-button" onClick={onRefresh}>Refresh Vault</button>
      </div>

      <div className="mt-8 space-y-4">
        {status === "loading" && Array.from({ length: 3 }, (_, index) => <BlogRowSkeleton key={index} />)}
        
        {status === "error" && (
          <div className="rounded-[1.75rem] border border-red-400/20 bg-red-500/10 px-6 py-5 text-sm leading-7 text-red-100">{errorMessage}</div>
        )}

        {status === "success" && blogs.length === 0 && (
          <div className="rounded-[1.75rem] border border-white/10 bg-black/25 px-6 py-8 text-center">
            <p className="font-display text-2xl uppercase tracking-[0.14em] text-primary">No archives found</p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted sm:text-base">Upload your first saga above.</p>
          </div>
        )}

        {status === "success" && blogs.map((blog) => {
          const imageUrl = buildMediaUrl(blog.image);
          const isActive = activeBlogId === blog._id;

          return (
            <article key={blog._id} className={`rounded-[1.75rem] border bg-black/25 p-5 transition ${isActive ? "border-primary shadow-glow" : "border-white/10"}`}>
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/35 lg:w-40">
                  {imageUrl ? (
                    <img src={imageUrl} alt={blog.title} className="h-28 w-full object-cover lg:h-32" />
                  ) : (
                    <div className="flex h-28 items-center justify-center px-4 text-center text-[0.7rem] uppercase tracking-[0.28em] text-primary/70 lg:h-32">No Image</div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="font-display text-2xl uppercase tracking-[0.12em] text-text">{blog.title}</h3>
                      <p className="mt-2 text-sm uppercase tracking-[0.28em] text-primary/75">/{blog.slug}</p>
                    </div>
                    <div className="text-xs uppercase tracking-[0.26em] text-primary/55">Published {formatDate(blog.createdAt)}</div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-muted">
                    {blog.excerpt.length > 180 ? `${blog.excerpt.slice(0, 180).trim()}...` : blog.excerpt}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button type="button" className="gold-button" onClick={() => onEdit(blog)}>Edit</button>
                    <button type="button" className="ghost-button border-red-500/50 text-red-400 hover:bg-red-500/20 hover:text-white" onClick={() => onDelete(blog)} disabled={deletingId === blog._id}>
                      {deletingId === blog._id ? "Erasing..." : "Delete"}
                    </button>
                    <Link href={`/blog/${blog.slug}`} className="ghost-button">View Public Page</Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
