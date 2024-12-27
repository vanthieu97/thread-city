import Sidebar from '@/components/sidebar'
import {LayoutProvider} from '../../modules/layout-context'
import getProfile from '@/utils/server/get-profile'
import PostModal from '@/modules/post-modal'

interface Props {
  children: React.ReactNode
}

const Layout = async ({children}: Props) => {
  const userInfo = await getProfile()

  return (
    <LayoutProvider userInfo={userInfo}>
      <Sidebar />
      <main className='w-full max-w-screen-sm mx-auto'>{children}</main>
      <PostModal />
    </LayoutProvider>
  )
}

export default Layout
