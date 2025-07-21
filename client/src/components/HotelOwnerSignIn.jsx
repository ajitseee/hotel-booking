import React from 'react'
import { SignIn } from '@clerk/clerk-react'
import { assets } from '../assets/assets'

const HotelOwnerSignIn = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex justify-center'>
          <img src={assets.logo} alt="Logo" className='h-12 w-auto' />
        </div>
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
          Hotel Owner Access
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Sign in to manage your hotels and bookings
        </p>
        
        {/* Customer Redirect Notice */}
        <div className='mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3'>
          <div className='flex items-center text-center justify-center'>
            <svg className='h-4 w-4 text-blue-400 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
            <p className='text-xs text-blue-800'>
              Looking to book a room? 
              <a href='/' className='font-medium underline ml-1'>Go to Customer Site</a>
            </p>
          </div>
        </div>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10'>
          <SignIn 
            routing="path" 
            path="/owner/sign-in"
            redirectUrl="/owner/dashboard"
            signUpUrl="/owner/sign-up"
            appearance={{
              elements: {
                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
                footerActionLink: 'text-blue-600 hover:text-blue-700',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden'
              }
            }}
          />
          
          <div className='mt-6'>
            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-gray-300' />
              </div>
              <div className='relative flex justify-center text-sm'>
                <span className='bg-white px-2 text-gray-500'>New hotel owner?</span>
              </div>
            </div>
            
            <div className='mt-6'>
              <a
                href='/owner/sign-up'
                className='w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
              >
                Register Your Hotel
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelOwnerSignIn
