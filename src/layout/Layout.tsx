import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col min-h-screen bg-blue-400'>
      <Header/>
      <Hero/>
      <div className='flex-1 py-6'>
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout
