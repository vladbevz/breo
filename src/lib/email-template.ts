// Les emails passent par des clients de messagerie très variés : dégradés CSS et
// background-clip:text (.text-signature) ne s'y rendent pas de façon fiable, donc
// on utilise ici des couleurs unies plutôt que les classes du site.
export const EMAIL_BRAND_MAGENTA = "#d6318f";
export const EMAIL_INK = "#0a0a0d";
export const EMAIL_BONE_DIM = "#6b6864";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function wrapEmail(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html>
  <body style="margin:0;padding:32px 16px;background:#f2efe9;font-family:Arial,Helvetica,sans-serif;color:${EMAIL_INK};">
    <table role="presentation" width="100%" style="max-width:560px;margin:0 auto;">
      <tr><td>
        <p style="font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:${EMAIL_BONE_DIM};margin:0 0 8px;">Flocage By Breo</p>
        <h1 style="font-size:22px;margin:0 0 20px;color:${EMAIL_INK};">${title}</h1>
        ${bodyHtml}
      </td></tr>
    </table>
  </body>
</html>`;
}
