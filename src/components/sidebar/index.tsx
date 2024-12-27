'use client'

import {useLayoutContext} from '@/modules/layout-context'
import {
  Home,
  Search,
  Plus,
  Heart,
  User,
  Logo,
  Menu,
  Pin,
} from '@/components/icons'
import cn from '@/utils/cn'
import {usePathname, useRouter} from 'next/navigation'
import Link from 'next/link'
const icons = [
  {
    name: 'home',
    path: '/',
    icon: Home,
  },
  {
    name: 'search',
    path: '/search',
    icon: Search,
  },
  {
    name: 'plus',
    icon: Plus,
    path: '/add-post',
  },
  {
    name: 'heart',
    path: '/heart',
    icon: Heart,
    size: 30,
  },
  {
    name: 'user',
    path: '/user',
    icon: User,
  },
]

const wrapClassName =
  'cursor-pointer flex items-center justify-center transition-all duration-300 active:scale-90'

const Sidebar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const {userInfo, setShowPostModal} = useLayoutContext()

  const onClick = (path: string) => {
    switch (path) {
      case '/user':
        if (userInfo) {
          router.push(`/@${userInfo.username}`)
        } else {
          router.push('/login')
        }
        break
      case '/add-post':
        setShowPostModal(true)
        break
      default:
        router.push(path)
        break
    }
  }
  return (
    <aside className='w-[76px] fixed top-0 left-0 h-screen flex flex-col items-center'>
      <div className='py-4 mx-auto w-fit'>
        <Link href='/'>
          <Logo className='fill-gray-50' width={34} height={34} />
        </Link>
      </div>
      <div className='w-15 flex-1 flex flex-col gap-4 justify-center'>
        {icons.map(({name, icon: Icon, path, size}) => {
          const isActive =
            pathname === path || (path === '/user' && pathname.startsWith('/@'))
          return (
            <div
              key={name}
              className={cn(
                wrapClassName,
                'w-15 h-12 hover:bg-white/5  rounded-xl ',
                {
                  'fill-gray-50 text-gray-50': isActive,
                  'fill-transparent text-gray-600': !isActive,
                  'bg-white/5 hover:fill-gray-50 hover:text-gray-50 text-gray-500':
                    path === '/add-post',
                },
              )}
              onClick={() => onClick(path)}
            >
              <Icon width={size || 24} height={size || 24} />
            </div>
          )
        })}
      </div>
      <div className='mb-5'>
        <div
          className={cn(
            wrapClassName,
            'w-14 h-14 fill-gray-600 hover:fill-gray-50',
          )}
        >
          <Pin width={26} height={26} />
        </div>
        <div
          className={cn(
            wrapClassName,
            'w-14 h-14 fill-gray-600 hover:fill-gray-50',
          )}
        >
          <Menu width={24} height={24} />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
