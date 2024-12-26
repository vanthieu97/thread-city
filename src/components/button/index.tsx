import {ButtonHTMLAttributes, forwardRef} from 'react'
import {VariantProps, cva} from 'class-variance-authority'
import cn from '@/utils/cn'
import {Loader2} from 'lucide-react'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none font-semibold active:scale-95 transition-transform duration-300',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        // destructive:
        //   'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border hover:text-gray-50 border-gray-25 disabled:opacity-50',
        secondary: 'bg-gray-50 text-gray-950 disabled:text-gray-400',
        // ghost: 'hover:bg-accent hover:text-accent-foreground',
        // link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 text-sm',
        lg: 'h-14 px-6',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fullWidth: false,
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  loadingText?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      children,
      fullWidth,
      loadingText,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cn(buttonVariants({variant, size, className, fullWidth}))}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin rounded' />
            {loadingText || 'Please wait'}
          </>
        ) : (
          children
        )}
      </button>
    )
  },
)
Button.displayName = 'Button'

export {buttonVariants}
export default Button
