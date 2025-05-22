import CompaniesTest from './components/CompaniesTest'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Next.js + Supabase</h1>
      <CompaniesTest />
    </main>
  )
} 