import { Button } from 'flowbite-react';
import Image from 'next/image';

import TextInput from '@/components/organisms/TextInput';

import { useHooks } from './hooks';

const Login = () => {
  const { formState, handleSubmit } = useHooks();
  
  return (
    <section className='bg-white dark:bg-gray-900' style={{ paddingBottom: '60px' }}>
      <div className='flex flex-col gap-2 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <Image src='/logo.png' alt='logo' width={120} height={100} />

        <h1 className='text-xl font-bold text-blue-900'>
          Samal Island City College
        </h1>

        <form onSubmit={handleSubmit}>
          <div className='space-y-8 mt-8 w-80'>
            <TextInput label='Username' name='username' {...formState} />
            <TextInput
              label='Password'
              name='password'
              type='password'
              {...formState}
            />

            <Button color='blue' className='w-full' type='submit'>
              Submit
            </Button>

          </div>
        </form>
      </div>
    </section>
  )
}

export default Login;
