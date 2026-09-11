"use server";

import { getBrevoClient, getBrevoSender } from "@/lib/brevo";
import { contactSubmissionSchema, type ContactSubmission } from "./contact-schema";
import { buildConfirmationEmail, buildNotificationEmail } from "./contact-emails";

export type ContactSubmitResult = { success: true } | { success: false; error: string };

export async function submitContactForm(input: ContactSubmission): Promise<ContactSubmitResult> {
  const parsed = contactSubmissionSchema.safeParse(input);
  if (!parsed.success) {
    console.error("[contact-actions] invalid submission:", parsed.error.flatten());
    return { success: false, error: "Formulaire invalide." };
  }

  const notificationTo = process.env.CONTACT_NOTIFICATION_EMAIL;
  if (!notificationTo) {
    console.error("[contact-actions] missing env var: CONTACT_NOTIFICATION_EMAIL");
    return { success: false, error: "Le formulaire n'est pas encore configuré. Contactez-nous directement." };
  }

  let brevo, sender;
  try {
    brevo = getBrevoClient();
    sender = getBrevoSender();
  } catch (error) {
    console.error("[contact-actions] Brevo not configured:", error);
    return { success: false, error: "Le formulaire n'est pas encore configuré. Contactez-nous directement." };
  }

  const data = parsed.data;

  const notification = buildNotificationEmail(data);
  try {
    await brevo.transactionalEmails.sendTransacEmail({
      sender,
      to: [{ email: notificationTo }],
      replyTo: { email: data.email },
      subject: notification.subject,
      htmlContent: notification.html,
    });
  } catch (error) {
    console.error("[contact-actions] notification email failed:", error);
    return { success: false, error: "Une erreur est survenue. Réessayez ou contactez-nous directement." };
  }

  const confirmation = buildConfirmationEmail(data);
  try {
    await brevo.transactionalEmails.sendTransacEmail({
      sender,
      to: [{ email: data.email, name: data.name }],
      subject: confirmation.subject,
      htmlContent: confirmation.html,
    });
  } catch (error) {
    // La demande est déjà capturée côté notification — on journalise sans faire
    // échouer l'expérience utilisateur pour cet email de courtoisie.
    console.error("[contact-actions] confirmation email failed:", error);
  }

  return { success: true };
}
