import type { Metadata } from 'next'
import { LegalLayout } from '@/components/ui/LegalLayout'

export const metadata: Metadata = {
  title: 'CGV',
  description: "Conditions Générales de Vente du salon de coiffure Élégance.",
}

const sections = [
  {
    heading: '1. Préambule',
    body: `Les présentes Conditions Générales de Vente s'appliquent à toutes les prestations proposées par ELEGANCE Salon (SARL, SIREN : 123 456 789), établi au 12 Rue des Fleurs, 75001 Paris. Elles constituent le cadre contractuel entre le salon et ses clients.`,
  },
  {
    heading: '2. Tarifs',
    body: `Les tarifs affichés sont exprimés en euros TTC. ELEGANCE Salon se réserve le droit de les modifier à tout moment. Les tarifs applicables sont ceux en vigueur au jour de la prestation.

Un devis personnalisé peut être établi sur demande pour les prestations spéciales (mariage, événement).`,
  },
  {
    heading: '3. Réservation et paiement',
    body: `La prise de rendez-vous, en ligne ou par téléphone, vaut réservation ferme. Aucun acompte n'est exigé pour les prestations classiques.

Le paiement s'effectue en fin de prestation par carte bancaire (Visa, Mastercard, CB) ou en espèces.

Pour les prestations mariage ou événement, un acompte de 30 % est demandé à la réservation.`,
  },
  {
    heading: '4. Annulation et no-show',
    body: `Toute annulation doit être effectuée au minimum 24 heures avant le rendez-vous, par téléphone ou par email.

En deçà de ce délai, ou en cas de non-présentation sans annulation préalable, ELEGANCE Salon se réserve le droit de facturer 50 % du montant de la prestation réservée.`,
  },
  {
    heading: '5. Responsabilité et allergies',
    body: `ELEGANCE Salon s'engage à réaliser ses prestations avec soin et professionnalisme. Il incombe au client d'informer le coiffeur de toute allergie ou sensibilité connue avant chaque prestation.

Des tests d'allergie peuvent être réalisés sur demande 48 h avant. La responsabilité du salon ne pourra être engagée en cas de réaction allergique non signalée.`,
  },
]

export default function Cgv() {
  return (
    <LegalLayout
      title="Conditions Générales de Vente"
      label="CGV — ELEGANCE Salon"
      sections={sections}
    />
  )
}
