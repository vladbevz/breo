export type PricingTier = {
  min: number;
  max: number;
  pricePerUnit: number | null;
};

// Prix du T-shirt (15 €) : donnée réelle du client, voir src/components/services/services-content.ts.
// Les paliers restent à plat sur ce même prix pour l'instant -- aucun barème dégressif
// chiffré n'a été communiqué (seule la mention "tarifs dégressifs possibles" existe dans
// la grille tarifaire), donc on n'invente pas de remise par palier ; le disclaimer
// ci-dessous renvoie ces cas vers le devis, où Breo peut négocier un vrai prix dégressif.
const TSHIRT_UNIT_PRICE = 15;

export const PRICING_TIERS: PricingTier[] = [
  { min: 1, max: 9, pricePerUnit: TSHIRT_UNIT_PRICE },
  { min: 10, max: 24, pricePerUnit: TSHIRT_UNIT_PRICE },
  { min: 25, max: 49, pricePerUnit: TSHIRT_UNIT_PRICE },
  { min: 50, max: 99, pricePerUnit: TSHIRT_UNIT_PRICE },
  { min: 100, max: 249, pricePerUnit: TSHIRT_UNIT_PRICE },
  { min: 250, max: Infinity, pricePerUnit: TSHIRT_UNIT_PRICE },
];

export const PRICE_DISCLAIMER =
  "Estimation indicative — le tarif final dépend du textile, de la technique et du visuel. Pour les grandes quantités, un tarif dégressif s'applique.";

export type PriceEstimate = {
  tier: PricingTier;
  pricePerUnit: number | null;
  total: number | null;
};

export function getPriceEstimate(quantity: number): PriceEstimate | null {
  const tier = PRICING_TIERS.find((candidate) => quantity >= candidate.min && quantity <= candidate.max);
  if (!tier) return null;

  return {
    tier,
    pricePerUnit: tier.pricePerUnit,
    total: tier.pricePerUnit !== null ? tier.pricePerUnit * quantity : null,
  };
}
