import type { Metadata } from "next";
import { clashDisplay, generalSans } from "@/lib/fonts";
import { Footer } from "@/components/footer/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.flocagebybreo.fr"),
  title: {
    default: "Flocage By Breo — Flocage textile personnalisé, livraison France",
    template: "%s — Flocage By Breo",
  },
  description:
    "Flocage textile professionnel : t-shirts, sweats, polos, vêtements de travail et textile événementiel. Devis rapide, upload de vos visuels, expédition partout en France.",
  keywords: [
    "flocage textile",
    "flocage textile France",
    "personnalisation vêtement",
    "flocage t-shirt",
    "flocage vêtement de travail",
    "impression textile entreprise",
  ],
  openGraph: {
    title: "Flocage By Breo — Flocage textile personnalisé",
    description:
      "Flocage textile professionnel, livraison partout en France. Demandez votre devis en ligne.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${clashDisplay.variable} ${generalSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-bone font-body">
        {children}
        <Footer />
      </body>
    </html>
  );
}
