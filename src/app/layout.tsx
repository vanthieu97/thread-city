import type {Metadata} from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Thờ rét city',
  description: 'Instagram clone built with Next.js',
}

interface Props {
  children: React.ReactNode
}

const RootLayout = ({children}: Props) => {
  return (
    <html lang='en'>
      <body className='antialiased'>{children}</body>
    </html>
  )
}

export default RootLayout
