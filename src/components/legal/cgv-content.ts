import type { LegalPageContent } from "./mentions-legales-content";

// Donnees reelles du client (identite, modalites de paiement). Le delai de
// reclamation n'est pas un nombre de jours fixe par la loi pour une simple
// reclamation -- seules les garanties legales ci-dessous ont une duree fixee par
// le Code de la consommation / le Code civil ; le client a demande le "standard
// legal" plutot qu'un delai contractuel invente.
export const CGV_CONTENT: LegalPageContent = {
  eyebrow: "Conditions générales",
  heading: "Conditions Générales de Vente",
  intro: "Les présentes conditions régissent les commandes de flocage textile passées auprès de Flocage By Breo.",
  sections: [
    {
      heading: "Objet",
      paragraphs: [
        "Les présentes conditions générales de vente définissent les modalités de commande, de production et de livraison des prestations de flocage textile proposées par Olivier Brennstuhl, entrepreneur individuel exploitant Flocage By Breo (SIRET 848 650 602 00016).",
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
      paragraphs: ["Le paiement s'effectue selon les modalités précisées sur le devis, établi individuellement pour chaque commande."],
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
      paragraphs: [
        "Toute réclamation peut être adressée via le formulaire de contact.",
        "Conformément à la garantie légale de conformité (articles L217-3 et suivants du Code de la consommation), vous disposez d'un délai de 2 ans à compter de la délivrance du produit pour agir en cas de défaut de conformité. Pour les vices cachés, l'article 1648 du Code civil prévoit un délai de 2 ans à compter de la découverte du vice.",
      ],
    },
    {
      heading: "Droit applicable",
      paragraphs: ["Les présentes conditions sont soumises au droit français. Tout litige relève de la compétence des tribunaux français compétents."],
    },
  ],
};
