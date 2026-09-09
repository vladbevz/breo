import { z } from "zod";

export const PROJECT_TYPE_VALUES = [
  "t-shirts",
  "sweats",
  "vetements-travail",
  "evenementiel",
  "autre",
] as const;

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom ou celui de votre entreprise.").max(120),
  email: z.string().trim().min(1, "L'email est requis.").email("Adresse email invalide."),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  projectType: z.enum(PROJECT_TYPE_VALUES, { message: "Sélectionnez un type de projet." }),
  quantity: z.string().trim().max(50).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Un message un peu plus détaillé nous aide à préparer votre devis.").max(2000),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

const contactFileSchema = z.object({
  url: z.string().url(),
  downloadUrl: z.string().url(),
  pathname: z.string(),
  size: z.number().nonnegative(),
});

export const contactSubmissionSchema = contactFormSchema.extend({
  files: z.array(contactFileSchema).max(10),
});

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;
