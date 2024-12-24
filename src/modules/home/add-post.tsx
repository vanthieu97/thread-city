import Button from '@/components/button'
import Image from '@/components/image'
import RichTextarea from '@/components/rich-text-area'

const AddPost = () => {
  return (
    <div className='p-6 pb-4 flex gap-2.5 items-center border-b-[0.5px] border-gray-800'>
      <Image
        src='https://scontent.cdninstagram.com/v/t51.2885-19/471300433_1093045105458137_8843050375836606606_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=105&ccb=1-7&_nc_sid=07cfa3&_nc_ohc=h_KgePLdXU8Q7kNvgGSYQP1&_nc_oc=AdjmrXM18jZIKVpJpHWRoTl3A93zTgAgJp-nbUo44xxDyHhGHnwRoixT2vKjBlJ-1Y3QfFGwl57rR4ozbN35ZD5I&_nc_zt=24&_nc_ht=scontent.cdninstagram.com&oh=00_AYBArgRnaB6xfku4bHuIu4UFmkZcsZCvM4kgcR6xk1MEvw&oe=67704294'
        alt='avatar'
        width={36}
        height={36}
        className='rounded-full'
      />
      <RichTextarea placeholder="What's new?" className='flex-1' />
      <Button variant='outline'>Post</Button>
    </div>
  )
}

export default AddPost
