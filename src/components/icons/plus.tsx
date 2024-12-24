import Icon from './icon'

const Plus = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <Icon {...props} aria-label='Create' role='img' viewBox='0 0 12 12'>
      <title>Create</title>
      <path
        d='M6 2v8m4-4H2'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='1.5'
      ></path>
    </Icon>
  )
}

export default Plus
