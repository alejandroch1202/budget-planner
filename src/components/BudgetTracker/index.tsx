import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { useBudget } from '../../hooks/useBudget'
import { AmountDisplay } from '../AmountDisplay'
import 'react-circular-progressbar/dist/styles.css'

export const BudgetTracker = () => {
  const { state, dispatch, totalAvailable, totalExpenses } = useBudget()

  const percentage = Number(((totalExpenses / state.budget) * 100).toFixed(2))

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <div className='flex justify-center'>
        <CircularProgressbar
          value={percentage}
          text={percentage.toString() + '% Gastado'}
          styles={buildStyles({
            pathColor: percentage > 99 ? '#ef4444' : '#2563eb',
            trailColor: '#e2e8f0',
            textSize: '10',
            textColor: percentage > 99 ? '#ef4444' : '#2563eb'
          })}
        />
      </div>

      <div className='flex flex-col justify-center items-center gap-8'>
        <button
          onClick={() => {
            dispatch({ type: 'reset-app' })
          }}
          type='button'
          className='bg-pink-600 hover:bg-pink-700 active:bg-pink-800 w-full p-2 text-white uppercase font-bold rounded-lg'
        >
          Reiniciar App
        </button>

        <AmountDisplay
          label='Presupuesto'
          amount={state.budget}
        />
        <AmountDisplay
          label='Disponible'
          amount={totalAvailable}
        />
        <AmountDisplay
          label='Gastado'
          amount={totalExpenses}
        />
      </div>
    </div>
  )
}
