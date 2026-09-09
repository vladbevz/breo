export type ContactSegment = { text: string; accent?: boolean };

export type ProjectTypeOption = {
  value: "t-shirts" | "sweats" | "vetements-travail" | "evenementiel" | "autre";
  label: string;
};

export type ContactContent = {
  eyebrow: string;
  heading: ContactSegment[];
  intro: string;
  reassurance: string[];
  projectTypes: ProjectTypeOption[];
  fields: {
    name: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    projectType: { label: string; placeholder: string };
    quantity: { label: string; placeholder: string };
    message: { label: string; placeholder: string };
  };
  filesLabel: string;
  filesHint: string;
  submitLabel: string;
  submittingLabel: string;
  success: { heading: string; body: string };
  genericError: string;
};

// Copie provisoire — à valider avec le client avant mise en ligne.
export const CONTACT_CONTENT: ContactContent = {
  eyebrow: "Demander un devis",
  heading: [{ text: "Un projet à " }, { text: "floquer", accent: true }, { text: " ? Parlons-en." }],
  intro: "Décrivez votre projet et joignez vos visuels — nous revenons vers vous avec un devis sous 24h ouvrées.",
  reassurance: [
    "Devis gratuit, sans engagement",
    "Réponse sous 24h ouvrées",
    "Fichiers transmis de façon confidentielle",
  ],
  projectTypes: [
    { value: "t-shirts", label: "T-shirts" },
    { value: "sweats", label: "Sweats" },
    { value: "vetements-travail", label: "Vêtements de travail" },
    { value: "evenementiel", label: "Événementiel" },
    { value: "autre", label: "Autre" },
  ],
  fields: {
    name: { label: "Nom / Entreprise", placeholder: "Jean Dupont ou Ma Société" },
    email: { label: "Email", placeholder: "vous@exemple.fr" },
    phone: { label: "Téléphone", placeholder: "06 12 34 56 78" },
    projectType: { label: "Type de projet", placeholder: "Choisissez une catégorie" },
    quantity: { label: "Quantité approximative", placeholder: "Ex. 50 pièces" },
    message: { label: "Message", placeholder: "Décrivez votre projet, délais souhaités…" },
  },
  filesLabel: "Vos fichiers (logo, visuels à floquer)",
  filesHint: "PNG, JPG, SVG, PDF, AI, EPS — 15 Mo max par fichier",
  submitLabel: "Envoyer ma demande",
  submittingLabel: "Envoi en cours…",
  success: {
    heading: "Demande envoyée.",
    body: "Merci — nous revenons vers vous sous 24h ouvrées avec votre devis.",
  },
  genericError: "Une erreur est survenue. Réessayez ou contactez-nous directement.",
};
