import type { HeroSegment } from "../hero/hero-content";

export type ConfiguratorTeaserContent = {
  eyebrow: string;
  heading: HeroSegment[];
  body: string;
  cta: { label: string; href: string };
  caption: string;
};

// Copie provisoire — à valider avec le client avant mise en ligne.
export const CONFIGURATOR_TEASER_CONTENT: ConfiguratorTeaserContent = {
  eyebrow: "Configurateur 3D",
  heading: [{ text: "Voyez votre " }, { text: "flocage", accent: true }, { text: " avant de commander." }],
  body: "Choisissez la couleur, importez votre logo et positionnez-le en direct sur un t-shirt en 3D — puis demandez votre devis en un clic.",
  cta: { label: "Configurateur 3D T-shirts", href: "/configurateur" },
  caption: "Aperçu en temps réel",
};
