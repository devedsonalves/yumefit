import React from 'react'
import { Globe, Mail, MessageSquare, Share2, ArrowRight } from 'lucide-react'
import { Logo } from '@/shared/components/Logo'

export const Footer: React.FC = () => {
  return (
    <footer className="py-24 border-t border-white/5 relative z-10">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2 lg:col-span-1">
            <Logo />
            <p className="text-brand-muted max-w-[240px] leading-relaxed pt-2 mb-8">
              A ferramenta definitiva para quem busca performance extrema e disciplina implacável.
            </p>
            <div className="flex gap-6">
              {[Globe, Mail, MessageSquare, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-brand-muted hover:text-brand-orange transition-colors"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-white mb-8">
              Navegação
            </h4>
            <ul className="space-y-4">
              {['Programas', 'Metodologia', 'Planos', 'Blog'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-brand-muted hover:text-white transition-colors uppercase text-xs font-bold tracking-widest"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-white mb-8">
              Suporte
            </h4>
            <ul className="space-y-4">
              {['Ajuda', 'Contato', 'Privacidade', 'Termos'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-brand-muted hover:text-white transition-colors uppercase text-xs font-bold tracking-widest"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.3em] text-white mb-8">
              Newsletter
            </h4>
            <p className="text-xs font-bold tracking-widest text-brand-muted uppercase mb-6 leading-relaxed">
              Receba dicas de elite e atualizações da forja.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="SEU EMAIL"
                className="bg-brand-gray/50 border border-white/10 px-4 py-3 text-xs font-bold tracking-widest focus:outline-none focus:border-brand-orange w-full"
              />
              <button className="bg-brand-orange px-4 py-3 hover:bg-brand-orange-bright transition-colors">
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5">
          <p className="text-[10px] font-bold tracking-[0.3em] text-brand-muted uppercase">
            © 2026 FORGEFIT | TODOS OS DIREITOS RESERVADOS
          </p>
          <div className="flex gap-12">
            <a
              href="#"
              className="text-[10px] font-bold tracking-[0.3em] text-brand-muted hover:text-white transition-colors uppercase"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[10px] font-bold tracking-[0.3em] text-brand-muted hover:text-white transition-colors uppercase"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
