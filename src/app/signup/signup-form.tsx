'use client'

import Button from '@/components/button'
import Input from '@/components/input'
import toast from '@/components/toast'
import axios from '@/utils/axios'
import {useForm} from 'react-hook-form'

interface LoginFormData {
  username: string
  password: string
  confirmPassword: string
}
const SignupForm = () => {
  const {register, handleSubmit, watch} = useForm<LoginFormData>()
  const {username, password} = watch()

  const onSubmit = async (data: LoginFormData) => {
    try {
      if (data.password !== data.confirmPassword) {
        toast.error('Passwords do not match')
        return
      }
      const response = await axios.post('/api/auth/signup', {
        username: data.username,
        password: data.password,
      })

      if (response.status === 200) {
        window.location.href = '/'
      }
    } catch (error) {
      console.log(error)
      toast.error(
        (error as ErrorResponse)?.data?.error || 'Something went wrong',
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-[370px] mx-auto'>
      <p className='text-base text-gray-50 font-bold text-center mb-4'>
        Sign up to Threads
      </p>
      <Input {...register('username')} placeholder='Username, phone or email' />
      <Input
        {...register('password')}
        placeholder='Password'
        className='mt-2'
        type='password'
      />
      <Input
        {...register('confirmPassword')}
        placeholder='Confirm Password'
        className='my-2'
        type='password'
      />
      <Button
        size='lg'
        type='submit'
        variant='secondary'
        fullWidth
        className='active:scale-[0.98]'
        disabled={!username || !password}
      >
        Sign up
      </Button>
    </form>
  )
}

export default SignupForm
