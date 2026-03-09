"use client"

import { Expense } from "../types/expense"
import { Card } from "./ui/Card"
import { Button } from "./ui/Button"

interface Props {
  expenses: Expense[]
  onDelete: (id: string) => void
}

export default function ExpenseList({ expenses, onDelete }: Props) {
  if (expenses.length === 0) {
    return (
      <Card className="text-center py-10">
        <p className="text-gray-500">No expenses added yet. Start by adding one above!</p>
      </Card>
    )
  }

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Expenses</h2>
      <div className="space-y-3">
        {expenses.map((exp) => (
          <div
            key={exp.id}
            className="flex justify-between items-center border border-gray-100 p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div>
              <p className="font-medium text-gray-900">{exp.name}</p>
              <span className="inline-block mt-1 text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                {exp.category}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-900">${exp.amount.toFixed(2)}</span>
              <Button variant="danger" onClick={() => onDelete(exp.id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}