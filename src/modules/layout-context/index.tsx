'use client'

import {createContext, useContext, ReactNode, useState} from 'react'

interface LayoutContextType {
  userInfo: Profile | null
  setUserInfo: (userInfo: Profile | null) => void
  showPostModal: boolean
  setShowPostModal: (showPostModal: boolean) => void
}

interface LayoutProviderProps {
  children: ReactNode
  userInfo: Profile | null
}

export const LayoutContext = createContext<LayoutContextType | undefined>(
  undefined,
)

export const LayoutProvider = ({
  userInfo: initialUserInfo,
  children,
}: LayoutProviderProps) => {
  const [userInfo, setUserInfo] = useState(initialUserInfo)
  const [showPostModal, setShowPostModal] = useState(false)
  return (
    <LayoutContext.Provider
      value={{userInfo, setUserInfo, showPostModal, setShowPostModal}}
    >
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayoutContext() {
  const context = useContext(LayoutContext)
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider')
  }
  return context
}
