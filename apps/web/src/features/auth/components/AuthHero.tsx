import React from 'react'
import { Users, Activity, TrendingUp } from 'lucide-react'
import logo from '@repo/assets/brand/logo.png'

interface AuthHeroProps {
  title: React.ReactNode
  subtitle: string
}

export const AuthHero: React.FC<AuthHeroProps> = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
      {/* Background Image/Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-transparent z-10" />
        <div className="absolute inset-0 bg-brand-black/40 z-10 mix-blend-multiply" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] primary-glow opacity-30 z-10" />
        {/* Placeholder for gym background, using a subtle gradient for now */}
        <div className="w-full h-full bg-brand-dark/50 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col h-full justify-between">
        <div>
          <img src={logo} alt="ForgeFit" className="h-16 object-contain mb-16" />
          <h1 className="text-5xl font-bold leading-tight mb-6">
            {title}
          </h1>
          <p className="text-lg text-brand-muted max-w-md leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-brand-gray/30 backdrop-blur-sm border border-white/5 rounded-2xl p-6 transition-all hover:bg-brand-gray/50 hover:border-white/10">
            <div className="bg-brand-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-brand-primary w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm mb-2">Gestão completa<br/>de alunos</h3>
            <p className="text-xs text-brand-muted leading-relaxed">Informações, histórico e acompanhamento 360º.</p>
          </div>
          <div className="bg-brand-gray/30 backdrop-blur-sm border border-white/5 rounded-2xl p-6 transition-all hover:bg-brand-gray/50 hover:border-white/10">
            <div className="bg-brand-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
              <Activity className="text-brand-primary w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm mb-2">Protocolos<br/>inteligentes</h3>
            <p className="text-xs text-brand-muted leading-relaxed">Crie treinos personalizados e organizados.</p>
          </div>
          <div className="bg-brand-gray/30 backdrop-blur-sm border border-white/5 rounded-2xl p-6 transition-all hover:bg-brand-gray/50 hover:border-white/10">
            <div className="bg-brand-primary/10 w-10 h-10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="text-brand-primary w-5 h-5" />
            </div>
            <h3 className="font-semibold text-sm mb-2">Evolução<br/>em tempo real</h3>
            <p className="text-xs text-brand-muted leading-relaxed">Visualize métricas e resultados de forma clara.</p>
          </div>
        </div>
        
        <div className="mt-8 text-sm text-brand-muted">
          ForgeFit © 2024. Todos os direitos reservados.
        </div>
      </div>
    </div>
  )
}
