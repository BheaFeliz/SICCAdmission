import { Toast } from 'flowbite-react'

const Toasts = ({ toasts }) => {
  if (!toasts || !toasts.length) return null

  return (
    <div className='absolute z-50 w-1/2 top-2 start-1/2 -translate-x-1/2 flex flex-col justify-center items-center gap-4'>
      {toasts?.map((toast) => {
        return (
          <Toast key={toast.id} className='max-w-none min-w-[200px] w-auto'>
            <div
              className={`ml-3 text-sm font-normal ${
                toast.type === 'error' && 'text-red-500'
              }`}
            >
              {toast.message}
            </div>
            <Toast.Toggle />
          </Toast>
        )
      })}
    </div>
  )
}

export default Toasts
