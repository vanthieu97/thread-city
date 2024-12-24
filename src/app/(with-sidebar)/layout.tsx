import Sidebar from '@/components/sidebar'
import {LayoutProvider} from '../../modules/layout-context'
import getProfile from '@/utils/server/get-profile'

interface Props {
  children: React.ReactNode
}

const Layout = async ({children}: Props) => {
  const userInfo = await getProfile()

  return (
    <LayoutProvider userInfo={userInfo}>
      <Sidebar />
      <main className='w-full max-w-[640px] mx-auto'>{children}</main>
    </LayoutProvider>
  )
}

export default Layout
