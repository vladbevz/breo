import type { ContactSubmission } from "./contact-schema";
import { CONTACT_CONTENT } from "./contact-content";
import { EMAIL_BRAND_MAGENTA as BRAND_MAGENTA, EMAIL_BONE_DIM as BONE_DIM, escapeHtml, wrapEmail } from "@/lib/email-template";

function projectTypeLabel(value: ContactSubmission["projectType"]): string {
  return CONTACT_CONTENT.projectTypes.find((option) => option.value === value)?.label ?? value;
}

export function buildNotificationEmail(data: ContactSubmission): { subject: string; html: string } {
  const filesHtml =
    data.files.length > 0
      ? `<p style="margin:16px 0 4px;font-weight:bold;">Fichiers joints :</p><ul style="padding-left:18px;margin:0;">${data.files
          .map(
            (file) =>
              `<li style="margin-bottom:4px;"><a href="${file.downloadUrl}" style="color:${BRAND_MAGENTA};">${escapeHtml(file.pathname)}</a></li>`,
          )
          .join("")}</ul>`
      : `<p style="margin:16px 0 4px;color:${BONE_DIM};">Aucun fichier joint.</p>`;

  const bodyHtml = `
    <table role="presentation" width="100%" style="font-size:14px;line-height:1.6;">
      <tr><td style="padding:4px 0;color:${BONE_DIM};width:140px;">Nom / Entreprise</td><td style="padding:4px 0;">${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding:4px 0;color:${BONE_DIM};">Email</td><td style="padding:4px 0;">${escapeHtml(data.email)}</td></tr>
      <tr><td style="padding:4px 0;color:${BONE_DIM};">Téléphone</td><td style="padding:4px 0;">${escapeHtml(data.phone || "—")}</td></tr>
      <tr><td style="padding:4px 0;color:${BONE_DIM};">Type de projet</td><td style="padding:4px 0;">${escapeHtml(projectTypeLabel(data.projectType))}</td></tr>
      <tr><td style="padding:4px 0;color:${BONE_DIM};">Quantité approx.</td><td style="padding:4px 0;">${escapeHtml(data.quantity || "—")}</td></tr>
    </table>
    <p style="margin:16px 0 4px;font-weight:bold;">Message :</p>
    <p style="white-space:pre-wrap;margin:0;">${escapeHtml(data.message)}</p>
    ${filesHtml}
  `;

  return {
    subject: `Nouvelle demande de devis — ${data.name}`,
    html: wrapEmail("Nouvelle demande de devis", bodyHtml),
  };
}

export function buildConfirmationEmail(data: ContactSubmission): { subject: string; html: string } {
  const bodyHtml = `
    <p style="font-size:14px;line-height:1.6;margin:0 0 16px;">
      Bonjour ${escapeHtml(data.name)},<br /><br />
      Nous avons bien reçu votre demande concernant votre projet
      « ${escapeHtml(projectTypeLabel(data.projectType))} ». Notre équipe vous répond sous 24h ouvrées avec un devis.
    </p>
    <p style="margin:16px 0 4px;font-weight:bold;">Votre message :</p>
    <p style="white-space:pre-wrap;margin:0;font-size:14px;color:${BONE_DIM};">${escapeHtml(data.message)}</p>
  `;

  return {
    subject: "Votre demande a bien été reçue — Flocage By Breo",
    html: wrapEmail("Merci pour votre demande", bodyHtml),
  };
}
