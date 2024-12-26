import Image from '@/components/image'
import SignupForm from './signup-form'
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
      <SignupForm />
      <p className='text-gray-500 text-sm text-center mt-4'>
        Already have an account?{' '}
        <Link href='/login' className='text-blue-400 hover:underline'>
          Log in
        </Link>
      </p>
    </div>
  )
}

export default Page
