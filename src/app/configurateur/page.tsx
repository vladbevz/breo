import type { Metadata } from "next";
import { ConfiguratorExperience } from "@/components/configurator/ConfiguratorExperience";

export const metadata: Metadata = {
  title: "Configurateur 3D",
  description:
    "Personnalisez la couleur et le logo de votre t-shirt en 3D, en direct, avant de demander votre devis.",
};

export default function ConfiguratorPage() {
  return <ConfiguratorExperience />;
}
