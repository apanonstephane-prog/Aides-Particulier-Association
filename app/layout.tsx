import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AidesConnect — Particuliers & Associations",
  description: "Trouvez les aides financières adaptées à votre situation familiale ou à votre statut associatif. Guide complet des subventions, allocations et soutiens disponibles en France.",
  keywords: "aides financières, particuliers, associations, subventions, allocations, famille, loi 1901",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
