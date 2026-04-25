import Link from "next/link";

import { buildMediaUrl } from "@/lib/api";

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium"
  }).format(new Date(value));

function CharacterRowSkeleton() {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
        <div className="h-28 w-full animate-pulse rounded-[1.5rem] bg-white/5 lg:w-36" />
        <div className="flex-1 space-y-3">
          <div className="h-6 w-40 animate-pulse rounded-full bg-white/5" />
          <div className="h-4 w-56 animate-pulse rounded-full bg-white/5" />
          <div className="h-4 w-full animate-pulse rounded-full bg-white/5" />
          <div className="h-4 w-5/6 animate-pulse rounded-full bg-white/5" />
        </div>
      </div>
    </div>
  );
}

export default function CharacterManagementList({
  characters,
  status,
  errorMessage,
  deletingId,
  activeCharacterId,
  onRefresh,
  onEdit,
  onDelete
}) {
  return (
    <section id="library" className="section-panel gold-panel overflow-hidden p-6 sm:p-8">
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow">Character Library</span>
          <h2 className="mt-4 font-display text-3xl uppercase tracking-[0.16em] text-parchment sm:text-4xl">
            Edit or remove existing entries
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-ash sm:text-base">
            Every record below is connected to the backend API. Edit an entry to preload its data in the form above or
            delete it permanently from the database.
          </p>
        </div>

        <button type="button" className="ghost-button" onClick={onRefresh}>
          Refresh List
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {status === "loading" &&
          Array.from({ length: 3 }, (_, index) => <CharacterRowSkeleton key={index} />)}

        {status === "error" && (
          <div className="rounded-[1.75rem] border border-red-400/20 bg-red-500/10 px-6 py-5 text-sm leading-7 text-red-100">
            {errorMessage}
          </div>
        )}

        {status === "success" && characters.length === 0 && (
          <div className="rounded-[1.75rem] border border-white/10 bg-black/25 px-6 py-8 text-center">
            <p className="font-display text-2xl uppercase tracking-[0.14em] text-parchment">No characters found</p>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-ash sm:text-base">
              Create your first character from the editor above and it will appear here automatically.
            </p>
          </div>
        )}

        {status === "success" &&
          characters.map((character) => {
            const imageUrl = buildMediaUrl(character.image);
            const isActive = activeCharacterId === character._id;

            return (
              <article
                key={character._id}
                className={`rounded-[1.75rem] border bg-black/25 p-5 transition ${
                  isActive ? "border-amber-200/35 shadow-glow" : "border-white/10"
                }`}
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                  <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/35 lg:w-40">
                    {imageUrl ? (
                      <img src={imageUrl} alt={character.name} className="h-28 w-full object-cover lg:h-32" />
                    ) : (
                      <div className="flex h-28 items-center justify-center px-4 text-center text-[0.7rem] uppercase tracking-[0.28em] text-amber-100/70 lg:h-32">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-display text-2xl uppercase tracking-[0.12em] text-parchment">
                            {character.name}
                          </h3>
                          <span className="status-pill">{character.role}</span>
                        </div>
                        <p className="mt-2 text-sm uppercase tracking-[0.28em] text-amber-100/75">{character.title}</p>
                      </div>

                      <div className="text-xs uppercase tracking-[0.26em] text-amber-100/55">
                        Added {formatDate(character.createdAt)}
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-ash">
                      {character.description.length > 180
                        ? `${character.description.slice(0, 180).trim()}...`
                        : character.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <button type="button" className="gold-button" onClick={() => onEdit(character)}>
                        Edit
                      </button>
                      <button
                        type="button"
                        className="ghost-button"
                        onClick={() => onDelete(character)}
                        disabled={deletingId === character._id}
                      >
                        {deletingId === character._id ? "Deleting..." : "Delete"}
                      </button>
                      <Link href={`/character/${character._id}`} className="ghost-button">
                        View Public Page
                      </Link>
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
