import type { Metadata } from 'next'
import { LegalLayout } from '@/components/ui/LegalLayout'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Politique de confidentialité et protection des données personnelles — Élégance Salon.',
}

const sections = [
  {
    heading: '1. Introduction',
    body: `ELEGANCE Salon s'engage à protéger la vie privée de ses clients et des utilisateurs de ce site. La présente politique décrit la manière dont nous collectons, utilisons et protégeons vos données personnelles, conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à la loi Informatique et Libertés.`,
  },
  {
    heading: '2. Données collectées',
    body: `Lors de la prise de rendez-vous ou de votre navigation, nous pouvons collecter :
• Nom et prénom
• Adresse email
• Numéro de téléphone
• Date, heure et service souhaités
• Adresse IP (via cookies d'audience)

Ces données sont collectées avec votre consentement explicite.`,
  },
  {
    heading: '3. Finalités et base légale',
    body: `Vos données sont utilisées pour :
• Gérer vos réservations et envoyer des confirmations (base : exécution du contrat)
• Vous contacter en cas de modification ou d'annulation
• Améliorer nos services via des statistiques anonymisées (base : intérêt légitime)
• Vous envoyer des communications commerciales si vous y avez consenti`,
  },
  {
    heading: '4. Durée de conservation',
    body: `Vos données personnelles sont conservées pendant 3 ans à compter de votre dernier contact ou rendez-vous, conformément aux obligations légales françaises en matière de gestion commerciale.`,
  },
  {
    heading: '5. Vos droits',
    body: `Conformément au RGPD, vous disposez des droits suivants :
• Droit d'accès à vos données
• Droit de rectification
• Droit à l'effacement (« droit à l'oubli »)
• Droit d'opposition au traitement
• Droit à la portabilité de vos données

Pour exercer ces droits : contact@o-code.fr
Vous pouvez également saisir la CNIL : www.cnil.fr`,
  },
]

export default function PolitiqueConfidentialite() {
  return (
    <LegalLayout
      title="Politique de Confidentialité"
      label="Vos données personnelles — RGPD"
      sections={sections}
    />
  )
}
