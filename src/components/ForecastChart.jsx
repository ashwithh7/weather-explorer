import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function ForecastChart({ daily }) {
  // daily is array of forecast items (one per day)
  const labels = daily.map((item) => {
    const date = new Date(item.dt * 1000)
    return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })
  })
  const temps = daily.map((item) => Math.round(item.main.temp))

  const data = {
    labels,
    datasets: [
      {
        label: 'Temp (°C)',
        data: temps,
        borderColor: '#fff',
        backgroundColor: 'rgba(255,255,255,0.25)',
        pointBackgroundColor: '#fff',
        tension: 0.4,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: '5‑day Temperature Trend',
        font: { family: 'Poppins', size: 18, weight: '600' },
        color: '#fff',
      },
    },
    scales: {
      x: {
        ticks: { font: { family: 'Poppins', size: 12 }, color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.2)' },
      },
      y: {
        beginAtZero: false,
        ticks: { font: { family: 'Poppins', size: 12 }, color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.2)' },
      },
    },
  }

  return <Line data={data} options={options} />
}

export default ForecastChart