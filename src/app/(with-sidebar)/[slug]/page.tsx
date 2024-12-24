import Header from '@/components/header'
import getProfile from '@/utils/server/get-profile'
import UserProfile from './user-profile'
import {notFound} from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}

const Page = async ({params}: Props) => {
  const {slug} = await params
  const profile = await getProfile(slug)
  if (!profile) {
    return notFound()
  }
  return (
    <Header title='Profile'>
      <UserProfile profile={profile} />
    </Header>
  )
}

export default Page
