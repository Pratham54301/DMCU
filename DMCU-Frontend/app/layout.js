import { ThemeProvider } from "./theme-context";
import { LanguageProvider } from "./language-context";
import { UserProvider } from "@/context/UserContext";
import LayoutWrapper from "@/components/LayoutWrapper";
import "../styles/globals.css";

async function getSEO() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002'}/api/seo`, { next: { revalidate: 3600 } });
    const data = await res.json();
    return data.success ? data.data : null;
  } catch (err) {
    return null;
  }
}

export async function generateMetadata() {
  const seo = await getSEO();
  const defaultTitle = "DMCU | The Premium Digital Multiverse Hub";
  const defaultDesc = "Experience the DMCU like never before. Characters, comics, and lore from the most ambitious digital saga.";
  
  return {
    title: seo?.siteTitle || defaultTitle,
    description: seo?.siteDescription || defaultDesc,
    keywords: seo?.keywords?.join(', ') || "DMCU, Multiverse, Mythology, Sci-Fi, Comics",
    openGraph: {
      title: seo?.siteTitle || defaultTitle,
      description: seo?.siteDescription || defaultDesc,
      images: [seo?.ogImage || '/og-image.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      site: seo?.twitterHandle || '@dmcu_archives',
    },
    alternates: {
      canonical: seo?.canonicalUrl || 'https://dmcu.vercel.app',
    }
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="bg-black text-white antialiased overflow-x-hidden">
        <ThemeProvider>
          <LanguageProvider>
            <UserProvider>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </UserProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
