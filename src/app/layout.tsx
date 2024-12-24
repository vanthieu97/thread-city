import {Heart, Home, Plus, Search, User} from '@/components/icons'
import Sidebar from '@/components/sidebar'
import type {Metadata} from 'next'
import {headers} from 'next/headers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Thờ rét city',
  description: 'Instagram clone built with Next.js',
}

const icons = [
  {
    name: 'home',
    icon: Home,
  },
  {
    name: 'search',
    icon: Search,
  },
  {
    name: 'plus',
    icon: Plus,
  },
  {
    name: 'heart',
    icon: Heart,
  },
  {
    name: 'user',
    icon: User,
  },
]

interface Props {
  children: React.ReactNode
}

export default async function RootLayout({children}: Props) {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || '/'
  return (
    <html lang='en'>
      <body className='antialiased'>
        <Sidebar pathname={pathname} />
        <main className='w-full max-w-[640px] mx-auto'>{children}</main>
      </body>
    </html>
  )
}
