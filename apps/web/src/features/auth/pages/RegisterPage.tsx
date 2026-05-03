import React from 'react'
import { AuthLayout, RegisterForm } from '../components'

export const RegisterPage: React.FC = () => {
  return (
    <AuthLayout
      heroTitle={
        <>
          Comece a forjar <br />
          <span className="text-white/90">seu legado hoje.</span>
        </>
      }
      heroSubtitle="Crie sua conta e tenha acesso ao sistema definitivo para gestão de performance."
      isScrollable={true}
    >
      <RegisterForm />
    </AuthLayout>
  )
}
