import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js + Supabase App',
  description: 'A minimal Next.js application with Supabase integration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 