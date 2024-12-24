import {twMerge} from 'tailwind-merge'
import clsx, {ClassValue} from 'clsx'

const cn = (...classes: ClassValue[]) => twMerge(clsx(...classes))

export default cn
