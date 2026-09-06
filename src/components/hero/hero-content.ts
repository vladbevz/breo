export type HeroSegment = { text: string; accent?: boolean };

export type HeroContent = {
  eyebrow: string;
  headline: HeroSegment[][];
  subheadline: string;
  primaryCta: { label: string; href: string };
  tiktokCta: { label: string; href: string };
  trustLine?: string;
};

// Copie provisoire — à valider avec le client avant mise en ligne.
export const HERO_CONTENT: HeroContent = {
  eyebrow: "Atelier de flocage textile",
  headline: [
    [{ text: "Votre image," }],
    [{ text: "flocée", accent: true }, { text: " avec précision." }],
  ],
  subheadline:
    "T-shirts, sweats, vêtements de travail et textile événementiel — personnalisés et expédiés partout en France.",
  primaryCta: { label: "Demander un devis", href: "#contact" },
  tiktokCta: { label: "Voir nos réalisations", href: "https://www.tiktok.com/@flocage.by.breo" },
  trustLine: "Expédition partout en France",
};
