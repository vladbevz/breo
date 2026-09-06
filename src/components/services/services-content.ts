export type ServiceTextSegment = { text: string; accent?: boolean };

export type ServiceEntry = {
  id: string;
  index: string;
  title: string;
  /** Sous-chaîne exacte de `title` à mettre en avant via .text-signature (carte "featured" uniquement). */
  accentWord?: string;
  description: string;
  techniques: string[];
  fabrics?: string;
  layout?: "featured" | "wide";
};

export type ServicesContent = {
  eyebrow: string;
  heading: ServiceTextSegment[];
  intro: string;
  note: string;
  services: ServiceEntry[];
};

// Copie provisoire — à valider avec le client avant mise en ligne.
export const SERVICES_CONTENT: ServicesContent = {
  eyebrow: "Nos techniques de flocage",
  heading: [
    { text: "Une technique pour " },
    { text: "chaque projet", accent: true },
    { text: "." },
  ],
  intro:
    "Flex, flocage, sublimation ou broderie : chaque technique est choisie selon votre textile, votre budget et le rendu recherché.",
  note: "Tarifs communiqués sur devis, adaptés à la quantité et à la technique choisie.",
  services: [
    {
      id: "flocage",
      index: "01",
      layout: "featured",
      title: "Flocage velours",
      accentWord: "Flocage",
      description:
        "La technique historique de l'atelier : un rendu texturé et velouté qui donne du relief au visuel, avec une excellente tenue au lavage.",
      techniques: ["Effet velours", "Bonne tenue lavage", "Coloris unis"],
      fabrics: "Coton, coton/polyester, sweat molletonné",
    },
    {
      id: "flex",
      index: "02",
      title: "Flex thermocollant",
      description:
        "Découpe vinyle collée à chaud : contours nets, coloris vifs, adapté aux petites séries et aux logos simples.",
      techniques: ["Flex mat", "Flex brillant", "Flex pailleté"],
      fabrics: "Coton, coton/élasthanne",
    },
    {
      id: "sublimation",
      index: "03",
      title: "Sublimation textile",
      description:
        "Impression par transfert thermique sur fibres synthétiques : visuels grand format, dégradés et photos sans limite de couleurs.",
      techniques: ["Full color", "Dégradés", "Grand format"],
      fabrics: "Polyester, textile technique et sportif",
    },
    {
      id: "broderie",
      index: "04",
      title: "Broderie",
      description:
        "Un fil qui s'inscrit dans la matière pour un rendu qualitatif et durable, particulièrement adapté aux logos d'entreprise.",
      techniques: ["Fil mat ou brillant", "Rendu premium", "Petits logos"],
      fabrics: "Polos, chemises, casquettes",
    },
    {
      id: "travail",
      index: "05",
      title: "Vêtements de travail",
      description:
        "Personnalisation de tenues professionnelles résistantes, pensées pour un usage quotidien et une image de marque cohérente.",
      techniques: ["Marquage multi-pièces", "Résistance renforcée"],
      fabrics: "Softshell, treillis, haute visibilité",
    },
    {
      id: "evenementiel",
      index: "06",
      layout: "wide",
      title: "Textile événementiel et sportif",
      description:
        "Séries pour associations, clubs et événements : maillots, t-shirts et accessoires personnalisés en volume.",
      techniques: ["Numérotation", "Marquage dos/manches", "Séries moyennes et grandes"],
      fabrics: "Jersey sport, coton événementiel",
    },
  ],
};
