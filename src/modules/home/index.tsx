import AddPost from '@/components/add-post'
import Header from '@/components/header'

const Home = () => {
  return (
    <Header title='For you'>
      <div className='pt-2'>
        <AddPost />
      </div>
    </Header>
  )
}

export default Home
