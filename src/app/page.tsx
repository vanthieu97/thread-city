export default function Home() {
  return (
    <div className='min-h-screen flex flex-col'>
      <header className='h-15 flex items-center justify-center sticky top-0 bg-background z-10'>
        <div className='absolute -left-3 -bottom-6 w-9 h-9 overflow-hidden after:content-[""] after:absolute after:left-3 after:top-3 after:border-[0.5px] after:border-gray-800 after:rounded-3xl after:w-12 after:h-12 after:shadow-custom'></div>
        <div className='absolute -right-3 -bottom-6 w-9 h-9 overflow-hidden after:content-[""] after:absolute after:right-3 after:top-3 after:border-[0.5px] after:border-gray-800 after:rounded-3xl after:w-12 after:h-12 after:shadow-custom'></div>
        <span className='font-semibold text-gray-50'>For you</span>
      </header>
      <div className='flex-1 border-[0.5px] border-b-0 border-gray-800 bg-gray-900'></div>
    </div>
  )
}
