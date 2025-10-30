import './globals.css'
import ThemeToggle from '../components/ThemeToggle'
import Image from 'next/image'
import logoimage from '../public/mylloggo.png'
import { image } from 'framer-motion/client'
import { FaEarthAmericas } from "react-icons/fa6";

export const metadata = {
  title: 'Weather App',
  description: 'Realtime weather forecast with Next.js + Tailwind',
  icons: {
    icon: '/mylloggo.png', // ✅ use the same image for favicon
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen">
        <ThemeToggle />

        <div className="flex justify-center mt-6">
          <div className="w-20 h-20 rounded-full overflow-hidden shadow-md border border-gray-300 dark:border-gray-700">
            <Image
              src={logoimage}
              alt="Weather App Logo"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        <main className="p-6 flex flex-col items-center">{children}</main>
      </body>
    </html>
  )
}
