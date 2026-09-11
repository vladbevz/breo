import { HERO_CONTENT } from "@/components/hero/hero-content";

export type FooterLink = { label: string; href: string };

export type FooterContent = {
  tagline: string;
  tiktokHref: string;
  instagramHref: string | null;
  navLinks: FooterLink[];
  legalLinks: FooterLink[];
  mapCredit: { label: string; href: string };
};

// Copie provisoire — à valider avec le client avant mise en ligne.
export const FOOTER_CONTENT: FooterContent = {
  tagline: "Atelier de flocage textile — personnalisation et expédition partout en France.",
  tiktokHref: HERO_CONTENT.tiktokCta.href,
  instagramHref: HERO_CONTENT.instagramCta.href,
  navLinks: [
    { label: "Accueil", href: "/" },
    { label: "Tarifs", href: "/#tarifs" },
    { label: "Contact", href: "/#contact" },
    { label: "Configurateur 3D T-shirts", href: "/configurateur" },
  ],
  legalLinks: [
    { label: "Mentions légales", href: "/mentions-legales" },
    { label: "CGV", href: "/cgv" },
    { label: "Confidentialité", href: "/confidentialite" },
  ],
  mapCredit: { label: "Carte de France : svg-maps.com (CC BY 4.0)", href: "https://svg-maps.com" },
};
