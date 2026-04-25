import React from 'react'
import { Zap, Shield, Target, Users, Dumbbell, Trophy } from 'lucide-react'

export const Features: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Alta Performance',
      description: 'Programas de elite desenhados para quebrar seus limites genéticos.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Gestão de Evolução',
      description: 'Acompanhamento biométrico e de cargas em tempo real com IA.',
    },
    {
      icon: <Dumbbell className="w-8 h-8" />,
      title: 'Workouts Personalizados',
      description: 'Nada de receitas prontas. Cada repetição conta para o SEU objetivo.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Fisiologia Aplicada',
      description: 'Metodologias baseadas em ciência para máxima hipertrofia e segurança.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Comunidade Blindada',
      description: 'Conecte-se com outros membros que compartilham a mesma obsessão.',
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Ranking de Elite',
      description: 'Desafie-se nos rankings globais e conquiste seu lugar no topo.',
    },
  ]

  return (
    <section id="programas" className="py-32 relative">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-24">
          <div className="max-w-2xl">
            <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-brand-primary mb-6">
              Nossas Armas
            </h2>
            <h3 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
              EQUIPADO PARA A <br />
              <span className="text-brand-primary">EXCELÊNCIA</span>
            </h3>
          </div>
          <p className="text-brand-muted max-w-sm text-lg leading-relaxed">
            Unimos o "old school" da musculação pesada com a tecnologia de ponta para análise de
            dados.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group p-12 bg-brand-black hover:bg-brand-dark transition-all duration-500 relative overflow-hidden"
            >
              {/* Hover Effect */}
              <div className="absolute top-0 left-0 w-1 h-0 bg-brand-primary group-hover:h-full transition-all duration-500" />

              <div className="text-brand-primary mb-8 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                {feature.icon}
              </div>
              <h4 className="text-2xl font-black uppercase italic mb-4 tracking-tight group-hover:text-brand-primary transition-colors">
                {feature.title}
              </h4>
              <p className="text-brand-muted leading-relaxed group-hover:text-white/80 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
