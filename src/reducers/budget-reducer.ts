import { v4 as uuid } from 'uuid'
import type { Category, DraftExpense, Expense } from '../types'

export type BudgetActions =
  // prettier-ignore
  | { type: 'set-budget', payload: { budget: number } }
  // prettier-ignore
  | { type: 'open-modal' }
  // prettier-ignore
  | { type: 'close-modal' }
  // prettier-ignore
  | { type: 'add-expense', payload: { expense: DraftExpense } }
  // prettier-ignore
  | { type: 'remove-expense', payload: { id: Expense['id'] } }
  // prettier-ignore
  | { type: 'set-activeId', payload: { id: Expense['id'] } }
  // prettier-ignore
  | { type: 'edit-expense', payload: { expense: Expense } }
  // prettier-ignore
  | { type: 'filter-by-category', payload: { id: Category['id'] } }
  // prettier-ignore
  | { type: 'reset-app' }

export interface BudgetState {
  budget: number
  modal: boolean
  expenses: Expense[]
  activeId: Expense['id']
  currentCategory: Category['id']
}

const initialBudget = (): number => {
  const budget = localStorage.getItem('budget')
  return budget !== null ? Number(budget) : 0
}

const initialExpenses = (): Expense[] => {
  const expenses = localStorage.getItem('expenses')
  return expenses !== null ? JSON.parse(expenses) : []
}

export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: initialExpenses(),
  activeId: '',
  currentCategory: ''
}

const createExpense = (draft: DraftExpense): Expense => {
  return {
    ...draft,
    id: uuid()
  }
}

export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  if (action.type === 'set-budget') {
    return {
      ...state,
      budget: action.payload.budget
    }
  }

  if (action.type === 'open-modal') {
    return {
      ...state,
      modal: true
    }
  }

  if (action.type === 'close-modal') {
    return {
      ...state,
      modal: false,
      activeId: ''
    }
  }

  if (action.type === 'add-expense') {
    const expense = createExpense(action.payload.expense)

    return {
      ...state,
      expenses: [...state.expenses, expense],
      modal: false
    }
  }

  if (action.type === 'set-activeId') {
    return {
      ...state,
      modal: true,
      activeId: action.payload.id
    }
  }

  if (action.type === 'remove-expense') {
    return {
      ...state,
      expenses: state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      )
    }
  }

  if (action.type === 'edit-expense') {
    const { id, ...rest } = action.payload.expense

    return {
      ...state,
      activeId: '',
      modal: false,
      expenses: state.expenses.map((expense) =>
        expense.id === id ? { ...expense, ...rest } : expense
      )
    }
  }

  if (action.type === 'filter-by-category') {
    return {
      ...state,
      currentCategory: action.payload.id
    }
  }

  if (action.type === 'reset-app') {
    localStorage.clear()
    return initialState
  }

  return {
    ...state
  }
}
