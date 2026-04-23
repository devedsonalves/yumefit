import React from 'react'

export const Stats: React.FC = () => {
  const stats = [
    { label: 'Atletas Ativos', value: '15k+' },
    { label: 'Recordes Batidos', value: '85k' },
    { label: 'Especialistas', value: '120' },
    { label: 'Satisfação', value: '99%' },
  ]

  return (
    <section className="py-24 border-y border-white/5 bg-brand-dark/30 relative overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="group">
              <div className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-2 group-hover:text-brand-orange transition-colors duration-500">
                {stat.value}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-muted group-hover:text-white transition-colors duration-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-y-1/2" />
    </section>
  )
}
