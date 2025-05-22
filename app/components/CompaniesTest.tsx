'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function CompaniesTest() {
  const [companies, setCompanies] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchCompanies = async () => {
    setLoading(true)
    setError(null)
    const { data, error } = await supabase.from('companies').select('*')
    if (error) setError(error.message)
    setCompanies(data || [])
    setLoading(false)
  }

  const addCompany = async () => {
    setLoading(true)
    setError(null)
    const { error } = await supabase.from('companies').insert([
      {
        name: 'Test Company',
        ticker: 'TST',
        industry: 'Test Industry',
        sector: 'Test Sector',
        headquarters: 'Test HQ',
        created_at: new Date().toISOString(),
      },
    ])
    if (error) setError(error.message)
    await fetchCompanies()
    setLoading(false)
  }

  return (
    <div className="p-4 space-y-4">
      <div className="space-x-4">
        <button
          onClick={fetchCompanies}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Companies'}
        </button>
        <button
          onClick={addCompany}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          disabled={loading}
        >
          Add Test Company
        </button>
      </div>
      {error && <div className="text-red-500">Error: {error}</div>}
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Companies:</h2>
        {companies.length === 0 ? (
          <p>No companies found. Click "Fetch Companies" to load.</p>
        ) : (
          <ul className="space-y-2">
            {companies.map((company) => (
              <li key={company.id} className="p-2 bg-gray-100 rounded">
                {company.name} ({company.ticker})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
} 