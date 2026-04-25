"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CinematicBackdrop from "@/components/CinematicBackdrop";
import Container from "@/components/Container";
import { getStoredAdminSession, saveStoredAdminSession } from "@/lib/admin-auth";
import { loginAdminRequest } from "@/lib/admin-api";

export default function AdminLoginView() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [values, setValues] = useState({
    email: "admin@dmcuved.com",
    password: "Dmcu@0405"
  });

  useEffect(() => {
    const session = getStoredAdminSession();

    if (session?.token) {
      router.replace("/admin/dashboard");
      return;
    }

    setReady(true);
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setBusy(true);
      setErrorMessage("");

      const payload = await loginAdminRequest(values);
      saveStoredAdminSession(payload);
      router.replace("/admin/dashboard");
    } catch (error) {
      setErrorMessage(error.message || "Unable to sign in right now.");
    } finally {
      setBusy(false);
    }
  };

  if (!ready) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-obsidian text-parchment">
        <CinematicBackdrop />
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
          <div className="section-panel gold-panel px-8 py-10 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-100/70">Preparing Admin Portal</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-obsidian text-parchment">
      <CinematicBackdrop />

      <div className="relative z-10 flex min-h-screen items-center px-4 py-10 sm:px-6">
        <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <section className="section-panel gold-panel overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
            <span className="eyebrow">Admin Access</span>
            <h1 className="mt-6 font-display text-4xl uppercase tracking-[0.18em] text-parchment sm:text-5xl">
              Command the DMCU universe
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-ash sm:text-lg">
              Sign in with the admin credentials configured in the backend `.env` file to manage character profiles,
              uploads, and the live frontend roster.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-100/60">Connected APIs</p>
                <p className="mt-3 text-sm leading-7 text-ash">
                  JWT login, character creation, updates, deletion, and file uploads are all wired to the backend.
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-black/25 p-5">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-100/60">Frontend Routes</p>
                <p className="mt-3 text-sm leading-7 text-ash">
                  Admin login lives at `/admin/login` and the management dashboard lives at `/admin/dashboard`.
                </p>
              </div>
            </div>
          </section>

          <section className="section-panel gold-panel overflow-hidden px-6 py-10 sm:px-10 sm:py-12">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-100/70">JWT Authentication</p>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <label className="block">
                <span className="admin-label">Email</span>
                <input
                  type="email"
                  value={values.email}
                  onChange={(event) => setValues((currentValues) => ({ ...currentValues, email: event.target.value }))}
                  className="admin-input"
                  placeholder="admin@dmcu.com"
                />
              </label>

              <label className="block">
                <span className="admin-label">Password</span>
                <input
                  type="password"
                  value={values.password}
                  onChange={(event) => setValues((currentValues) => ({ ...currentValues, password: event.target.value }))}
                  className="admin-input"
                  placeholder="Enter your admin password"
                />
              </label>

              {errorMessage && (
                <div className="rounded-[1.5rem] border border-red-400/20 bg-red-500/10 px-5 py-4 text-sm leading-7 text-red-100">
                  {errorMessage}
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <button type="submit" className="gold-button" disabled={busy}>
                  {busy ? "Signing In..." : "Login to Dashboard"}
                </button>
                <Link href="/" className="ghost-button">
                  Back to Site
                </Link>
              </div>
            </form>
          </section>
        </Container>
      </div>
    </main>
  );
}
