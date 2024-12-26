import AddPost from '@/components/add-post'
import getProfile from '@/utils/server/get-profile'
import {notFound} from 'next/navigation'

interface Props {
  params: Promise<{
    slug: string
  }>
}

const Page = async ({params}: Props) => {
  const {slug} = await params
  const profile = await getProfile(slug)
  if (!profile) {
    return notFound()
  }
  return <AddPost />
}

export default Page
