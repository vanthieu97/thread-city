import Icon from './icon'

const ArrowBottom = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <Icon {...props} aria-label='More' role='img' viewBox='0 0 13 12'>
      <path d='m2.5 4.2 4 4 4-4' />
    </Icon>
  )
}

export default ArrowBottom
