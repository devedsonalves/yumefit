import React, { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Logo } from '@/shared/components/Logo'

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4 glass-nav' : 'py-8'}`}
    >
      <div className="container-custom flex items-center justify-between">
        <Logo />
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-12">
          {['Programas', 'Metodologia', 'Planos', 'Comunidade'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-bold uppercase tracking-widest text-white/70 hover:text-brand-primary transition-colors"
            >
              {item}
            </a>
          ))}
          <a href="#join" className="btn-premium flex items-center gap-2 text-sm">
            ENTRAR <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-brand-black z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-700 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button
          className="absolute top-8 right-6 text-white"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={32} />
        </button>
        {['Programas', 'Metodologia', 'Planos', 'Comunidade'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-3xl font-black uppercase tracking-tighter"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item}
          </a>
        ))}
        <a
          href="#join"
          className="mt-4 btn-premium text-lg"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          COMEÇAR AGORA
        </a>
      </div>
    </nav>
  )
}
