import { Textarea } from 'flowbite-react'

const TextAreaInput = ({ placeHolder, name, register }) => {
  const formRegister = name && register && { ...register(name) }

  return <Textarea placeholder={placeHolder} rows={4} {...formRegister} />
}

export default TextAreaInput
