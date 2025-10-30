'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function LocationFilter({ setLocation }: any) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (value.length < 2) {
      setResults([])
      return
    }

    setLoading(true)
    try {
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${value}&count=6&language=en&format=json`
      )
      const data = await res.json()
      setResults(data.results || [])
    } catch (err) {
      console.error('Location search failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const selectLocation = (loc: any) => {
    setQuery('')
    setResults([])
    setLocation({
      lat: loc.latitude,
      lon: loc.longitude,
      name: `${loc.name}, ${loc.country}`,
      country_code: loc.country_code,
    })
  }

  const getFlag = (code: string) =>
    code
      ? String.fromCodePoint(...[...code.toUpperCase()].map(c => 127397 + c.charCodeAt(0)))
      : '🌍'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center relative w-full max-w-md mx-auto"
    >
      <input
        type="text"
        placeholder="🔍 Type a city, state, or country..."
        value={query}
        onChange={handleSearch}
        className="w-full p-3 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {loading && (
        <div className="absolute top-full mt-2 text-sm text-gray-500 dark:text-gray-300">
          Searching...
        </div>
      )}

      {results.length > 0 && (
        <ul className="absolute z-10 top-full mt-2 w-full bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.map((loc) => (
            <li
              key={`${loc.id}-${loc.latitude}`}
              onClick={() => selectLocation(loc)}
              className="p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 flex justify-between"
            >
              <span>{loc.name}, {loc.country}</span>
              <span>{getFlag(loc.country_code)}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  )
}
