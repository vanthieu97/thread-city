import Image from '@/components/image'
import LoginForm from './login-form'
import Link from 'next/link'

const Page = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='fixed w-full h-full -z-10'>
        <Image
          src='https://static.cdninstagram.com/rsrc.php/yC/r/jxB9GUOHTf2.webp'
          alt='logo'
          fill
          className='object-contain object-top'
        />
      </div>
      <LoginForm />
      <p className='text-gray-500 text-sm text-center mt-4'>
        You don&apos;t have an account?{' '}
        <Link href='/signup' className='text-blue-400 hover:underline'>
          Sign up
        </Link>
      </p>
    </div>
  )
}

export default Page
