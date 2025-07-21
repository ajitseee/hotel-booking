import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './navbar'

const Layout = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar />
      <main className=''>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
