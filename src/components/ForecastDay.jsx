import React from 'react'
import dayjs from 'dayjs'

function ForecastDay({ data }) {
  // data is one entry of the 3‑hour forecast list
  const time = dayjs(data.dt * 1000)
  const temp = Math.round(data.main.temp)
  const icon = data.weather[0].icon
  const description = data.weather[0].description
  const humidity = data.main.humidity
  const wind = data.wind ? Math.round(data.wind.speed * 3.6) : null
  return (
    <div className="forecast-card p-3 mx-1 text-center border rounded glass" style={{ minWidth: 150 }}>
      <div className="text-muted" style={{ fontSize: '0.85rem', fontWeight: 300 }}>{time.format('DD MMM HH:mm')}</div>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        width={70}
        className="my-1"
      />
      <div style={{ fontSize: '1.4rem', fontWeight: 600 }}>{temp}°C</div>
      <div className="text-capitalize" style={{ fontSize: '0.95rem', marginTop: '0.2rem' }}>{description}</div>
      <div className="text-muted mt-1" style={{ fontSize: '0.85rem' }}>
        {humidity}% humidity{wind !== null && ` · ${wind} km/h`}
      </div>
    </div>
  )
}

export default ForecastDay
