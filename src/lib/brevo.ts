import { BrevoClient } from "@getbrevo/brevo";

export type EmailAddress = { email: string; name?: string };

export function getBrevoClient(): BrevoClient {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    throw new Error("Brevo n'est pas encore configure (BREVO_API_KEY manquant).");
  }
  return new BrevoClient({ apiKey });
}

export function getBrevoSender(): EmailAddress {
  const email = process.env.BREVO_FROM_EMAIL;
  if (!email) {
    throw new Error("Brevo n'est pas encore configure (BREVO_FROM_EMAIL manquant).");
  }
  return { email, name: "Flocage By Breo" };
}
