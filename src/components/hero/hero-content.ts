export type HeroSegment = { text: string; accent?: boolean };

export type HeroContent = {
  eyebrow: string;
  headline: HeroSegment[][];
  subheadline: string;
  primaryCta: { label: string; href: string };
  tiktokCta: { label: string; href: string };
  // href: null = pas encore de compte/lien fourni par le client — le bouton s'affiche
  // désactivé ("Bientôt") plutôt que de pointer vers une URL inventée.
  instagramCta: { label: string; href: string | null };
  configuratorCta: { label: string; href: string };
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
  tiktokCta: { label: "TikTok", href: "https://www.tiktok.com/@flocage.by.breo" },
  instagramCta: { label: "Instagram", href: null },
  configuratorCta: { label: "Configurateur 3D T-shirts", href: "/configurateur" },
  trustLine: "Expédition partout en France",
};
