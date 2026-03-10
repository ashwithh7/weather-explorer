import React from 'react'
import { render, screen } from '@testing-library/react'
import CurrentWeatherCard from '../CurrentWeatherCard'

test('renders weather details correctly', () => {
  const data = {
    name: 'TestCity',
    main: { temp: 10, humidity: 50, feels_like: 8, pressure: 1012 },
    weather: [{ description: 'clear sky', icon: '01d' }],
    wind: { speed: 5 },
  }
  render(<CurrentWeatherCard data={data} />)

  expect(screen.getByText(/TestCity/i)).toBeInTheDocument()
  expect(screen.getByText(/10°C/)).toBeInTheDocument()
  expect(screen.getByText(/clear sky/i)).toBeInTheDocument()
  expect(screen.getByText(/Humidity 50%/)).toBeInTheDocument()
  expect(screen.getByText(/Pressure 1012 hPa/)).toBeInTheDocument()
  // sunrise/sunset time may vary so just check emoji
  expect(screen.getByText(/☀️/)).toBeInTheDocument()
  expect(screen.getByText(/🌙/)).toBeInTheDocument()
})