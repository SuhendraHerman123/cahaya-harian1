import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cahaya Harian — Quotes Positif Setiap Hari',
  description: 'Mulai harimu dengan kata-kata penuh semangat dan inspirasi. Quote motivasi, stress relief, dan filosofi hidup untuk jiwamu.',
  keywords: 'quotes positif, motivasi harian, stress relief, mindfulness, inspirasi',
  openGraph: {
    title: 'Cahaya Harian',
    description: 'Quote positif harian untuk jiwa yang tenang dan semangat membara',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
