import { FileInput } from 'flowbite-react'

const FilePickerInput = ({ multiple = false }) => {
  return (
    <>
      <FileInput multiple={multiple} />
    </>
  )
}

export default FilePickerInput
