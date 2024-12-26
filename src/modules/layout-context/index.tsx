'use client'

import {createContext, useContext, ReactNode, useState} from 'react'

interface LayoutContextType {
  userInfo: Profile | null
  setUserInfo: (userInfo: Profile | null) => void
}

interface LayoutProviderProps extends LayoutContextType {
  children: ReactNode
}

export const LayoutContext = createContext<LayoutContextType | undefined>(
  undefined,
)

export const LayoutProvider = ({
  userInfo: initialUserInfo,
  children,
}: LayoutProviderProps) => {
  const [userInfo, setUserInfo] = useState(initialUserInfo)

  return (
    <LayoutContext.Provider value={{userInfo, setUserInfo}}>
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
