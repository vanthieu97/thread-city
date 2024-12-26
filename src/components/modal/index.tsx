import {cva, type VariantProps} from 'class-variance-authority'
import {useEffect, useRef, useState} from 'react'

const modalStyles = cva(
  'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-1000 rounded-lg border-[0.5px] border-gray-800 z-50 mx-auto',
  {
    variants: {
      fullWidth: {
        true: 'w-[calc(100%-2rem)]',
        false: 'w-full',
      },
      maxWidth: {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
      },
    },
    defaultVariants: {
      fullWidth: false,
      maxWidth: 'md',
    },
  },
)

interface ModalProps extends VariantProps<typeof modalStyles> {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  fullWidth,
  maxWidth,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [showModal, setShowModal] = useState(isOpen)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [onClose])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setShowModal(true)
      }, 300)
    } else {
      setShowModal(false)
    }
  }, [isOpen])

  return (
    <>
      <div
        className={`fixed inset-0 bg-black ${
          isOpen ? 'bg-opacity-70' : 'bg-opacity-0 pointer-events-none'
        } z-40 transition-colors duration-300`}
      />
      {showModal && (
        <div ref={modalRef} className={modalStyles({fullWidth, maxWidth})}>
          {title && (
            <div className='flex items-center justify-between p-6 border-b'>
              <h2 className='text-xl font-semibold'>{title}</h2>
              <button
                onClick={onClose}
                className='p-1 hover:bg-gray-100 rounded-full transition-colors'
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>
          )}
          <div className='p-6 max-h-[calc(100vh-10rem)] overflow-y-auto'>
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
