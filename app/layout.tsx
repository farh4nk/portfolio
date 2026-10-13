import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { profile } from "@/content/profile";
import "lenis/dist/lenis.css";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.name} — Software Engineer`,
  description: `${profile.tagline} ${profile.summary}`,
  openGraph: {
    title: `${profile.name} — Software Engineer`,
    description: profile.tagline,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#070b14",
};

// Runs before paint: applies the saved theme and marks JS as available,
// so animated content is only hidden when the animation code can reveal it.
const bootScript = `(function(d){
  d.classList.add('js');
  try { var t = localStorage.getItem('theme'); if (t === 'light' || t === 'dark') d.setAttribute('data-theme', t); } catch (e) {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) d.classList.add('motion-reduced');
})(document.documentElement);`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: "Software Engineer",
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "New York", addressRegion: "NY" },
  alumniOf: "CUNY City College",
  sameAs: [profile.links.github, profile.links.linkedin],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
