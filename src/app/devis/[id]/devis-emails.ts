import type { Design } from "@/lib/designs";
import { escapeHtml, wrapEmail, EMAIL_BONE_DIM as BONE_DIM } from "@/lib/email-template";
import type { DevisFormValues } from "./devis-schema";

export function buildDevisNotificationEmail(design: Design, data: DevisFormValues): { subject: string; html: string } {
  const previewHtml = design.preview_url
    ? `<img src="${design.preview_url}" alt="Aperçu du modèle" style="max-width:280px;border-radius:12px;margin:0 0 16px;display:block;" />`
    : "";

  const bodyHtml = `
    ${previewHtml}
    <table role="presentation" width="100%" style="font-size:14px;line-height:1.6;">
      <tr><td style="padding:4px 0;color:${BONE_DIM};width:140px;">Référence</td><td style="padding:4px 0;">${escapeHtml(design.id)}</td></tr>
      <tr><td style="padding:4px 0;color:${BONE_DIM};">Nom</td><td style="padding:4px 0;">${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding:4px 0;color:${BONE_DIM};">Entreprise</td><td style="padding:4px 0;">${escapeHtml(data.company || "—")}</td></tr>
      <tr><td style="padding:4px 0;color:${BONE_DIM};">Email</td><td style="padding:4px 0;">${escapeHtml(data.email)}</td></tr>
      <tr><td style="padding:4px 0;color:${BONE_DIM};">Téléphone</td><td style="padding:4px 0;">${escapeHtml(data.phone || "—")}</td></tr>
      <tr><td style="padding:4px 0;color:${BONE_DIM};">Couleur</td><td style="padding:4px 0;">${escapeHtml(design.tshirt_color)}</td></tr>
      <tr><td style="padding:4px 0;color:${BONE_DIM};">Quantité</td><td style="padding:4px 0;">${design.quantity ?? "—"}</td></tr>
    </table>
    <p style="margin:16px 0 4px;font-weight:bold;">Message :</p>
    <p style="white-space:pre-wrap;margin:0;">${escapeHtml(data.message || "—")}</p>
  `;

  return {
    subject: `Nouvelle demande de devis (config. 3D) — ${data.name}`,
    html: wrapEmail("Nouvelle demande de devis", bodyHtml),
  };
}

export function buildDevisConfirmationEmail(data: DevisFormValues): { subject: string; html: string } {
  const bodyHtml = `
    <p style="font-size:14px;line-height:1.6;margin:0 0 16px;">
      Bonjour ${escapeHtml(data.name)},<br /><br />
      Nous avons bien reçu votre demande de devis pour le modèle que vous avez personnalisé.
      Notre équipe vous répond sous 24h ouvrées.
    </p>
  `;

  return {
    subject: "Votre demande de devis a bien été reçue — Flocage By Breo",
    html: wrapEmail("Merci pour votre demande", bodyHtml),
  };
}
