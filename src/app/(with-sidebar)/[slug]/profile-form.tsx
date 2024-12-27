import Button from '@/components/button'
import Lock from '@/components/icons/lock'
import Image from '@/components/image'
import Input from '@/components/input'
import toast from '@/components/toast'
import {useForm} from 'react-hook-form'

const ProfileField = ({
  label,
  children,
  className,
}: {
  label: string
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={`border-b-[0.5px] border-gray-25 pt-4 pb-3.5 flex flex-col gap-1 ${className}`}
    >
      <span className='text-gray-50 font-semibold'>{label}</span>
      {children}
    </div>
  )
}

interface Props {
  profile: Profile
  onSubmit: (data: Profile) => void
  isPending: boolean
}

const ProfileForm = ({profile, onSubmit, isPending}: Props) => {
  const {register, handleSubmit, watch, setValue} = useForm<Profile>({
    defaultValues: {
      name: profile.name,
      username: profile.username,
      bio: profile.bio,
      link: profile.link,
      avatar: profile.avatar,
    },
  })
  const avatar = watch('avatar')
  const username = watch('username')

  const onFinish = (data: Profile) => {
    if (data.link && !data.link.startsWith('http')) {
      toast.error('Link must start with http or https')
      return
    }
    onSubmit(data)
  }

  const onSelectAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const base64 = reader.result as string
      setValue('avatar', base64)
    }
  }

  return (
    <form onSubmit={handleSubmit(onFinish)} className='p-6'>
      <div className='flex gap-4'>
        <ProfileField label='Username' className='flex-1 !pt-0'>
          <div className='flex gap-1 items-center'>
            <Lock width={14} height={14} className='fill-gray-50' />
            {username}
          </div>
        </ProfileField>
        <div className='relative'>
          <Image
            src={avatar}
            alt={username}
            width={52}
            height={52}
            className='rounded-full bg-gray-900 w-13 h-13'
          />
          <input
            type='file'
            accept='image/*'
            className='absolute inset-0 opacity-0'
            onChange={onSelectAvatar}
          />
        </div>
      </div>
      <ProfileField label='Name'>
        <Input
          {...register('name')}
          placeholder='+ Add name'
          className='!p-0 border-none focus:border-none rounded-none focus:ring-0'
        />
      </ProfileField>
      <ProfileField label='Bio'>
        <Input
          {...register('bio')}
          placeholder='+ Add bio'
          className='!p-0 border-none focus:border-none rounded-none focus:ring-0'
        />
      </ProfileField>
      <ProfileField label='Link' className='border-none'>
        <Input
          {...register('link')}
          placeholder='+ Add link'
          className='!p-0 border-none focus:border-none rounded-none focus:ring-0 !text-blue-400'
        />
      </ProfileField>
      <Button
        type='submit'
        variant='secondary'
        fullWidth
        size='lg'
        className='mt-8 h-13'
        disabled={isPending}
        isLoading={isPending}
        loadingText='Updating...'
      >
        Done
      </Button>
    </form>
  )
}

export default ProfileForm
