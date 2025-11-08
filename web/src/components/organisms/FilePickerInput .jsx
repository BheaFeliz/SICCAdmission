import { FileInput } from 'flowbite-react'

const FilePickerInput = (props) => {
  const {
    multiple,
    errors,
    name,
    register,
    accept = 'image/jpeg, image/png, image/jpg',
    ...rest
  } = props

  const formRegister = name && register && { ...register(name) }

  const error = errors?.[name]?.message || null

  return (
    <>
      <FileInput
        multiple={multiple}
        accept={accept}
        {...formRegister}
        {...rest}
        color={error ? 'error' : 'default'}
      />
      {error && <span className='text-xs text-red-700'>{error}</span>}
    </>
  )
}

export default FilePickerInput
