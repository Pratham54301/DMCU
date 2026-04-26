"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/context/UserContext";
import CinematicBackdrop from "@/components/CinematicBackdrop";
import UserDashboardView from "@/components/user/UserDashboardView";
import LoadingScreen from "@/components/LoadingScreen";

export default function DashboardPage() {
  const { user, loading: authLoading } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    } else if (!authLoading && user) {
      setTimeout(() => setLoading(false), 1500);
    }
  }, [user, authLoading, router]);

  if (authLoading || loading) return <LoadingScreen onComplete={() => setLoading(false)} />;

  return (
    <main className="min-h-screen bg-black text-parchment relative overflow-hidden">
      <CinematicBackdrop />
      <div className="relative z-10 pt-24 pb-20">
         <UserDashboardView user={user} />
      </div>
    </main>
  );
}
