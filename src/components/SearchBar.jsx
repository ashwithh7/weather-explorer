import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

function SearchBar({ onSearch }) {
  const { register, handleSubmit, reset } = useForm({ defaultValues: { city: '' } })
  const [recent, setRecent] = useState([])

  // load history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('recentCities')
    if (stored) setRecent(JSON.parse(stored))
  }, [])

  const saveRecent = (city) => {
    const updated = [city, ...recent.filter((c) => c.toLowerCase() !== city.toLowerCase())].slice(0, 5)
    setRecent(updated)
    localStorage.setItem('recentCities', JSON.stringify(updated))
  }

  const onFormSubmit = ({ city }) => {
    if (!city) return
    saveRecent(city)
    onSearch(city)
    reset()
  }

  return (
    <div className="search-bar mb-4 glass p-3">
      <form
        className="d-flex justify-content-center gap-2"
        onSubmit={handleSubmit(onFormSubmit)}
      >
        <input
          type="text"
          {...register('city', { required: true })}
          placeholder="Search by city..."
          className="form-control w-50"
          style={{ fontSize: '1.2rem', fontWeight: 400 }}
        />
        <button type="submit" className="btn btn-success">
          Search
        </button>
      </form>
      {recent.length > 0 && (
        <div className="text-center mt-2">
          <small>Recent:</small>{' '}
          {recent.map((c, idx) => (
            <button
              key={idx}
              className="btn btn-link btn-sm"
              onClick={() => onSearch(c)}
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar;
