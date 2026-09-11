export type GarmentTypeId = "standard" | "premium";

export type GarmentType = {
  id: GarmentTypeId;
  label: string;
  pricePerUnit: number;
};

// Données réelles du client (grille tarifaire) : le T-shirt existe en deux qualités,
// chacune à un prix fixe -- voir src/components/services/services-content.ts pour la
// grille complète. Pas de barème dégressif chiffré communiqué pour l'instant (seule la
// mention "tarifs dégressifs possibles" existe) ; PRICE_DISCLAIMER renvoie ces cas vers
// le devis plutôt que d'inventer une remise par palier.
export const GARMENT_TYPES: GarmentType[] = [
  { id: "standard", label: "T-shirt", pricePerUnit: 15 },
  { id: "premium", label: "T-shirt Premium", pricePerUnit: 20 },
];

export const DEFAULT_GARMENT_TYPE: GarmentTypeId = "standard";

export function getGarmentType(id: GarmentTypeId): GarmentType {
  return GARMENT_TYPES.find((candidate) => candidate.id === id) ?? GARMENT_TYPES[0];
}

export const PRICE_DISCLAIMER =
  "Estimation indicative — le tarif final dépend du textile, de la technique et du visuel. Pour les grandes quantités, un tarif dégressif s'applique.";

export type PriceEstimate = {
  garmentType: GarmentType;
  pricePerUnit: number;
  total: number;
};

export function getPriceEstimate(quantity: number, garmentTypeId: GarmentTypeId): PriceEstimate {
  const garmentType = getGarmentType(garmentTypeId);
  return {
    garmentType,
    pricePerUnit: garmentType.pricePerUnit,
    total: garmentType.pricePerUnit * quantity,
  };
}
