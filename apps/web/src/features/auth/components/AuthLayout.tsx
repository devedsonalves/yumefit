import React from 'react'
import { Moon } from 'lucide-react'
import { AuthHero } from './AuthHero'

interface AuthLayoutProps {
  heroTitle: React.ReactNode
  heroSubtitle: string
  children: React.ReactNode
  isScrollable?: boolean
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  heroTitle,
  heroSubtitle,
  children,
  isScrollable = false
}) => {
  return (
    <div className="min-h-screen bg-brand-black flex text-white font-sans selection:bg-brand-primary selection:text-white">
      {/* Left Column - Branding (Hidden on mobile, visible on desktop) */}
      <AuthHero title={heroTitle} subtitle={heroSubtitle} />

      {/* Right Column - Form Container */}
      <div className={`w-full lg:w-1/2 flex flex-col relative bg-brand-black ${isScrollable ? 'overflow-y-auto' : ''}`}>
        {/* Top bar */}
        <div className="absolute top-0 right-0 p-6 flex justify-end w-full z-10">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-sm text-brand-muted hover:text-white">
            <Moon className="w-4 h-4" />
            Tema escuro
          </button>
        </div>

        {children}

        {/* Bottom help text */}
        <div className={`absolute bottom-0 right-0 p-6 w-full flex justify-center lg:justify-end ${isScrollable ? 'pointer-events-none' : ''}`}>
          <div className={`flex items-center gap-2 text-sm text-brand-muted ${isScrollable ? 'pointer-events-auto' : ''}`}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Precisa de ajuda? <a href="#" className="text-brand-primary hover:text-brand-primary-bright transition-colors">Fale conosco</a>
          </div>
        </div>
      </div>
    </div>
  )
}
