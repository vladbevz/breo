export type NavItem = { id: "hero" | "tarifs" | "contact"; label: string; href: string };

export const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "Accueil", href: "#hero" },
  { id: "tarifs", label: "Tarifs", href: "#tarifs" },
  { id: "contact", label: "Contact", href: "#contact" },
];
