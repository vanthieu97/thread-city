'use client'

import {createContext, useContext, ReactNode} from 'react'

interface LayoutContextType {
  userInfo: Profile | null
}

interface LayoutProviderProps extends LayoutContextType {
  children: ReactNode
}

export const LayoutContext = createContext<LayoutContextType | undefined>(
  undefined,
)

export const LayoutProvider = ({userInfo, children}: LayoutProviderProps) => {
  return (
    <LayoutContext.Provider value={{userInfo}}>
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
