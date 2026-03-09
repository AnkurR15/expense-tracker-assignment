"use client"

import { useEffect, useState } from "react"
import { fetchRate } from "../lib/currencyApi"
import { Card } from "./ui/Card"

interface Props {
  total: number
}

export default function CurrencyConverter({ total }: Props) {
  const [currency, setCurrency] = useState("")
  const [rate, setRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (total === 0) {
      setRate(null)
      return
    }

    const loadRate = async () => {
      try {
        setLoading(true)
        setError(false)
        const r = await fetchRate(currency)
        setRate(r)
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    // Small debounce to prevent spamming the API
    const timeoutId = setTimeout(() => {
      loadRate()
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [currency, total])

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Live Conversion</h2>
        <select
          className="text-gray-900 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="" disabled>Select a category</option>
          <option value="INR">INR (₹)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
        </select>
      </div>

      <div className="min-h-[60px] flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100">
        {total === 0 ? (
          <p className="text-gray-500 text-sm">Add an expense to see conversion</p>
        ) : loading ? (
          <p className="text-gray-700 text-sm animate-pulse">Fetching live rates...</p>
        ) : error ? (
           // Graceful error state showing blank space/simple text so UI doesn't break
          <p className="text-gray-400 text-sm">Unable to fetch rates at this time.</p>
        ) : rate ? (
          <p className="text-2xl font-bold text-gray-800">
            {currency === "INR" ? "₹" : currency === "EUR" ? "€" : "£"}
            {(total * rate).toFixed(2)}
          </p>
        ) : null}
      </div>
    </Card>
  )
}