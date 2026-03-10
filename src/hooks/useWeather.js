import { useState, useEffect, useCallback } from 'react';

const API_BASE = 'https://api.openweathermap.org/data/2.5';
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function useWeather(initialCity = '') {
  const [city, setCity] = useState(initialCity);
  const [coords, setCoords] = useState(null); // { lat, lon }
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const buildUrl = (path) => {
    if (coords) {
      return `${API_BASE}/${path}?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
    }
    return `${API_BASE}/${path}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
  }

  const fetchWeather = useCallback(async (signal) => {
    // nothing to fetch until we have either a city or coords
    if (!city && !coords) return;
    setLoading(true);
    setError(null);
    try {
      const [currRes, foreRes] = await Promise.all([
        fetch(buildUrl('weather'), { signal }),
        fetch(buildUrl('forecast'), { signal }),
      ]);

      const currData = await currRes.json();
      if (!currRes.ok) {
        throw new Error(currData.message || 'Failed to retrieve current weather');
      }

      const foreData = await foreRes.json();
      if (!foreRes.ok) {
        throw new Error(foreData.message || 'Failed to retrieve forecast');
      }

      setCurrent(currData);
      setForecast(foreData.list || []);
    } catch (e) {
      if (e.name === 'AbortError') return;
      console.error('useWeather fetch error', e);
      setError(e.message || 'Unable to load weather data');
      setCurrent(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  }, [city, coords]);

  useEffect(() => {
    const controller = new AbortController();
    fetchWeather(controller.signal);
    return () => controller.abort();
  }, [fetchWeather]);

  // wrap setter so that choosing a city clears coords
  const updateCity = (c) => {
    setCoords(null);
    setCity(c);
  }

  return { city, setCity: updateCity, coords, setCoords, current, forecast, loading, error };
}

export default useWeather;