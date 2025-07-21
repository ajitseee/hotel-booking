import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { assets } from '../../assets/assets'
import { useClerk, useUser, UserButton } from '@clerk/clerk-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useUser()
  const { signOut } = useClerk()

  const ownerNavLinks = [
    { name: 'Dashboard', path: '/owner/dashboard', icon: assets.dashboardIcon },
    { name: 'My Hotels', path: '/owner/hotels', icon: assets.homeIcon },
    { name: 'Bookings', path: '/owner/bookings', icon: assets.totalBookingIcon },
    { name: 'Revenue', path: '/owner/revenue', icon: assets.totalRevenueIcon },
    { name: 'Add Hotel', path: '/owner/add-hotel', icon: assets.addIcon },
  ]

  const isActive = (path) => {
    return location.pathname === path
  }

  const handleSignOut = () => {
    signOut()
    navigate('/')
  }

  return (
    <nav className='bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          
          {/* Logo & Brand */}
          <div className='flex items-center'>
            <Link to='/owner/dashboard' className='flex items-center space-x-3'>
              <img src={assets.logo} alt="Logo" className='h-8 w-auto' />
              <div className='hidden sm:block'>
                <h1 className='text-xl font-bold text-gray-900'>Hotel Owner</h1>
                <p className='text-xs text-gray-500'>Dashboard</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-1'>
            {ownerNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <img src={link.icon} alt={link.name} className='w-4 h-4 mr-2' />
                {link.name}
              </Link>
            ))}
            
            {/* Separator */}
            <div className='border-l border-gray-300 h-6 mx-2'></div>
            
            {/* Book Rooms Button for Customers */}
            <Link
              to='/'
              className='flex items-center px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 border border-green-600'
            >
              <svg className='w-4 h-4 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
              </svg>
              Book Rooms
            </Link>
          </div>

          {/* Right Side - User Menu */}
          <div className='hidden md:flex items-center space-x-4'>
            {/* Notifications */}
            <button className='relative p-2 text-gray-400 hover:text-gray-600 transition-colors'>
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M15 17h5l-3.5-3.5L15 17zM10.5 3.5a6.5 6.5 0 1 0 6.5 6.5M21 21l-6-6' />
              </svg>
              <span className='absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full'></span>
            </button>

            {/* User Profile */}
            {user ? (
              <div className='flex items-center space-x-3'>
                <div className='text-right hidden sm:block'>
                  <p className='text-sm font-medium text-gray-900'>{user.firstName} {user.lastName}</p>
                  <p className='text-xs text-gray-500'>Hotel Owner</p>
                </div>
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action 
                      label="🏨 Book Rooms (Customer Site)" 
                      onClick={() => navigate('/')}
                    />
                    <UserButton.Action 
                      label="📊 Hotel Owner Dashboard" 
                      onClick={() => navigate('/owner/dashboard')}
                    />
                    <UserButton.Action 
                      label="🚪 Sign Out" 
                      onClick={handleSignOut}
                    />
                  </UserButton.MenuItems>
                </UserButton>
              </div>
            ) : (
              <button 
                onClick={() => navigate('/owner/sign-in')}
                className='bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors'
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden flex items-center space-x-2'>
            {user && (
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action 
                    label="🏨 Book Rooms (Customer Site)" 
                    onClick={() => navigate('/')}
                  />
                  <UserButton.Action 
                    label="📊 Hotel Owner Dashboard" 
                    onClick={() => navigate('/owner/dashboard')}
                  />
                  <UserButton.Action 
                    label="🚪 Sign Out" 
                    onClick={handleSignOut}
                  />
                </UserButton.MenuItems>
              </UserButton>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 p-2'
            >
              <img 
                src={isMenuOpen ? assets.closeIcon : assets.menuIcon} 
                alt="Menu" 
                className='h-6 w-6' 
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className='px-2 pt-2 pb-3 space-y-1 bg-gray-50 border-t border-gray-200'>
            {ownerNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <img src={link.icon} alt={link.name} className='w-5 h-5 mr-3' />
                {link.name}
              </Link>
            ))}
            
            {/* Book Rooms Button for Mobile */}
            <Link
              to='/'
              onClick={() => setIsMenuOpen(false)}
              className='flex items-center px-3 py-2 rounded-md text-base font-medium bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 mt-2'
            >
              <svg className='w-5 h-5 mr-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
              </svg>
              Book Rooms - Customer Site
            </Link>
            
            {/* Mobile-only quick actions */}
            <div className='border-t border-gray-300 pt-3 mt-3'>
              <button 
                onClick={() => {
                  navigate('/')
                  setIsMenuOpen(false)
                }}
                className='w-full text-left flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              >
                <svg className='w-5 h-5 mr-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M10 19l-7-7m0 0l7-7m-7 7h18' />
                </svg>
                Customer Booking Site
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
