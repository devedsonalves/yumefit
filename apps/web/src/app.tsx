import { healthMessage } from '@repo/core'
import logo from '@repo/assets/brand/logo.png'

export function App() {
  return (
    <main
      style={{
        fontFamily: 'sans-serif',
        padding: 48,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          padding: 32,
          borderRadius: 24,
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
          textAlign: 'center',
          maxWidth: 400,
          width: '100%',
        }}
      >
        <img src={logo} alt="ForgeFit Logo" style={{ width: 120, height: 120, marginBottom: 24 }} />
        <h1 style={{ margin: '0 0 8px 0', color: '#1a1a1a' }}>ForgeFit</h1>
        <p style={{ color: '#666', fontSize: 18, margin: 0 }}>{healthMessage()}</p>
      </div>
    </main>
  )
}
