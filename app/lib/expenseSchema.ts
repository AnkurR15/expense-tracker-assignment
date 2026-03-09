import { z } from "zod";

export const expenseSchema = z.object({
  name: z.string().min(3, "Expense name must be at least 3 characters"),
  amount: z.coerce.number().positive("Amount must be greater than zero"),
  category: z.string().min(1, "Please select a valid category"),
});


export type ExpenseFormData = z.infer<typeof expenseSchema>;