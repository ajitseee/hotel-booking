import React from 'react'
import { assets } from '../assets/assets'

const NewsLetter = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 py-12">
       <div className="relative flex flex-col items-center w-full max-w-2xl rounded-2xl px-6 py-10 md:py-12 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white shadow-2xl overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-75"></div>
            
            <div className="relative z-10 flex flex-col justify-center items-center text-center">
                <div className="mb-3 p-3 bg-white/10 rounded-full backdrop-blur-sm">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                </div>
                <h1 className="text-2xl md:text-3xl font-playfair font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">Exclusive Hotel Deals</h1>
                <p className="text-sm md:text-base text-gray-200 mt-1 max-w-lg leading-relaxed">Subscribe to get first access to luxury hotel deals, room upgrades, and exclusive member rates.</p>
            </div>
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 w-full max-w-md">
                <input 
                    type="email" 
                    className="bg-white/10 backdrop-blur-sm px-4 py-3 border border-white/30 rounded-full outline-none w-full text-white placeholder-gray-300 focus:border-white/60 focus:bg-white/20 focus:shadow-lg transition-all duration-300 text-sm" 
                    placeholder="Enter your email for deals" 
                />
                <button className="flex items-center justify-center gap-2 group bg-gradient-to-r from-white to-gray-100 text-gray-900 px-6 py-3 rounded-full font-medium hover:from-gray-100 hover:to-white hover:shadow-lg active:scale-95 transition-all duration-300 whitespace-nowrap text-sm">
                    Get Deals
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                </button>
            </div>
            <p className="relative z-10 text-gray-300 mt-4 text-xs text-center max-w-xs">🏨 Get exclusive member rates and complimentary upgrades. Unsubscribe anytime.</p>
        </div>
    </div>
  )
}

export default NewsLetter
