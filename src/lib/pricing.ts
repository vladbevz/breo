export type PricingTier = {
  min: number;
  max: number;
  pricePerUnit: number | null;
};

// Tarifs a confirmer avec Breo avant mise en ligne -- pricePerUnit reste `null` en
// attendant, ce qui fait afficher "sur devis" partout au lieu d'un chiffre invente.
export const PRICING_TIERS: PricingTier[] = [
  { min: 10, max: 24, pricePerUnit: null },
  { min: 25, max: 49, pricePerUnit: null },
  { min: 50, max: 99, pricePerUnit: null },
  { min: 100, max: 249, pricePerUnit: null },
  { min: 250, max: Infinity, pricePerUnit: null },
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
