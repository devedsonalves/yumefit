import React from 'react'
import { AuthLayout, LoginForm } from '../components'

export const LoginPage: React.FC = () => {
  return (
    <AuthLayout
      heroTitle={
        <>
          Transforme dados <br />
          <span className="text-white/90">em resultados reais.</span>
        </>
      }
      heroSubtitle="Gerencie protocolos, acompanhe a evolução e potencialize os resultados dos seus alunos."
    >
      <LoginForm />
    </AuthLayout>
  )
}
