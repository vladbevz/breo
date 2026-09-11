import { TikTokIcon } from "./TikTokIcon";

// Effet "chromatic glitch" caractéristique de l'identité TikTok : trois calques du
// même tracé décalés en cyan/magenta/blanc. Regroupé ici pour que Hero et Footer
// partagent exactement le même rendu au lieu de dupliquer les trois <TikTokIcon>.
export function TikTokGlitchIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className={`relative inline-flex shrink-0 ${className}`} aria-hidden="true">
      <TikTokIcon className="absolute inset-0 h-full w-full translate-x-[-1.5px] -translate-y-px text-[#25f4ee]" />
      <TikTokIcon className="absolute inset-0 h-full w-full translate-x-[1.5px] translate-y-px text-[#fe2c55]" />
      <TikTokIcon className="relative h-full w-full text-current" />
    </span>
  );
}
