"use client";

import { usePathname } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BackToTop from "@/components/BackToTop";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div id="site-wrapper" className="relative min-h-screen">
      {/* Global Cinematic Noise */}
      <div className="fixed inset-0 pointer-events-none z-[60] opacity-[0.03] mix-blend-overlay bg-[url('/noise.png')]" />
      
      {!isAdmin && <SiteHeader />}
      
      <main>
        {children}
      </main>

      {!isAdmin && <SiteFooter />}
      <BackToTop />
    </div>
  );
}
