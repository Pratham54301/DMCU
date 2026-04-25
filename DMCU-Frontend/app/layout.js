import { ThemeProvider } from "./theme-context";
import { LanguageProvider } from "./language-context";
import "../styles/globals.css";

export const metadata = {
  title: "DMCU Frontend",
  description: "A cinematic DMCU landing page built with Next.js, Tailwind CSS, and Framer Motion.",
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <div id="site-wrapper" className="relative min-h-screen">
               {/* Global Cinematic Noise */}
               <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay bg-[url('/noise.png')]" />
               {children}
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
