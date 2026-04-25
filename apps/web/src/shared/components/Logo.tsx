import logo from '@repo/assets/brand/logo.png'
import React from 'react'
import { Link } from 'react-router-dom'

export const Logo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="relative">
        <img
          src={logo}
          alt="ForgeFit"
          className="w-64 h-24 object-contain transition-transform group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-brand-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </Link>
  )
}
