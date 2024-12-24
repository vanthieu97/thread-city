import {PropsWithChildren} from 'react'

interface Props extends PropsWithChildren {
  title?: string
  extra?: React.ReactNode
}

const Header = ({children, title, extra}: Props) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <header className='h-15 flex items-center justify-center sticky top-0 bg-background z-10'>
        <div className='absolute bottom-0 left-0 right-0 h-[0.5px] bg-gray-800'></div>
        <div className='absolute -left-3 -bottom-6 w-9 h-9 overflow-hidden after:content-[""] after:absolute after:left-3 after:top-3 after:border-[0.5px] after:border-gray-800 after:rounded-3xl after:w-12 after:h-12 after:shadow-custom'></div>
        <div className='absolute -right-3 -bottom-6 w-9 h-9 overflow-hidden after:content-[""] after:absolute after:right-3 after:top-3 after:border-[0.5px] after:border-gray-800 after:rounded-3xl after:w-12 after:h-12 after:shadow-custom'></div>
        <span className='font-semibold text-gray-50'>{title}</span>
        {extra}
      </header>
      <div className='flex-1 border-[0.5px] border-y-0 border-gray-800 bg-gray-900'>
        {children}
      </div>
    </div>
  )
}

export default Header
