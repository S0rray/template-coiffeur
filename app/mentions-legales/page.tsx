import type { Metadata } from 'next'
import { LegalLayout } from '@/components/ui/LegalLayout'

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description: 'Mentions légales du salon de coiffure Élégance.',
}

const sections = [
  {
    heading: '1. Éditeur du site',
    body: `ELEGANCE Salon — SARL au capital de 10 000 €
12 Rue des Fleurs, 75001 Paris, France
SIREN : 123 456 789  •  APE : 9602A
Directrice de publication : Sophie Martin
Tél. : +33 1 23 45 67 89  •  contact@elegance-salon.fr`,
  },
  {
    heading: '2. Hébergement',
    body: `Ce site est hébergé par Vercel Inc.
340 Pine Street, Suite 900, San Francisco, CA 94104, USA
Site : www.vercel.com  •  Contact : privacy@vercel.com`,
  },
  {
    heading: '3. Propriété intellectuelle',
    body: `L'ensemble des éléments constituant ce site (textes, images, graphismes, logos, photographies) sont la propriété exclusive d'ELEGANCE Salon ou font l'objet d'une autorisation d'utilisation accordée par leurs propriétaires respectifs.

Toute reproduction, représentation, modification ou diffusion, en tout ou partie, est strictement interdite sans autorisation écrite préalable de l'éditeur, sous peine de poursuites judiciaires.`,
  },
  {
    heading: '4. Responsabilité',
    body: `ELEGANCE Salon s'efforce de fournir des informations aussi précises et actualisées que possible. Cependant, nous ne pouvons garantir l'exactitude, la complétude ni l'actualité des informations diffusées.

La responsabilité d'ELEGANCE Salon ne saurait être engagée en cas d'interruption ou d'indisponibilité du site, de survenance de bugs ou d'inexactitudes dans les informations présentées.`,
  },
  {
    heading: '5. Contact',
    body: `Pour toute question relative au contenu de ce site :
Email : contact@elegance-salon.fr
Courrier : ELEGANCE Salon — 12 Rue des Fleurs, 75001 Paris
Horaires : Lun – Sam, 9h00 – 19h00`,
  },
]

export default function MentionsLegales() {
  return (
    <LegalLayout
      title="Mentions Légales"
      label="Informations légales"
      sections={sections}
    />
  )
}
