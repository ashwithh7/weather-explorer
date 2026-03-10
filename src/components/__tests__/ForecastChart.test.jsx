import React from 'react'
import { render } from '@testing-library/react'
import ForecastChart from '../ForecastChart'

test('renders chart canvas', () => {
  const daily = [
    { dt: 1670000000, main: { temp: 10 } },
    { dt: 1670086400, main: { temp: 12 } },
  ]
  const { container } = render(<ForecastChart daily={daily} />)
  expect(container.querySelector('canvas')).toBeInTheDocument()
})