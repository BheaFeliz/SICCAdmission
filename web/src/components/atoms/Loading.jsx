import { Spinner } from 'flowbite-react'

const Loading = () => {
  return (
    <div className='flex items-center justify-center w-full h-[60vh]'>
      <Spinner color="info" size="xl"/>
    </div>
  )
}

export default Loading
