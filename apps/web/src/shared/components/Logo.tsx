import logo from '@repo/assets/brand/logo.png'
import React from 'react'

export const Logo: React.FC = () => {
  return (
    <a href="/" className="flex items-center gap-3 group">
      <div className="relative">
        <img
          src={logo}
          alt="ForgeFit"
          className="w-48 h-16 object-contain transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-brand-orange/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </a>
  )
}
