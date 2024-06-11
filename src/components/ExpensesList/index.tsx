import { useMemo } from 'react'
import { useBudget } from '../../hooks/useBudget'
import { ExpenseDetails } from '../ExpenseDetails'

export const ExpensesList = () => {
  const { state } = useBudget()
  const filteredExpenses =
    state.currentCategory !== ''
      ? state.expenses.filter(
          (expense) => expense.category === state.currentCategory
        )
      : state.expenses
  const isEmpty = useMemo(
    () => filteredExpenses.length === 0,
    [filteredExpenses]
  )

  return (
    <div className='mt-10 bg-white p-10 pt-2 pb-0 rounded-lg shadow-lg'>
      {isEmpty ? (
        <p className='text-gray-600 text-2xl font-bold py-10'>
          No hay gastos registrados
        </p>
      ) : (
        <>
          <p className='text-gray-600 text-2xl font-bold my-5'>
            Listado de gastos
          </p>
          {filteredExpenses.map((expense) => (
            <ExpenseDetails
              key={expense.id}
              expense={expense}
            />
          ))}
        </>
      )}
    </div>
  )
}
