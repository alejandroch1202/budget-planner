import { useMemo } from 'react'
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import type { Expense } from '../../types'
import { formmatDate } from '../../utils'
import { AmountDisplay } from '../AmountDisplay'
import { categories } from '../../data/categories'
import { useBudget } from '../../hooks/useBudget'
import 'react-swipeable-list/dist/styles.css'
import './index.css'

interface ExpenseDetailsProps {
  expense: Expense
}

export const ExpenseDetails = ({ expense }: ExpenseDetailsProps) => {
  const { dispatch } = useBudget()
  const categoryInfo = useMemo(
    () => categories.find((category) => category.id === expense.category),
    [expense]
  )

  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          dispatch({ type: 'set-activeId', payload: { id: expense.id } })
        }}
      >
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          dispatch({ type: 'remove-expense', payload: { id: expense.id } })
        }}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  )

  return (
    <SwipeableList>
      <SwipeableListItem
        maxSwipe={0.6}
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='bg-white shadow-lg py-10 w-full border-b border-gray-200 flex gap-5 items-center prevent-select'>
          <div>
            <img
              className='w-20 prevent-drag'
              src={`/icono_${categoryInfo?.icon}.svg`}
              alt={'icono del gasto'}
            />
          </div>

          <div className='flex-1 space-y-2'>
            <p className='text-sm font-bold uppercase text-gray-500'>
              {categoryInfo?.name}
            </p>
            <p>{expense.name}</p>

            <p className='text-gray-600 text-sm'>
              {formmatDate(expense.date!.toString())}
            </p>
          </div>

          <AmountDisplay
            label=''
            amount={expense.amount}
          />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}
