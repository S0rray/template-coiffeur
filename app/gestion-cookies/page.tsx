import type { Metadata } from 'next'
import { LegalLayout } from '@/components/ui/LegalLayout'

export const metadata: Metadata = {
  title: 'Gestion des Cookies',
  description: 'Politique de gestion des cookies et traceurs — Élégance Salon.',
}

const sections = [
  {
    heading: "Qu'est-ce qu'un cookie ?",
    body: `Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, téléphone, tablette) lors de la visite d'un site web. Il permet de mémoriser vos préférences, d'analyser votre navigation et de personnaliser votre expérience.

Conformément à la directive ePrivacy et aux recommandations de la CNIL, certains cookies nécessitent votre consentement préalable avant d'être déposés.`,
  },
  {
    heading: 'Cookies utilisés sur ce site',
    body: `Cookies strictement nécessaires (sans consentement requis)
Indispensables au fonctionnement du site : gestion de session, sécurité des formulaires, mémorisation de votre choix de consentement.

Cookies de mesure d'audience (consentement requis)
Google Analytics (version anonymisée, sans partage avec Google Ads) pour mesurer la fréquentation et améliorer nos services.

Cookies de préférence
Mémorisent vos choix d'affichage et de langue pour personnaliser votre visite.`,
  },
  {
    heading: 'Durée de conservation',
    body: `• Cookies de session : expirés à la fermeture du navigateur
• Google Analytics (_ga) : 13 mois
• Préférences utilisateur : 6 mois
• Consentement (banner) : 6 mois`,
  },
  {
    heading: 'Gérer vos préférences',
    body: `Vous pouvez modifier ou retirer votre consentement à tout moment via le panneau de gestion accessible en bas de chaque page (« Gérer mes cookies »), ou en paramétrant directement votre navigateur.

Notez que refuser certains cookies peut affecter les fonctionnalités du site.

Pour en savoir plus :
• www.allaboutcookies.org
• www.cnil.fr/cookies`,
  },
]

export default function GestionCookies() {
  return (
    <LegalLayout
      title="Gestion des Cookies"
      label="Cookies et traceurs"
      sections={sections}
    />
  )
}
