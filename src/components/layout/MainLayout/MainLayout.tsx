import React from 'react'
import Header from '../../features/Header/Header'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      {/* <Header /> */}
      {children}
      {/* <div>footer</div> */}
    </>
  )
}
