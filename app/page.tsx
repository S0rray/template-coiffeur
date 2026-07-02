import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { About } from '@/components/sections/About'
import { Gallery } from '@/components/sections/Gallery'
import { Team } from '@/components/sections/Team'
import { Booking } from '@/components/sections/Booking'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Team />
      <Booking />
    </>
  )
}
