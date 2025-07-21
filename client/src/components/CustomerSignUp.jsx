import React from 'react'
import { SignUp } from '@clerk/clerk-react'
import { assets } from '../assets/assets'

const CustomerSignUp = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex justify-center'>
          <img src={assets.logo} alt="Logo" className='h-12 w-auto' />
        </div>
        <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
          Join Our Community
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          Create your account to start booking amazing stays
        </p>
        
        {/* Hotel Owner Redirect Notice */}
        <div className='mt-4 bg-orange-50 border border-orange-200 rounded-lg p-3'>
          <div className='flex items-center text-center justify-center'>
            <svg className='h-4 w-4 text-orange-400 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
            </svg>
            <p className='text-xs text-orange-800'>
              Want to list your hotel? 
              <a href='/owner/sign-up' className='font-medium underline ml-1'>Register as Hotel Owner</a>
            </p>
          </div>
        </div>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10'>
          <SignUp 
            routing="path" 
            path="/customer/sign-up"
            redirectUrl="/"
            signInUrl="/customer/sign-in"
            appearance={{
              elements: {
                formButtonPrimary: 'bg-green-600 hover:bg-green-700',
                footerActionLink: 'text-green-600 hover:text-green-700',
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
                <span className='bg-white px-2 text-gray-500'>Already have an account?</span>
              </div>
            </div>
            
            <div className='mt-6'>
              <a
                href='/customer/sign-in'
                className='w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
              >
                Sign In to Your Account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerSignUp
