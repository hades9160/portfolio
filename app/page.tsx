import Hero from '@/components/hero'
import Navigation from '@/components/navigation'
import About from '@/components/about'
import Skills from '@/components/skills'
import Portfolio from '@/components/portfolio'
import Contact from '@/components/contact'

export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-background">
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Contact />
    </main>
  )
}
