import type { LegalSectionContent } from "./LegalSection";

export type LegalPageContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  sections: LegalSectionContent[];
};

// Données réelles du client (SIREN/SIRET + adresse du siège vérifiés). Adresse de
// Vercel Inc. récupérée directement sur vercel.com/legal/privacy-policy (section
// "Contact Us"), pas de mémoire -- à re-vérifier si cette page change.
export const MENTIONS_LEGALES_CONTENT: LegalPageContent = {
  eyebrow: "Informations légales",
  heading: "Mentions légales",
  intro: "Conformément à la loi, les informations suivantes identifient l'éditeur et l'hébergeur de ce site.",
  sections: [
    {
      heading: "Éditeur du site",
      paragraphs: [
        "Flocage By Breo est exploité par Olivier Brennstuhl, entrepreneur individuel, immatriculé sous le numéro SIREN 848 650 602 et le numéro SIRET 848 650 602 00016.",
        "Siège social : 115 rue de Bretagne, 57800 Freyming-Merlebach.",
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
        "Ce site est hébergé par Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis.",
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
