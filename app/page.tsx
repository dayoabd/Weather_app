'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import WeatherCard from '../components/WeatherCard'
import LocationFilter from '../components/LocationFilter'
import EarthLoader from '../components/EarthLoader'

interface Location {
  lat: number
  lon: number
  name?: string
  country_code?: string
}

interface Weather {
  temperature: number
  windspeed: number
  weathercode: number
  time: string
}

export default function Home() {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState<Location | null>(null)

  // 🗺️ Get user's location
  useEffect(() => {
    if (!location) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setLocation({
              lat: pos.coords.latitude,
              lon: pos.coords.longitude,
              name: 'Your Location',
            })
          },
          () => {
            // Default fallback (Lagos)
            setLocation({
              lat: 6.5244,
              lon: 3.3792,
              name: 'Lagos, Nigeria',
              country_code: 'NG',
            })
          }
        )
      } else {
        // If geolocation not available, fallback
        setLocation({
          lat: 6.5244,
          lon: 3.3792,
          name: 'Lagos, Nigeria',
          country_code: 'NG',
        })
      }
    }
  }, [location])

  // 🌦️ Fetch weather data when location is ready
  useEffect(() => {
    if (!location) return // Prevent running with null location

    const fetchWeather = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`
        )

        if (!res.ok) throw new Error('Failed to fetch weather data')

        const data = await res.json()
        setWeather(data.current_weather)
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Something went wrong'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [location])

  // 🌀 Loading / Error states
  if (loading || !weather) return <EarthLoader />
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>

  // 🌍 Flag emoji generator
  const getFlag = (code?: string) =>
    code
      ? String.fromCodePoint(...[...code.toUpperCase()].map((c) => 127397 + c.charCodeAt(0)))
      : '🌍'

  return (
    <motion.div
      className="space-y-6 w-full max-w-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <LocationFilter setLocation={setLocation} />
      <WeatherCard
        weather={weather}
        location={location?.name ?? 'Unknown'}
        flag={getFlag(location?.country_code)}
      />
    </motion.div>
  )
}
