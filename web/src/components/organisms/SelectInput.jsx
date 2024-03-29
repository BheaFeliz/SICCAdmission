import { Select } from 'flowbite-react'

const SelectInput = ({ errors, name, register, label, options, ...rest }) => {
  const formRegister = name && register && { ...register(name) }
  const error = errors?.[name]?.message || null

  return (
    <>
      <Select id={name} variant='outlined' {...formRegister} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {error && <span className='text-xs text-red-700'>{error}</span>}
    </>
  )
}

export default SelectInput
