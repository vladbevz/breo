"use server";

import { Resend } from "resend";
import { getDesign } from "@/lib/designs";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { devisFormSchema, type DevisFormValues } from "./devis-schema";
import { buildDevisConfirmationEmail, buildDevisNotificationEmail } from "./devis-emails";

export type DevisSubmitResult = { success: true } | { success: false; error: string };

export async function submitDevis(id: string, input: DevisFormValues): Promise<DevisSubmitResult> {
  const parsed = devisFormSchema.safeParse(input);
  if (!parsed.success) {
    console.error("[devis-actions] invalid submission:", parsed.error.flatten());
    return { success: false, error: "Formulaire invalide." };
  }
  const data = parsed.data;

  const design = await getDesign(id);
  if (!design) {
    return { success: false, error: "Modèle introuvable. Reconfigurez votre design." };
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error: updateError } = await supabase
      .from("designs")
      .update({
        contact_name: data.name,
        contact_company: data.company || null,
        contact_email: data.email,
        contact_phone: data.phone || null,
        contact_message: data.message || null,
        status: "submitted",
      })
      .eq("id", id);
    if (updateError) throw updateError;
  } catch (error) {
    console.error("[devis-actions] failed to save contact info:", error);
    return { success: false, error: "Cette fonctionnalité n'est pas encore configurée. Contactez-nous directement." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM_EMAIL;
  const notificationTo = process.env.CONTACT_NOTIFICATION_EMAIL;

  if (!apiKey || !fromAddress || !notificationTo) {
    console.error(
      "[devis-actions] missing env vars: RESEND_API_KEY / RESEND_FROM_EMAIL / CONTACT_NOTIFICATION_EMAIL",
    );
    // La demande est deja enregistree en base -- le lead n'est pas perdu, seul
    // l'email echoue silencieusement du point de vue de l'utilisateur.
    return { success: true };
  }

  const resend = new Resend(apiKey);

  const notification = buildDevisNotificationEmail(design, data);
  const notificationResult = await resend.emails.send({
    from: fromAddress,
    to: notificationTo,
    replyTo: data.email,
    subject: notification.subject,
    html: notification.html,
  });
  if (notificationResult.error) {
    console.error("[devis-actions] notification email failed:", notificationResult.error);
  }

  const confirmation = buildDevisConfirmationEmail(data);
  const confirmationResult = await resend.emails.send({
    from: fromAddress,
    to: data.email,
    subject: confirmation.subject,
    html: confirmation.html,
  });
  if (confirmationResult.error) {
    console.error("[devis-actions] confirmation email failed:", confirmationResult.error);
  }

  return { success: true };
}

export async function resendDevisConfirmation(id: string): Promise<DevisSubmitResult> {
  const design = await getDesign(id);
  if (!design || !design.contact_email || !design.contact_name) {
    return { success: false, error: "Aucune demande trouvée pour cette référence." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !fromAddress) {
    return { success: false, error: "Cette fonctionnalité n'est pas encore configurée. Contactez-nous directement." };
  }

  const resend = new Resend(apiKey);
  const confirmation = buildDevisConfirmationEmail({
    name: design.contact_name,
    company: design.contact_company ?? "",
    email: design.contact_email,
    phone: design.contact_phone ?? "",
    message: design.contact_message ?? "",
  });

  const result = await resend.emails.send({
    from: fromAddress,
    to: design.contact_email,
    subject: confirmation.subject,
    html: confirmation.html,
  });

  if (result.error) {
    console.error("[devis-actions] resend confirmation failed:", result.error);
    return { success: false, error: "L'envoi a échoué. Réessayez dans un instant." };
  }

  return { success: true };
}
