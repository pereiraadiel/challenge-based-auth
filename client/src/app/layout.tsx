import './globals.css'
import styles from './page.module.css'
import { Inter } from 'next/font/google'
import { Header } from './components/header'

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
      <body className={inter.className}>
        <main className={styles.main}>
          <>
            <Header/>
            {children}
            <p> {'<'}Developed by <a href='https://adiel.dev' target='_blank' rel='noreferrer noopener'>Adiel Pereira</a> {'/>'}</p>
          </>
        </main>
        </body>
    </html>
  )
}
