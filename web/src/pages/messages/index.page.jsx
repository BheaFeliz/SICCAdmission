import { Avatar, Badge, Button } from 'flowbite-react'
import { HiOutlineArrowRight } from 'react-icons/hi'

import Bubble from '@/components/organisms/Bubble'
import TextAreaInput from '@/components/organisms/TextAreaInput'
import TextInput from '@/components/organisms/TextInput'
import Template from '@/components/templates/Template'

const Messages = () => {
  const messages = [
    {
      name: 'Foo',
      messages: 'test only',
      unread: 3,
    },
    {
      name: 'Bar',
      messages: 'test only',
      unread: 0,
    },
    {
      name: 'Foo Bar',
      messages: 'test only',
      unread: 12,
    },
    {
      name: 'Foo Bar',
      messages: 'test only',
      unread: 12,
    },
  ]

  return (
    <Template contentSx='px-0'>
      <div className='flex h-full'>
        <div className='w-80 border-r border-inherit pr-4'>
          <TextInput placeHolder='Search' sizing='sm' />

          <div className='flow-root max-h-[85vh] overflow-y-auto'>
            <ul className='divide-y divide-gray-200 dark:divide-gray-700'>
              {messages?.map((m) => {
                return (
                  <li
                    key={m.name}
                    className='py-3 px-2 sm:py-4 cursor-pointer hover:bg-slate-50'
                  >
                    <div className='flex items-center space-x-4'>
                      <div className='shrink-0'>
                        <Avatar rounded />
                      </div>
                      <div className='min-w-0 flex-1'>
                        <p className='truncate text-sm font-medium text-gray-900 dark:text-white'>
                          {m.name}
                        </p>
                      </div>
                      <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                        {!!m.unread && (
                          <Badge color='failure'>{m.unread}</Badge>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <div className='flex-1 px-4 relative'>
          <div className='space-y-2 max-h-[80vh] overflow-y-auto pb-8'>
            <Bubble />
            <Bubble isSender />
            <Bubble isSender />
            <Bubble isSender />
            <Bubble isSender />
            <Bubble isSender />
            <Bubble isSender />
            <Bubble isSender />
            <Bubble isSender />
            <Bubble isSender />
            <Bubble isSender />
            <Bubble isSender />
            <Bubble isSender />
          </div>
          <div className='absolute inset-x-0 bottom-0 p-4 flex space-x-2 '>
            <TextAreaInput />
            <div className='flex items-center'>
              <Button color='warning' size={'xs'} outline pill>
                <HiOutlineArrowRight className='h-6 w-6' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Template>
  )
}

export default Messages
