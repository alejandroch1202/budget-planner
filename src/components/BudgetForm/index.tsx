import { useMemo, useState } from 'react'
import { useBudget } from '../../hooks/useBudget'

export const BudgetForm = () => {
  const [budget, setBudget] = useState(0)

  const { dispatch } = useBudget()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(Number(event.target.value))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    dispatch({ type: 'set-budget', payload: { budget } })
  }

  const isBudgetValid = useMemo(() => isNaN(budget) || budget <= 0, [budget])

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-5'
    >
      <div className='flex flex-col space-y-5'>
        <label
          htmlFor='budget'
          className='text-4xl text-blue-600 font-bold text-center'
        >
          Definir Presupuesto
        </label>

        <input
          onSelect={(e) => {
            e.currentTarget.select()
          }}
          type='number'
          min={0}
          id='budget'
          className='w-full bg-white border border-gray-200 p-2'
          placeholder='Define tu presupuesto'
          value={budget}
          onChange={handleChange}
        />
      </div>

      <input
        type='submit'
        disabled={isBudgetValid}
        value={'Definir presupuesto'}
        className='bg-blue-600 hover:bg-blue-700 active:bg-blue-800 cursor-pointer w-full p-2 text-white font-bold uppercase disabled:opacity-20 disabled:cursor-not-allowed'
      />
    </form>
  )
}
