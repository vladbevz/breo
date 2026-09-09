"use server";

import { Resend } from "resend";
import { contactSubmissionSchema, type ContactSubmission } from "./contact-schema";
import { buildConfirmationEmail, buildNotificationEmail } from "./contact-emails";

export type ContactSubmitResult = { success: true } | { success: false; error: string };

export async function submitContactForm(input: ContactSubmission): Promise<ContactSubmitResult> {
  const parsed = contactSubmissionSchema.safeParse(input);
  if (!parsed.success) {
    console.error("[contact-actions] invalid submission:", parsed.error.flatten());
    return { success: false, error: "Formulaire invalide." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM_EMAIL;
  const notificationTo = process.env.CONTACT_NOTIFICATION_EMAIL;

  if (!apiKey || !fromAddress || !notificationTo) {
    console.error(
      "[contact-actions] missing env vars: RESEND_API_KEY / RESEND_FROM_EMAIL / CONTACT_NOTIFICATION_EMAIL",
    );
    return { success: false, error: "Le formulaire n'est pas encore configuré. Contactez-nous directement." };
  }

  const resend = new Resend(apiKey);
  const data = parsed.data;

  const notification = buildNotificationEmail(data);
  const notificationResult = await resend.emails.send({
    from: fromAddress,
    to: notificationTo,
    replyTo: data.email,
    subject: notification.subject,
    html: notification.html,
  });

  if (notificationResult.error) {
    console.error("[contact-actions] notification email failed:", notificationResult.error);
    return { success: false, error: "Une erreur est survenue. Réessayez ou contactez-nous directement." };
  }

  const confirmation = buildConfirmationEmail(data);
  const confirmationResult = await resend.emails.send({
    from: fromAddress,
    to: data.email,
    subject: confirmation.subject,
    html: confirmation.html,
  });

  if (confirmationResult.error) {
    // La demande est déjà capturée côté notification — on journalise sans faire
    // échouer l'expérience utilisateur pour cet email de courtoisie.
    console.error("[contact-actions] confirmation email failed:", confirmationResult.error);
  }

  return { success: true };
}
