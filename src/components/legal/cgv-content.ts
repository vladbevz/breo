import type { LegalPageContent } from "./mentions-legales-content";

// Copie provisoire — champs entre crochets à remplacer par les informations réelles du client avant mise en ligne.
export const CGV_CONTENT: LegalPageContent = {
  eyebrow: "Conditions générales",
  heading: "Conditions Générales de Vente",
  intro: "Les présentes conditions régissent les commandes de flocage textile passées auprès de Flocage By Breo.",
  sections: [
    {
      heading: "Objet",
      paragraphs: [
        "Les présentes conditions générales de vente définissent les modalités de commande, de production et de livraison des prestations de flocage textile proposées par [raison sociale].",
      ],
    },
    {
      heading: "Prix",
      paragraphs: [
        "Les prix indiqués sur le site sont exprimés en euros. Toute commande fait l'objet d'un devis personnalisé tenant compte de la quantité, du support et du visuel à floquer.",
      ],
    },
    {
      heading: "Commande",
      paragraphs: [
        "Toute commande est confirmée après validation du devis par le client et réception des fichiers nécessaires à la production.",
      ],
    },
    {
      heading: "Paiement",
      paragraphs: ["Le paiement s'effectue selon les modalités précisées sur le devis : [modalités de paiement à préciser]."],
    },
    {
      heading: "Livraison",
      paragraphs: [
        "Les commandes sont expédiées partout en France. Les délais indicatifs sont communiqués lors de la confirmation de commande et peuvent varier selon la quantité et la technique de flocage.",
      ],
    },
    {
      heading: "Droit de rétractation",
      paragraphs: [
        "Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux produits personnalisés selon les spécifications du client.",
      ],
    },
    {
      heading: "Réclamations",
      paragraphs: ["Toute réclamation doit être adressée via le formulaire de contact dans un délai de [délai] jours après réception de la commande."],
    },
    {
      heading: "Droit applicable",
      paragraphs: ["Les présentes conditions sont soumises au droit français. Tout litige relève de la compétence des tribunaux de [ville]."],
    },
  ],
};
