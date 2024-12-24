import {cva, type VariantProps} from 'class-variance-authority'
import {useEffect, useState} from 'react'
import ReactDOM from 'react-dom/client'

const toastVariants = cva(
  [
    'fixed top-4 right-4',
    'p-4 rounded-lg shadow-lg',
    'animate-slide-in',
    'z-50',
    'transition-all duration-300',
  ],
  {
    variants: {
      variant: {
        default: 'bg-gray-800 text-white',
        success: 'bg-green-600 text-white',
        error: 'bg-red-600 text-white',
        info: 'bg-blue-600 text-white',
      },
      hiding: {
        true: 'animate-slide-out',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

interface ToastProps extends VariantProps<typeof toastVariants> {
  message: string
  duration?: number
}

const slideOutAnimationTimeout = 300

const ToastComponent = ({message, duration = 3000, variant}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isHiding, setIsHiding] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHiding(true)
      setTimeout(() => {
        setIsVisible(true)
      }, slideOutAnimationTimeout)
    }, duration - slideOutAnimationTimeout)

    return () => clearTimeout(timer)
  }, [duration])

  if (!isVisible) return null

  return (
    <div className={toastVariants({variant, hiding: isHiding})}>{message}</div>
  )
}

const createToastContainer = () => {
  const container = document.createElement('div')
  container.id = 'toast-container'
  document.body.appendChild(container)
  return container
}

const renderToast = (element: React.ReactElement) => {
  const container =
    document.getElementById('toast-container') || createToastContainer()
  const root = ReactDOM.createRoot(container)
  root.render(element)

  setTimeout(() => {
    root.unmount()
    if (container.childNodes.length === 0) {
      container.remove()
    }
  }, 3000)
}

const toast = {
  success: (message: string) => {
    renderToast(<ToastComponent message={message} variant='success' />)
  },
  error: (message: string) => {
    renderToast(<ToastComponent message={message} variant='error' />)
  },
  info: (message: string) => {
    renderToast(<ToastComponent message={message} variant='info' />)
  },
}

export default toast
