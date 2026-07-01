export const salon = {
  name: 'Élégance',
  tagline: 'Salon de Coiffure',
  address: '12 Rue des Fleurs, 75001 Paris',
  phone: '+33 1 23 45 67 89',
  email: 'contact@elegance-salon.fr',
  hours: [
    { days: 'Lun – Sam', time: '9h00 – 19h00' },
    { days: 'Dimanche', time: 'Fermé' },
  ],
  social: {
    instagram: 'https://instagram.com/elegance_salon',
    facebook: 'https://facebook.com/elegancesalon',
    tiktok: 'https://tiktok.com/@elegancesalon',
  },
  stats: [
    { value: '15+', label: "ans d'expérience" },
    { value: '500+', label: 'clients / mois' },
    { value: '8', label: 'coiffeurs experts' },
    { value: '98%', label: 'avis positifs' },
  ],
}

export const services = [
  {
    id: 'coupe',
    title: 'Coupe',
    description:
      'Coupe personnalisée adaptée à votre visage et style de vie. Brushing professionnel inclus.',
    price: 'À partir de 15€',
  },
  {
    id: 'coloration',
    title: 'Coloration',
    description:
      'Colorations, mèches et balayages réalisés avec des produits premium respectueux.',
    price: 'À partir de 80€',
  },
  {
    id: 'soins',
    title: 'Soins Capillaires',
    description:
      'Kératine, masques nutritifs et traitements anti-chute sur mesure.',
    price: 'À partir de 60€',
  },
  {
    id: 'mariage',
    title: 'Coiffure Mariée',
    description:
      'Mise en beauté pour mariées et témoins. Rendez-vous personnalisé.',
    price: 'Sur devis',
  },
]

export const team = [
  { name: 'Sophie Martin', role: 'Directrice & Coloriste' },
  { name: 'Lucas Bernard', role: 'Expert en Coupe' },
  { name: 'Emma Dubois', role: 'Spécialiste Mariages' },
  { name: 'Thomas Petit', role: 'Barbier & Styliste' },
]

export const timeSlots: Record<string, string[]> = {
  coupe:      ['09:00', '10:30', '11:00', '14:00', '15:30', '16:00', '17:30'],
  coloration: ['09:00', '11:00', '14:00', '16:00'],
  soins:      ['09:30', '11:00', '14:30', '16:00'],
  mariage:    ['09:00', '10:00', '11:00'],
  default:    ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'],
}

export const navLinks = [
  { label: 'Accueil',   href: '#accueil' },
  { label: 'Services',  href: '#services' },
  { label: 'À Propos',  href: '#propos' },
  { label: 'Galerie',   href: '#galerie' },
  { label: 'Équipe',    href: '#equipe' },
  { label: 'Contact',   href: '#reservation' },
]

export const legalLinks = [
  { label: 'Mentions légales',          href: '/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
  { label: 'CGV',                       href: '/cgv' },
  { label: 'Gestion des cookies',       href: '/gestion-cookies' },
  { label: 'Plan du site',              href: '/plan-du-site' },
]
