import type { LegalSectionContent } from "./LegalSection";

export type LegalPageContent = {
  eyebrow: string;
  heading: string;
  intro: string;
  sections: LegalSectionContent[];
};

// Copie provisoire — champs entre crochets à remplacer par les informations réelles du client avant mise en ligne.
export const MENTIONS_LEGALES_CONTENT: LegalPageContent = {
  eyebrow: "Informations légales",
  heading: "Mentions légales",
  intro: "Conformément à la loi, les informations suivantes identifient l'éditeur et l'hébergeur de ce site.",
  sections: [
    {
      heading: "Éditeur du site",
      paragraphs: [
        "[Raison sociale], [forme juridique] au capital de [montant] €, immatriculée au Registre du Commerce et des Sociétés sous le numéro SIRET [numéro SIRET].",
        "Siège social : [adresse complète].",
        "Numéro de TVA intracommunautaire : [numéro de TVA].",
      ],
    },
    {
      heading: "Directeur de publication",
      paragraphs: ["[Nom et prénom du directeur de publication]."],
    },
    {
      heading: "Hébergeur",
      paragraphs: [
        "Ce site est hébergé par [nom de l'hébergeur], [adresse de l'hébergeur].",
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
      paragraphs: ["Pour toute question relative au site, utilisez le formulaire de contact ou écrivez à [adresse email de contact]."],
    },
  ],
};
