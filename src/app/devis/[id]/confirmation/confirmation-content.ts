// Copie provisoire — numéro WhatsApp pro de Breo pas encore fourni. Tant que c'est
// `null`, le bouton s'affiche désactivé ("Bientôt") plutôt que de pointer vers un
// lien wa.me fabriqué.
export const WHATSAPP_NUMBER: string | null = null;

export function buildWhatsAppLink(designId: string): string | null {
  if (!WHATSAPP_NUMBER) return null;
  const message = `Bonjour, je viens de faire une demande de devis (réf. ${designId})`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
