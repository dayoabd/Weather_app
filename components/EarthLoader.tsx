'use client'

import { motion } from 'framer-motion'

export default function EarthLoader() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-700 dark:text-gray-200">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
        className="text-6xl"
      >
        🌍
      </motion.div>
      <p className="mt-4 text-lg font-medium">loading your weather</p>
    </div>
  )
}
