import type { LegalSectionContent } from "./LegalSection";

export type LegalPageContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  sections: LegalSectionContent[];
};

// Données réelles du client (SIREN/SIRET vérifiés), à l'exception des champs encore
// entre crochets : l'adresse complète du siège (seule la commune est connue,
// Freyming-Merlebach) et l'adresse exacte de l'hébergeur (à vérifier sur
// vercel.com/legal avant mise en ligne).
export const MENTIONS_LEGALES_CONTENT: LegalPageContent = {
  eyebrow: "Informations légales",
  heading: "Mentions légales",
  intro: "Conformément à la loi, les informations suivantes identifient l'éditeur et l'hébergeur de ce site.",
  sections: [
    {
      heading: "Éditeur du site",
      paragraphs: [
        "Flocage By Breo est exploité par Olivier Brennstuhl, entrepreneur individuel, immatriculé sous le numéro SIREN 848 650 602 et le numéro SIRET 848 650 602 00016.",
        "Siège social : Freyming-Merlebach [adresse complète à compléter].",
        "Numéro de TVA intracommunautaire : FR93 848650602.",
      ],
    },
    {
      heading: "Directeur de publication",
      paragraphs: ["Olivier Brennstuhl."],
    },
    {
      heading: "Hébergeur",
      paragraphs: [
        "Ce site est hébergé par Vercel Inc. [adresse à vérifier sur vercel.com/legal].",
        "Le nom de domaine est enregistré auprès d'OVH SAS, 2 rue Kellermann, 59100 Roubaix, France.",
      ],
    },
    {
      heading: "Propriété intellectuelle",
      paragraphs: [
        "L'ensemble des contenus présents sur ce site (textes, images, logo, visuels) est la propriété de Flocage By Breo, sauf mention contraire, et ne peut être reproduit sans autorisation préalable.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: ["Pour toute question relative au site, utilisez le formulaire de contact ou écrivez à flocagebybreo@gmail.com."],
    },
  ],
};
