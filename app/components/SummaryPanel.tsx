import { Expense } from "../types/expense"
import { Card } from "./ui/Card"

interface Props {
  expenses: Expense[]
}

export default function SummaryPanel({ expenses }: Props) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  const categoryTotals: Record<string, number> = {}

  expenses.forEach((e) => {
    categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount
  })

  return (
    <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none">
      <h2 className="text-lg font-medium text-gray-300 mb-1">Total Balance</h2>
      <p className="text-4xl font-bold mb-6">${total.toFixed(2)}</p>

      <div className="border-t border-gray-700 pt-4">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Spending by Category</h3>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(categoryTotals).map(([cat, val]) => (
            <div key={cat} className="bg-gray-800/50 p-3 rounded-lg">
              <p className="text-sm text-gray-400">{cat}</p>
              <p className="font-semibold">${val.toFixed(2)}</p>
            </div>
          ))}
          {Object.keys(categoryTotals).length === 0 && (
            <p className="text-sm text-gray-500">No data to display.</p>
          )}
        </div>
      </div>
    </Card>
  )
}