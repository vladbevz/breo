import { z } from "zod";

export const devisFormSchema = z.object({
  name: z.string().trim().min(2, "Indiquez votre nom.").max(120),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  email: z.string().trim().min(1, "L'email est requis.").email("Adresse email invalide."),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export type DevisFormValues = z.infer<typeof devisFormSchema>;
