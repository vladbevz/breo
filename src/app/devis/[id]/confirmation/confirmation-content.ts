// Copie provisoire — numéro WhatsApp à remplacer par le vrai numéro pro de Breo avant mise en ligne.
export const WHATSAPP_NUMBER_PLACEHOLDER = "[NUMERO_WHATSAPP]";

export function buildWhatsAppLink(designId: string): string {
  const message = `Bonjour, je viens de faire une demande de devis (réf. ${designId})`;
  return `https://wa.me/${WHATSAPP_NUMBER_PLACEHOLDER}?text=${encodeURIComponent(message)}`;
}
