import React from 'react'
import { CheckCircle2 } from 'lucide-react'

export const About: React.FC = () => {
  return (
    <section id="metodologia" className="py-32 bg-brand-dark/50 relative">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/5] relative z-10 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Gym"
                className="w-full h-full object-cover grayscale brightness-50"
              />
              {/* Overlay Grid */}
              <div className="absolute inset-0 bg-brand-orange/5 mix-blend-overlay" />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-12 -right-12 bg-brand-orange p-12 hidden md:block z-20">
              <div className="text-6xl font-black italic tracking-tighter text-white mb-2">
                10Y+
              </div>
              <div className="text-xs font-bold uppercase tracking-[0.3em] text-white/80">
                Liderando a <br /> Revolução Fitness
              </div>
            </div>

            {/* Decoration */}
            <div className="absolute top-12 -left-12 w-full h-full border border-brand-orange/20 -z-10" />
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-brand-orange mb-6">
              Nossa Essência
            </h2>
            <h3 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter leading-none mb-12">
              MAIS QUE UM APP, <br />
              UM <span className="text-brand-orange">MANIFESTO</span>
            </h3>

            <p className="text-xl text-brand-muted mb-12 leading-relaxed italic">
              "Acreditamos que a tecnologia deve servir para amplificar o esforço humano, não para
              substitui-lo."
            </p>

            <div className="space-y-6">
              {[
                'Foco total em resultados mensuráveis.',
                'Privacidade absoluta dos seus dados de performance.',
                'Interface brutalista para foco extremo no treino.',
                'Integração nativa com dispositivos de elite.',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="w-6 h-6 rounded-full border border-brand-orange/30 flex items-center justify-center group-hover:bg-brand-orange transition-all duration-300">
                    <CheckCircle2 size={14} className="text-brand-orange group-hover:text-white" />
                  </div>
                  <span className="text-lg font-medium text-white/80 group-hover:text-white transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-16 pt-12 border-t border-white/5 flex items-center gap-8">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-full border-2 border-brand-black bg-brand-gray overflow-hidden"
                  >
                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-bold uppercase tracking-widest text-brand-muted">
                <span className="text-white">12.432</span> Atletas forjados este mês
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
