type ValuePiece = Date | null

export type Value = ValuePiece | [ValuePiece, ValuePiece]

export interface Expense {
  id: string
  name: string
  amount: number
  category: string
  date: Value
}

export interface DraftExpense extends Omit<Expense, 'id'> {}

export interface Category {
  id: string
  name: string
  icon: string
}
