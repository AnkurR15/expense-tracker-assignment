"use client"

import { useState } from "react"
import { Expense } from "../types/expense"
import { Card } from "./ui/Card"
import { Input } from "./ui/Input"
import { Button } from "./ui/Button"


interface Props {
  onAdd: (expense: Expense) => void
}

export default function ExpenseForm({ onAdd }: Props) {
const [name, setName] = useState("")
const [amount, setAmount] = useState("")
const [category, setCategory] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !amount || !category) return;

    const newExpense: Expense = {
      id: Date.now().toString(),
      name,
      amount: Number(amount),
      category,
    }

    onAdd(newExpense)
   setName("")
  setAmount("")
  setCategory("")
  }

 
  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1">Expense Name</label>
          <Input
            placeholder="e.g. Flight to London"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
          <Input
            type="number"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
           required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>Select a category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Marketing">Marketing</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>

        </div>

        <Button type="submit" className="w-full" variant="primary">
          Add Expense
        </Button>
      </form>
    </Card>
  )
}


