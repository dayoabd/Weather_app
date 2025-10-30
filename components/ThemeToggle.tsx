'use client'

import { useEffect, useState } from 'react'
import { BsSunFill, BsMoonStarsFill } from 'react-icons/bs'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      setTheme(saved)
      document.documentElement.classList.toggle('dark', saved === 'dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', prefersDark)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-yellow-300 shadow-md hover:scale-110 transition-transform"
    >
      {theme === 'light' ? <BsMoonStarsFill size={20} /> : <BsSunFill size={20} />}
    </button>
  )
}
