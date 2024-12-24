import Image from '@/components/image'
import LoginForm from './login-form'

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
    </div>
  )
}

export default Page
