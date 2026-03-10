import React from 'react'
import WeatherPage from './components/WeatherPage'

export default function App() {
  return (
    <div className="min-vh-100">
      <header className="glass text-white text-center mx-auto" style={{ maxWidth: '800px' }}>
        <h1 className="mb-0 display-1" style={{ fontWeight: 700, textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
          Weather Explorer
        </h1>
        <p className="lead" style={{ fontSize: '1.25rem', fontWeight: 300, opacity: 0.9 }}>
          Real‑time forecasts with a sleek interface
        </p>
        <small className="text-light">Powered by OpenWeatherMap</small>
      </header>
      <WeatherPage />
    </div>
  )
}
