"use client"

import { useState, useEffect } from "react"
import { Expense } from "./types/expense";
import ExpenseForm from "./components/ExpenseForm";
import CurrencyConverter from "./components/CurrencyConverter";
import SummaryPanel from "./components/SummaryPanel";
import ExpenseList from "./components/xpenseList";


export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from LocalStorage 
  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) {
      setExpenses(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage whenever expenses change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }, [expenses, isLoaded]);

  const addExpense = (expense: Expense) => {
    setExpenses((prev) => [expense, ...prev]); // Add new items to the top
  }

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  
  if (!isLoaded) return null; 

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
          <p className="text-gray-500">Log, categorize, and manage your spending</p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (Forms & APIs) */}
          <div className="lg:col-span-4 space-y-6">
            <ExpenseForm onAdd={addExpense} />
            <CurrencyConverter total={total} />
          </div>

          {/* Right Column (Data Display) */}
          <div className="lg:col-span-8 space-y-6">
            <SummaryPanel expenses={expenses} />
            <ExpenseList expenses={expenses} onDelete={deleteExpense} />
          </div>

        </div>
      </div>
    </main>
  );
}