/**
 * ─── CRÉDITS PHOTOGRAPHIQUES ───────────────────────────────────────────────
 *
 * Renseignez ici les crédits de chaque photo utilisée sur le site.
 * Ces données sont automatiquement affichées dans les Mentions Légales.
 *
 * ─── OÙ DÉPOSER LES PHOTOS ─────────────────────────────────────────────────
 *
 * Dossier : public/images/
 *
 *   hero.jpg                  → Section Accueil (photo principale à droite)
 *   about.jpg                 → Section À Propos (photo à gauche)
 *   gallery-1.jpg             → Galerie — Coupe femme      (grande gauche)
 *   gallery-2.jpg             → Galerie — Coloration        (milieu haut)
 *   gallery-3.jpg             → Galerie — Balayage          (milieu bas)
 *   gallery-4.jpg             → Galerie — Coiffure mariée  (grande droite)
 *   gallery-5.jpg             → Galerie — Soin kératine    (ligne 2 milieu)
 *   gallery-6.jpg             → Galerie — Coupe homme      (ligne 2 milieu)
 *   team-sophie-martin.jpg    → Équipe — Sophie Martin
 *   team-lucas-bernard.jpg    → Équipe — Lucas Bernard
 *   team-emma-dubois.jpg      → Équipe — Emma Dubois
 *   team-thomas-petit.jpg     → Équipe — Thomas Petit
 *
 * Les formats acceptés : .jpg .jpeg .png .webp .avif
 * (remplacez l'extension dans le nom si nécessaire)
 *
 * ─── COMMENT REMPLIR ────────────────────────────────────────────────────────
 *
 * Pour chaque photo, décommentez le bloc correspondant et renseignez :
 *   label   → description affichée dans les mentions légales
 *   author  → nom du photographe (tel qu'indiqué sur Unsplash/Pexels)
 *   source  → nom de la plateforme
 *   url     → lien direct vers la photo (optionnel mais recommandé)
 *   license → type de licence (ex : "Unsplash License", "Pexels License", "CC0")
 */

export type PhotoCredit = {
  label: string
  author: string
  source: string
  url?: string
  license?: string
}

export const photoCredits: Record<string, PhotoCredit> = {

  'hero.jpg': {
    label: 'Photo principale — Salon Élégance',
    author: 'Sergey Mosin',
    source: 'Unsplash',
    url: 'https://unsplash.com/fr/@msv84msk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    license: 'Unsplash License',
  },

  'about.jpg': {
    label: 'Photo section À Propos',
    author: 'Benyamin Bohlouli',
    source: 'Unsplash',
    url: 'https://unsplash.com/fr/@benyamin_bohlouli?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    license: 'Unsplash License',
  },

  'gallery-1.jpg': {
    label: 'Galerie — Coupe femme',
    author: 'Christian Werther',
    source: 'Unsplash',
    url: 'https://unsplash.com/fr/@rehtrew?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    license: 'Unsplash License',
  },

  'gallery-2.jpg': {
    label: 'Galerie — Coloration',
    author: 'Toa Heftiba',
    source: 'Unsplash',
    url: 'https://unsplash.com/fr/@heftiba?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    license: 'Unsplash License',
  },

  'gallery-3.jpg': {
    label: 'Galerie — Balayage',
    author: 'Let\'s Transform Salon',
    source: 'Unsplash',
    url: 'https://unsplash.com/fr/@letstransformsalonlts?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    license: 'Unsplash License',
  },

  'gallery-4.jpg': {
    label: 'Galerie — Coiffure mariée',
    author: 'Enis Yavuz',
    source: 'Unsplash',
    url: 'https://unsplash.com/fr/@enisyavuz?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    license: 'Unsplash License',
  },

  'gallery-5.jpg': {
    label: 'Galerie — Coiffure femme ondulée',
    author: 'Giorgio Trovato',
    source: 'Unsplash',
    url: 'https://unsplash.com/fr/@giorgiotrovato?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    license: 'Unsplash License',
  },

  'gallery-6.jpg': {
    label: 'Galerie — Coupe homme',
    author: 'André Reis',
    source: 'Unsplash',
    url: 'https://unsplash.com/fr/@andrereispt?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    license: 'Unsplash License',
  },

  'team-sophie-martin.jpg': {
    label: 'Équipe — Sophie Martin',
    author: 'Adam Winger',
    source: 'Unsplash',
    url: 'https://unsplash.com/fr/@awcreativeut?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    license: 'Unsplash License',
  },

  'team-lucas-bernard.jpg': {
    label: 'Équipe — Lucas Bernard',
    author: 'Salah Regouane',
    source: 'Unsplash',
    url: 'https://unsplash.com/fr/@salaheregouane?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    license: 'Unsplash License',
  },

  'team-emma-dubois.jpg': {
    label: 'Équipe — Emma Dubois',
    author: 'Vinicius "amnx" Amano',
    source: 'Unsplash',
    url: 'https://unsplash.com/fr/@viniciusamano?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    license: 'Unsplash License',
  },

  'team-thomas-petit.jpg': {
    label: 'Équipe — Thomas Petit',
    author: 'Jeppe Mønster',
    source: 'Unsplash',
    url: 'https://unsplash.com/fr/@jeppemoenster?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText',
    license: 'Unsplash License',
  },

}
