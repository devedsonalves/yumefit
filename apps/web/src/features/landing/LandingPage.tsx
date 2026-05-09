import React from 'react'
import { Header, Hero, Stats, Features, About, CTA, Footer } from './components'

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-brand-black selection:bg-brand-primary selection:text-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 noise-bg" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] primary-glow opacity-30" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] primary-glow opacity-20" />
      </div>

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Stats />
          <Features />
          <About />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  )
}
