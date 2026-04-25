import { LandingPage } from '@/features/landing/LandingPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  )
}
