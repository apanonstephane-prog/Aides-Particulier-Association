import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Aides Connect — Orientation vers les aides et démarches administratives",
    template: "%s | Aides Connect",
  },
  description:
    "Aides Connect simplifie le repérage des aides, subventions et démarches administratives pour les particuliers et les associations. Gratuit, sans inscription, avec liens vers les sources officielles.",
  keywords: [
    "aides particuliers",
    "subventions associations",
    "démarches administratives",
    "orientation aides sociales",
    "formulaires administratifs",
    "aides familiales",
    "aides logement",
    "aides association loi 1901",
  ],
  authors: [{ name: "Aides Connect" }],
  creator: "Aides Connect",
  metadataBase: new URL("https://aides-connect.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://aides-connect.vercel.app",
    siteName: "Aides Connect",
    title: "Aides Connect — Orientation vers les aides et démarches administratives",
    description:
      "Trouvez les aides, subventions et démarches pertinentes selon votre situation. Gratuit pour les particuliers et les associations.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aides Connect — Moins de temps perdu à chercher. Plus de clarté pour agir.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aides Connect — Orientation vers les aides et démarches administratives",
    description:
      "Trouvez les aides, subventions et démarches pertinentes selon votre situation. Gratuit pour les particuliers et les associations.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
