import AddPost from '@/modules/add-post'
import GetPosts from '@/modules/get-posts'
import getPosts from '@/utils/server/get-posts'
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
  const posts = await getPosts({page: 0, pageSize: 10})

  return (
    <>
      <AddPost />
      <GetPosts initialPosts={posts} />
    </>
  )
}

export default Page
