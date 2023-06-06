import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'] })

export const metadata = {
  title: 'Challenge Based Auth',
  description: 'Authentication based on solving a few simple challenges',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
