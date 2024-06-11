import { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker'
import { categories } from '../../data/categories'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import type { DraftExpense, Value } from '../../types'
import { useBudget } from '../../hooks/useBudget'
import { ErrorMessage } from '../ErrorMessage'

const initialExpense = { amount: 0, category: '', name: '', date: new Date() }

export const ExpensesForm = () => {
  const [error, setError] = useState('')
  const [expense, setExpense] = useState<DraftExpense>(initialExpense)
  const [previousAmount, setPreviousAmount] = useState(0)
  const { state, dispatch, totalAvailable } = useBudget()

  useEffect(() => {
    if (state.activeId !== '') {
      const editingExpense = state.expenses.find(
        (expense) => expense.id === state.activeId
      )!
      setExpense(editingExpense)
      setPreviousAmount(editingExpense.amount)
    }
  }, [state.activeId])

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target
    const isAmountField = ['amount'].includes(name)

    setExpense({
      ...expense,
      [name]: isAmountField ? Number(value) : value
    })
  }

  const handleChangeDate = (value: Value) => {
    setExpense({
      ...expense,
      date: value
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (Object.values(expense).includes('')) {
      setError('Todos los campos son obligatorios')
      return
    }

    if (expense.amount - previousAmount > totalAvailable) {
      setError('La cantidad supera el presupuesto disponible')
      return
    }

    if (state.activeId !== '') {
      dispatch({
        type: 'edit-expense',
        payload: { expense: { id: state.activeId, ...expense } }
      })
    } else {
      dispatch({ type: 'add-expense', payload: { expense } })
    }

    setExpense(initialExpense)
    setPreviousAmount(0)
  }

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete='off'
      className='space-y-5'
    >
      <legend className='uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>
        {state.activeId === '' ? 'Nuevo gasto' : 'Editar gasto'}
      </legend>

      {error !== '' && <ErrorMessage error={error} />}

      <div className='flex flex-col gap-2'>
        <label
          htmlFor='name'
          className='text-xl'
        >
          Nombre:
        </label>

        <input
          type='text'
          id='name'
          placeholder='Ej. Consulta médica'
          className='bg-gray-100 p-2'
          name='name'
          value={expense.name}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label
          htmlFor='amount'
          className='text-xl'
        >
          Cantidad:
        </label>

        <input
          type='number'
          id='amount'
          onFocus={(event) => {
            event.currentTarget.select()
          }}
          placeholder='Ej. 300'
          className='bg-gray-100 p-2'
          name='amount'
          value={expense.amount}
          onChange={handleChange}
        />
      </div>

      <div className='flex flex-col gap-2'>
        <label
          htmlFor='category'
          className='text-xl'
        >
          Categoría:
        </label>

        <select
          id='category'
          className='bg-gray-100 p-2'
          name='category'
          value={expense.category}
          onChange={handleChange}
        >
          <option>-- Seleccionar --</option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col gap-2'>
        <label className='text-xl'>Fecha:</label>

        <DatePicker
          className='bg-gray-100 p-2 border-0'
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>

      <input
        type='submit'
        className='bg-blue-600 hover:bg-blue-700 active:bg-blue-800 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg'
        value={state.activeId === '' ? 'Registrar gasto' : 'Guardar cambios'}
      />
    </form>
  )
}
