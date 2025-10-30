'use client'

export default function WeatherCard({
  weather,
  location,
  flag,
}: {
  weather: any
  location?: string
  flag?: string
}) {
  const weatherEmojis: Record<number, string> = {
    0: '☀️',
    1: '🌤️',
    2: '⛅',
    3: '☁️',
    45: '🌫️',
    48: '🌫️',
    51: '🌦️',
    61: '🌧️',
    71: '❄️',
    95: '⛈️',
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 shadow-lg text-center space-y-2">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-2">
        {flag} {location || 'Unknown Location'}
      </h2>
      <div className="text-6xl">
        {weatherEmojis[weather.weathercode] || '🌍'}
      </div>
      <p className="text-3xl font-bold">{weather.temperature}°C</p>
      <p className="text-gray-600 dark:text-gray-400">
        Wind: {weather.windspeed} km/h
      </p>
      <p className="text-sm text-gray-500">
        Last updated: {new Date(weather.time).toLocaleTimeString()}
      </p>
    </div>
  )
}
