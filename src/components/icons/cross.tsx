import Icon from './icon'

const Cross = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <Icon {...props} aria-label='Remove' role='img' viewBox='0 0 24 24'>
      <title>Remove</title>
      <polyline points='20.643 3.357 12 12 3.353 20.647'></polyline>
      <line x1='20.649' x2='3.354' y1='20.649' y2='3.354'></line>
    </Icon>
  )
}

export default Cross
