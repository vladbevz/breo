export type GarmentColor = { id: string; label: string; hex: string };

// Catalogue indicatif de coloris courants pour vêtements floqués — à aligner avec le
// catalogue fournisseur réel du client avant mise en ligne.
export const GARMENT_PALETTE: GarmentColor[] = [
  { id: "blanc", label: "Blanc", hex: "#f2efe9" },
  { id: "noir", label: "Noir", hex: "#111111" },
  { id: "gris-chine", label: "Gris chiné", hex: "#8a8a8d" },
  { id: "marine", label: "Marine", hex: "#1c2740" },
  { id: "bordeaux", label: "Bordeaux", hex: "#5c1a2b" },
  { id: "kaki", label: "Kaki", hex: "#5b5a3f" },
  { id: "vert-foret", label: "Vert forêt", hex: "#2c4a3a" },
  { id: "jaune", label: "Jaune", hex: "#e8b93c" },
  { id: "orange", label: "Orange", hex: "#d9702f" },
  { id: "rouge", label: "Rouge", hex: "#a32d2d" },
  { id: "bleu-roi", label: "Bleu roi", hex: "#2447a3" },
  { id: "rose", label: "Rose", hex: "#c96b8a" },
];
