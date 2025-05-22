import RevenuePlot from './components/RevenuePlot'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full flex justify-center">
        <h1 className="text-4xl font-bold mb-8 text-center">Market Framer (Supabase + Vercel practice)</h1>
      </div>
      <RevenuePlot />
    </main>
  )
} 