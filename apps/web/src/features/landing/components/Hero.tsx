import React from 'react'
import { Play, TrendingUp } from 'lucide-react'

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full lg:w-1/2 z-0 hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-l from-brand-black via-brand-black/20 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
          alt="Athlete"
          className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 transition-all duration-1000"
        />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,92,0,0.1)_1px,transparent_1px)] bg-[size:32px_32px] z-0" />
      </div>

      <div className="container-custom relative py-12 z-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 rounded-full mb-8 animate-fade-in">
            <TrendingUp size={14} className="text-brand-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-primary">
              A Nova Era da Performance
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black leading-[0.85] tracking-tighter uppercase italic mb-8">
            <div className="text-reveal">
              <span className="text-reveal-inner">A FORJA DO</span>
            </div>
            <br />
            <div className="text-reveal">
              <span className="text-reveal-inner text-brand-primary">CAMPEÃO</span>
            </div>
          </h1>

          <p className="text-lg md:text-xl text-brand-muted max-w-lg mb-12 leading-relaxed animate-slide-up [animation-delay:400ms] opacity-0">
            Não entregamos apenas treinos. Entregamos o sistema definitivo para reconstruir seu
            corpo e mente através da disciplina implacável.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 animate-slide-up [animation-delay:600ms] opacity-0">
            <a href="#join" className="btn-premium group flex items-center justify-center gap-3">
              COMEÇAR TRANSFORMAÇÃO
              <div className="w-6 h-px bg-white group-hover:w-10 transition-all" />
            </a>
            <button className="flex items-center justify-center gap-4 group">
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-primary transition-colors">
                <Play
                  fill="currentColor"
                  className="ml-1 text-white group-hover:text-brand-primary transition-colors"
                />
              </div>
              <span className="text-sm font-bold uppercase tracking-widest">Ver Metodologia</span>
            </button>
          </div>
        </div>
      </div>

      {/* Vertical Text Decoration */}
      <div className="absolute right-12 bottom-24 hidden xl:block">
        <span
          className="text-sm font-black text-white/5 uppercase tracking-[1em] vertical-text rotate-180"
          style={{ writingMode: 'vertical-rl' }}
        >
          FORGEFIT // SYSTEM_V2.0
        </span>
      </div>
    </section>
  )
}
