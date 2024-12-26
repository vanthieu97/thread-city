'use client'

import Button from '@/components/button'
import Input from '@/components/input'
import toast from '@/components/toast'
import axios from '@/utils/axios'
import {useForm} from 'react-hook-form'

interface LoginFormData {
  username: string
  password: string
}

const LoginForm = () => {
  const {register, handleSubmit, watch} = useForm<LoginFormData>()
  const {username, password} = watch()

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post('/api/auth/login', {
        username: data.username,
        password: data.password,
      })

      if (response.status === 200) {
        window.location.href = '/'
      }
    } catch (error) {
      toast.error('Username or password is incorrect')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-[370px] mx-auto'>
      <p className='text-md text-gray-50 font-bold text-center mb-4'>
        Log in with your Instagram account
      </p>
      <Input
        {...register('username')}
        placeholder='Username, phone or email'
        className='bg-gray-950'
      />
      <Input
        {...register('password')}
        placeholder='Password'
        className='my-2 bg-gray-950'
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
        Login
      </Button>
    </form>
  )
}

export default LoginForm
