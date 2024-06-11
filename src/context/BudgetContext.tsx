import { useReducer, createContext, type Dispatch, useMemo } from 'react'
import {
  budgetReducer,
  initialState,
  type BudgetActions,
  type BudgetState
} from '../reducers/budget-reducer'

interface BudgetContextProps {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
  totalExpenses: number
  totalAvailable: number
}

export const BudgetContext = createContext<BudgetContextProps>(null!)

export const BudgetProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState)

  const totalExpenses = useMemo(
    () => state.expenses.reduce((total, expense) => total + expense.amount, 0),
    [state.expenses]
  )

  const totalAvailable = state.budget - totalExpenses

  return (
    <BudgetContext.Provider
      value={{ state, dispatch, totalExpenses, totalAvailable }}
    >
      {children}
    </BudgetContext.Provider>
  )
}
