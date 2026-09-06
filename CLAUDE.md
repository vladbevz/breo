# Flocage By Breo — Site vitrine

> Voir aussi `AGENTS.md` (règles Next.js générées par le framework — API/conventions spécifiques à cette version).

## Contexte client
Flocage By Breo est un prestataire de **flocage textile** (personnalisation de vêtements : t-shirts, sweats, polos, vêtements de travail, textile événementiel/sportif). Expéditions dans **toute la France**. Site vitrine destiné à présenter les services, rassurer sur la qualité/le savoir-faire, et convertir via un formulaire de contact permettant d'envoyer des fichiers (logos, visuels à floquer).

Identité visuelle : logo "F" en dégradé **violet profond → magenta/rose → orange**, fond noir, style glossy/biseauté premium (voir `logo.jpg` à la racine). Ce dégradé signature est le fil conducteur chromatique du site — utilisé en accent, jamais en fond plein uniforme.

## Stack technique
- Next.js (App Router), TypeScript
- Tailwind CSS
- Framer Motion pour les animations
- React Hook Form + Zod pour la validation du formulaire
- Upload de fichiers : Vercel Blob pour recevoir les fichiers joints au formulaire de contact, + envoi d'email de notification (Resend) avec lien vers les fichiers
- Déploiement Vercel

## Exigences design — CRITIQUE
**Zéro pattern "généré par IA".** À éviter absolument :
- Dégradés violets/bleus génériques type "template SaaS"
- Cards avec ombres douces identiques partout, glassmorphism par défaut
- Emoji dans les titres, icônes Lucide génériques mal utilisées
- Grilles 3 colonnes symétriques répétitives (feature 1 / feature 2 / feature 3)
- Typographie Inter/Poppins par défaut sans hiérarchie forte
- Layout "hero centré + bouton CTA + logos clients" copié-collé

À la place :
- Direction typographique forte et inhabituelle : une display font condensée/industrielle (Clash Display via Fontshare) associée à une font texte sobre (General Sans via Fontshare)
- Utiliser le **dégradé signature du logo** (violet→rose→orange) comme accent directeur : soulignements, bordures animées, texte en dégradé sur les titres clés, jamais en fond plein uniforme
- Asymétrie assumée dans les sections (pas tout centré/symétrique)
- Grain/texture subtile évoquant le textile (pas de flat design plastique)
- Micro-interactions réfléchies plutôt que animations décoratives gratuites

## Animations attendues (effet "wow")
- Hero : entrée du logo/titre avec reveal progressif (clip-path ou masque), parallax léger au scroll
- Scroll-triggered reveals sur chaque section (Framer Motion `whileInView`), avec stagger sur les éléments de liste
- Section "process" (Réception → Flocage → Contrôle qualité → Expédition) avec timeline animée qui se dessine au scroll
- Effet de survol premium sur les cartes de services (tilt léger, glow suivant le curseur, ou reveal d'image)
- Transition de page fluide si plusieurs pages (view transitions ou fade+slide)
- Curseur personnalisé optionnel sur desktop
- Easing personnalisé (cubic-bezier), durations cohérentes (250–600ms micro, 600–1000ms sections)

## Structure du site
1. **Accueil** : Hero (logo, accroche, CTA "Demander un devis") → Services de flocage → Réalisations/galerie (grid asymétrique, zoom hover) → Processus de commande (timeline animée) → Zone de livraison (toute la France) → Témoignages → CTA final + formulaire de contact
2. **Nos réalisations** : galerie complète, filtrable par type de textile/secteur (sport, entreprise, événementiel)
3. **Services** : détail par type de flocage/technique, tarifs indicatifs ou "sur devis"
4. **Contact** : formulaire principal

## Formulaire de contact
Champs : Nom/Entreprise, Email, téléphone, Type de projet (select), Quantité approximative, Message, Upload de fichiers.
- Formats acceptés : PNG, JPG, SVG, PDF, AI, EPS — multi-fichiers (drag & drop + bouton) — 15 Mo max/fichier
- Preview des images avant envoi, barre de progression, validation claire des erreurs
- Email de notification au client (lien sécurisé vers fichiers) + email de confirmation à l'expéditeur
- État de succès animé après envoi

## SEO / performance
- Métadonnées optimisées "flocage textile [ville/région]" + "flocage textile livraison France"
- Images optimisées (next/image), lazy loading
- Score Lighthouse cible : 90+ sur toutes les métriques

## Méthode de travail
- Utiliser Plan Mode avant chaque nouvelle section
- Sessions courtes avec /clear entre les grandes étapes pour garder un contexte propre
- Déploiement continu sur Vercel pour previews client
