import React from 'react'
import { ArrowRight, Flame } from 'lucide-react'

export const CTA: React.FC = () => {
  return (
    <section id="join" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-orange opacity-[0.02]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-4 bg-brand-orange/10 rounded-full mb-12">
            <Flame className="text-brand-orange animate-pulse" size={48} />
          </div>

          <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] mb-12">
            VOCÊ ESTÁ <br />
            PRONTO PARA A <br />
            <span className="text-brand-orange underline decoration-brand-orange/30 underline-offset-8">
              VERDADE?
            </span>
          </h2>

          <p className="text-2xl text-brand-muted mb-16 max-w-2xl mx-auto leading-relaxed">
            Pare de colecionar apps inúteis. Entre para a plataforma onde campeões são forjados
            todos os dias.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <a
              href="#"
              className="btn-premium w-full md:w-auto text-xl flex items-center justify-center gap-4 group"
            >
              QUERO SER ELITE
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none">
        <span className="text-[200px] font-black italic uppercase tracking-tighter text-white/[0.02]">
          LIMITLESS LIMITLESS LIMITLESS
        </span>
      </div>
    </section>
  )
}
