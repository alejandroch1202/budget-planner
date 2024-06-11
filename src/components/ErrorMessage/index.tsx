interface ErrorMessageProps {
  error: string
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <p className='bg-red-500 text-white text-center p-2 text-sm uppercase font-bold'>
      {error}
    </p>
  )
}
