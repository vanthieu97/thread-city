import AddPost from '@/modules/add-post'
import Header from '@/components/header'
import GetPosts from '../get-posts'
import getPosts from '@/utils/server/get-posts'

const Home = async () => {
  const posts = await getPosts({page: 0, pageSize: 10})

  return (
    <Header title='For you'>
      <div className='pt-2'>
        <AddPost />
      </div>
      <GetPosts initialPosts={posts} />
    </Header>
  )
}

export default Home
