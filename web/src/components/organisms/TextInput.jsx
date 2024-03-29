import { FloatingLabel } from 'flowbite-react'

const TextInput = (props) => {
  const { errors, name, register, ...rest } = props

  const formRegister = name && register && { ...register(name) }

  const error = errors?.[name]?.message || null

  return (
    <div>
      <FloatingLabel
        variant='outlined'
        {...formRegister}
        {...rest}
        color={error ? 'error' : 'default'}
      />
      {error && <span className='text-xs text-red-700'>{error}</span>}
    </div>
  )
}

export default TextInput
