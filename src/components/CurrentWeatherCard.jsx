import React from 'react'

function CurrentWeatherCard({ data }) {
  if (!data) return null
  const {
    name,
    main: { temp, humidity, feels_like, pressure },
    weather,
    wind: { speed },
    sys: { sunrise, sunset },
  } = data
  const { description, icon } = weather[0]

  const formatTime = (ts) => new Date(ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="current-weather card mx-auto my-3 p-4 shadow-sm glass" style={{ maxWidth: 400 }}>
      <div className="d-flex align-items-center justify-content-center">
        <img
          src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
          alt={description}
          className="me-3"
          style={{ width: '120px', height: '120px' }}
        />
        <div>
          <h3 className="mb-0" style={{ fontSize: '1.75rem', fontWeight: 600 }}>{name}</h3>
          <p className="h1 mb-0" style={{ fontSize: '3rem', fontWeight: 700 }}>{Math.round(temp)}°C</p>
          <p className="text-capitalize small mt-1" style={{ fontSize: '1.1rem' }}>{description}</p>
        </div>
      </div>
      <hr />
      <div className="d-flex justify-content-between text-muted" style={{ fontSize: '0.95rem' }}>
        <div>Feels like {Math.round(feels_like)}°C</div>
        <div>Humidity {humidity}%</div>
        <div>Wind {Math.round(speed * 3.6)} km/h</div>
      </div>
      <div className="text-muted mt-1" style={{ fontSize: '0.9rem' }}>Pressure {pressure} hPa</div>
      <div className="d-flex justify-content-between text-muted mt-2" style={{ fontSize: '0.9rem' }}>
        <div>☀️ {formatTime(sunrise)}</div>
        <div>🌙 {formatTime(sunset)}</div>
      </div>
    </div>
  )
}

export default CurrentWeatherCard
