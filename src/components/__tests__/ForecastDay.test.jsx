import React from 'react'
import { render, screen } from '@testing-library/react'
import ForecastDay from '../ForecastDay'

test('shows timestamp, temperature and description', () => {
  const data = {
    dt: 1670000000,
    main: { temp: 20 },
    weather: [{ description: 'light rain', icon: '10d' }],
  }
  render(<ForecastDay data={data} />)
  expect(screen.getByText(/20°C/)).toBeInTheDocument()
  expect(screen.getByText(/light rain/i)).toBeInTheDocument()
  expect(screen.getByText(/humidity/i)).toBeInTheDocument()
})