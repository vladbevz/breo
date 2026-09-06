export type ServiceTextSegment = { text: string; accent?: boolean };

export type PriceEntry = { label: string; price: string };
export type PriceCategory = { title: string; items: PriceEntry[] };

export type ServicesContent = {
  eyebrow: string;
  heading: ServiceTextSegment[];
  intro: string;
  categories: PriceCategory[];
  footnotes: string[];
};

// Grille tarifaire fournie par le client — données réelles.
export const SERVICES_CONTENT: ServicesContent = {
  eyebrow: "Nos tarifs",
  heading: [
    { text: "Une grille " },
    { text: "tarifaire", accent: true },
    { text: " claire, sans surprise." },
  ],
  intro: "Le prix de chaque pièce floquée, en un coup d'œil.",
  categories: [
    {
      title: "Textiles & accessoires",
      items: [
        { label: "T-shirt", price: "15 €" },
        { label: "Casquette", price: "15 €" },
        { label: "Bonnet", price: "15 €" },
        { label: "Polo", price: "20 €" },
        { label: "T-shirt Premium", price: "20 €" },
        { label: "Pull", price: "30 €" },
        { label: "Pull à capuche", price: "35 €" },
        { label: "Gilet sans manche", price: "50 €" },
        { label: "Veste", price: "60 €" },
      ],
    },
    {
      title: "Logo & design",
      items: [
        { label: "Création de logo", price: "50 €" },
        { label: "Modification de logo", price: "20 €" },
      ],
    },
  ],
  footnotes: ["Tarifs dégressifs possibles pour les commandes en quantité.", "Devis gratuit sur demande."],
};
