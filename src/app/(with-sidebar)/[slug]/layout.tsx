import Header from '@/components/header'
import UserProfile from './user-profile'
import {headers} from 'next/headers'
import getProfile from '@/utils/server/get-profile'
import {notFound} from 'next/navigation'
import Link from 'next/link'
import cn from '@/utils/cn'

const ProfileLayout = async ({children}: {children: React.ReactNode}) => {
  const pathname = (await headers()).get('x-pathname') as string
  const profile = await getProfile(pathname.split('/')[1])
  if (!profile) {
    return notFound()
  }

  const tabs = [
    {
      label: 'Threads',
      url: pathname,
    },
    {
      label: 'Replies',
      url: `${pathname}/replies`,
    },
    {
      label: 'Reposts',
      url: `${pathname}/reposts`,
    },
  ]

  return (
    <Header title='Profile'>
      <UserProfile profile={profile} />
      <div className='flex'>
        {tabs.map((tab) => (
          <Link
            key={tab.url}
            href={tab.url}
            className={cn(
              'flex-1 h-12 border-b border-gray-25 flex items-center justify-center font-semibold text-gray-500',
              {
                'border-b-gray-50 text-gray-50': pathname === tab.url,
              },
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      {children}
    </Header>
  )
}

export default ProfileLayout
