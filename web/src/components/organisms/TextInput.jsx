import { FloatingLabel } from 'flowbite-react'

const TextInput = (props) => {
  const { errors, name, register, ...rest } = props

  const formRegister = name && register ? { ...register(name) } : {}

  const error = errors?.[name]?.message || null

  return (
    <div className='grid grid-flow-col justify-stretch space-x-4'>
      <FloatingLabel
        variant='outlined'
        {...formRegister}
        {...rest}
        color={error ? 'error' : 'default'}
        className='dark:bg-gray-700 dark:text-white dark:border-gray-600'
      />
      {error && (
        <span className='text-xs text-red-700 dark:text-red-400'>{error}</span>
      )}
    </div>
  )
}

export default TextInput
