'use client'

import { useEffect, useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Area, AreaChart
} from 'recharts'

const COMPANY_COLORS: Record<string, string> = {
  Pfizer: '#1D5BFF',            // blue
  Moderna: '#FF3B30',           // red
  'Johnson & Johnson': '#FF2D92', // pink
}
const DEFAULT_COLOR = '#A0AEC0'

export default function RevenuePlot() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([])
  const [companies, setCompanies] = useState<any[]>([])
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [showAddFilterDropdown, setShowAddFilterDropdown] = useState(false)
  const [companyFilterActive, setCompanyFilterActive] = useState(false)
  const [showCompanyDropdown, setShowCompanyDropdown] = useState(false)
  const companyDropdownRef = useRef<HTMLDivElement>(null)

  // Fetch companies on mount
  useEffect(() => {
    async function fetchCompanies() {
      const { data } = await supabase.from('companies').select('id, name')
      setCompanies(data || [])
      setSelectedCompanies((data || []).map((c: any) => c.id)) // select all by default
    }
    fetchCompanies()
  }, [])

  // Fetch and process revenue data when selected companies or companies change
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      let query = supabase.from('revenues').select('company_id, fiscal_year, revenue_millions')
      if (selectedCompanies.length > 0) query = query.in('company_id', selectedCompanies)
      const { data: revenues } = await query
      if (!revenues) {
        setData([])
        setLoading(false)
        return
      }
      // Get all years present
      const allYears = Array.from(new Set(revenues.map((r: any) => r.fiscal_year))).sort()
      // Build data: one object per year, with each company as a key
      const yearMap: Record<string, any> = {}
      allYears.forEach((year) => {
        yearMap[year] = { fiscal_year: year }
      })
      revenues.forEach((row: any) => {
        const comp = companies.find((c) => c.id === row.company_id)
        if (comp) {
          yearMap[row.fiscal_year][comp.name] = Number(row.revenue_millions)
        }
      })
      setData(Object.values(yearMap))
      setLoading(false)
    }
    fetchData()
  }, [selectedCompanies, companies])

  // Close company dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (companyDropdownRef.current && !companyDropdownRef.current.contains(event.target as Node)) {
        setShowCompanyDropdown(false)
      }
    }
    if (showCompanyDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCompanyDropdown])

  function handleCompanyToggle(id: string) {
    setSelectedCompanies((prev) =>
      prev.includes(id)
        ? prev.filter((cid) => cid !== id)
        : [...prev, id]
    )
  }

  function handleSelectAllCompanies() {
    setSelectedCompanies(companies.map((c: any) => c.id))
  }

  function handleDeselectAllCompanies() {
    setSelectedCompanies([])
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 font-montserrat">
      <div className="flex gap-3 mb-6 items-center relative">
        {/* Company Multi-Select Dropdown Trigger */}
        <div className="relative">
          <button
            type="button"
            className="flex items-center w-64 border border-gray-200 bg-white rounded-xl px-5 py-3 shadow text-base font-medium text-gray-800 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-blue-200 font-montserrat"
            onClick={() => setShowCompanyDropdown((open) => !open)}
            style={{ minHeight: '48px' }}
          >
            <span className="font-semibold font-montserrat">Company</span>
          </button>
          {showCompanyDropdown && (
            <div ref={companyDropdownRef} className="absolute left-0 mt-2 z-30 bg-white rounded-xl shadow-lg border w-64 py-2 font-montserrat">
              <div className="max-h-60 overflow-y-auto flex flex-col gap-1 px-2 py-2">
                {companies.map((c) => (
                  <label key={c.id} className="flex items-center gap-3 text-base cursor-pointer font-medium py-2 px-2 rounded hover:bg-blue-50 font-montserrat">
                    <input
                      type="checkbox"
                      checked={selectedCompanies.includes(c.id)}
                      onChange={() => handleCompanyToggle(c.id)}
                      className="accent-blue-600 w-5 h-5 rounded"
                    />
                    <span className="text-gray-800 font-montserrat" style={{ color: COMPANY_COLORS[c.name] || undefined }}>
                      {c.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 font-montserrat">
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fiscal_year" tickFormatter={v => v} fontSize={16} fontWeight={600} className="font-montserrat" />
            <YAxis fontSize={16} fontWeight={600} className="font-montserrat" />
            <Tooltip wrapperClassName="!rounded-xl !shadow-lg !border !border-gray-200 !bg-white font-montserrat" contentStyle={{ fontSize: 16, fontWeight: 600 }} />
            {selectedCompanies.map((id) => {
              const c = companies.find((comp) => comp.id === id)
              if (!c) return null
              return (
                <>
                  <Area
                    key={c.id + '-area'}
                    type="monotone"
                    dataKey={c.name}
                    stroke={COMPANY_COLORS[c.name] || DEFAULT_COLOR}
                    fill={COMPANY_COLORS[c.name] || DEFAULT_COLOR}
                    fillOpacity={0.12}
                    dot={{ r: 8, stroke: '#fff', strokeWidth: 3 }}
                    strokeWidth={4}
                  />
                  <Line
                    key={c.id + '-line'}
                    type="monotone"
                    dataKey={c.name}
                    stroke={COMPANY_COLORS[c.name] || DEFAULT_COLOR}
                    dot={{ r: 8, stroke: '#fff', strokeWidth: 3 }}
                    strokeWidth={4}
                  />
                </>
              )
            })}
          </AreaChart>
        </ResponsiveContainer>
        {loading && <div className="text-center mt-2 font-montserrat">Loading...</div>}
        {!loading && data.length === 0 && <div className="text-center mt-2 font-montserrat">No data found.</div>}
      </div>
    </div>
  )
} 