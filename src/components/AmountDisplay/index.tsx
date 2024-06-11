import { formmatCurrency } from '../../utils'

interface AmountDisplayProps {
  label: string
  amount: number
}

export const AmountDisplay = ({ label, amount }: AmountDisplayProps) => {
  return (
    <p className='text-2xl text-blue-600 font-bold'>
      {label !== '' && `${label}: `}
      <span className='font-black text-black'>{formmatCurrency(amount)}</span>
    </p>
  )
}
