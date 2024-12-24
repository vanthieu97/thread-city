// <svg aria-label="More" role="img" viewBox="0 0 24 24" class="x1lliihq x2lah0s x1f5funs x1n2onr6 x1bl4301 x1yxark7 x117rol3" style="--fill: currentColor; --height: 24px; --width: 24px;"><title>More</title><rect class="x1fwsm1s x1kl0l3y" rx="1.25" x="3" y="7"></rect><rect class="x1fwsm1s x6jxa94" rx="1.25" x="3" y="15"></rect></svg>

import {SVGProps} from 'react'
import Icon from './icon'

const Menu = (props: SVGProps<SVGSVGElement>) => {
  return (
    <Icon {...props} aria-label='More' role='img' viewBox='0 0 24 24'>
      <title>More</title>
      <rect rx='1.25' x='3' y='7' width={21} height={2.5}></rect>
      <rect rx='1.25' x='3' y='15' width={14} height={2.5}></rect>
    </Icon>
  )
}

export default Menu
