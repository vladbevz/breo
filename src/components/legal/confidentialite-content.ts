import type { LegalPageContent } from "./mentions-legales-content";

// Copie provisoire — champs entre crochets à remplacer par les informations réelles du client avant mise en ligne.
export const CONFIDENTIALITE_CONTENT: LegalPageContent = {
  eyebrow: "Données personnelles",
  heading: "Politique de confidentialité",
  intro: "Cette page explique quelles données sont collectées via ce site et comment elles sont utilisées.",
  sections: [
    {
      heading: "Responsable du traitement",
      paragraphs: ["[Raison sociale], [adresse], est responsable du traitement des données collectées sur ce site."],
    },
    {
      heading: "Données collectées",
      paragraphs: [
        "Le formulaire de contact collecte : nom ou raison sociale, adresse email, téléphone, type de projet, quantité approximative, message, ainsi que les fichiers (logos, visuels) que vous transmettez pour votre demande de devis.",
      ],
    },
    {
      heading: "Finalités",
      paragraphs: [
        "Ces données sont utilisées exclusivement pour répondre à votre demande de devis et assurer le suivi de votre commande.",
      ],
    },
    {
      heading: "Base légale",
      paragraphs: ["Le traitement repose sur l'exécution de mesures précontractuelles prises à votre demande."],
    },
    {
      heading: "Durée de conservation",
      paragraphs: ["Les données sont conservées pendant [durée] à compter de votre dernière demande, sauf obligation légale contraire."],
    },
    {
      heading: "Vos droits",
      paragraphs: [
        "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition sur vos données. Pour exercer ces droits, contactez [adresse email de contact].",
      ],
    },
    {
      heading: "Cookies",
      paragraphs: ["Ce site n'utilise pas de cookies de suivi ou de mesure d'audience à ce jour."],
    },
  ],
};
