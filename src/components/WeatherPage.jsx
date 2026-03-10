import React, { useEffect } from 'react'
import SearchBar from './SearchBar'
import CurrentWeatherCard from './CurrentWeatherCard'
import ForecastDay from './ForecastDay'
import ForecastChart from './ForecastChart'
import useWeather from '../hooks/useWeather'
import Spinner from './Spinner'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// pick one forecast per day (prefer mid‑day entry)
function summarizeByDay(list) {
  const byDate = {}
  list.forEach((item) => {
    const date = item.dt_txt.slice(0, 10)
    if (!byDate[date] || item.dt_txt.includes('12:00')) {
      byDate[date] = item
    }
  })
  return Object.values(byDate)
}

function WeatherPage() {
  const { city, setCity, coords, setCoords, current, forecast, loading, error } = useWeather()

  // show toast when an error appears
  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  const handleSearch = (newCity) => {
    setCity(newCity)
    // coords will be cleared by hook
  }

  const daily = summarizeByDay(forecast)

  // when the component first mounts, try geolocation if browser supports it and
  // no explicit city has been set yet
  useEffect(() => {
    if (!city && !coords && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          setCoords({ lat: latitude, lon: longitude })
        },
        (err) => {
          console.warn('geolocation failed', err)
        }
      )
    }
  }, [city, coords, setCoords])

  return (
    <div className="container py-4 glass" style={{ maxWidth: '900px' }}>
      <SearchBar onSearch={handleSearch} />
      {loading && <Spinner />}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* top row: current weather + chart if available */}
      {(current || daily.length > 0) && (
        <div className="row">
          {current && (
            <div className="col-md-4">
              <CurrentWeatherCard data={current} />
            </div>
          )}
          {daily.length > 0 && (
            <div className="col-md-8">
              <ForecastChart daily={daily} />
            </div>
          )}
        </div>
      )}

      {/* forecast cards below */}
      {daily.length > 0 && (
        <div className="d-flex flex-row overflow-auto mt-4">
          {daily.map((f, idx) => (
            <ForecastDay key={idx} data={f} />
          ))}
        </div>
      )}
      <ToastContainer position="top-center" />
    </div>
  )
}

export default WeatherPage;
