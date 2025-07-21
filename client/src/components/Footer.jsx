import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
       <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-12 w-full text-gray-500 bg-gray-50">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-8">
                <div className="md:max-w-96">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-blue-600 rounded-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-playfair font-bold text-gray-800">QuickStay</h1>
                            <p className="text-xs text-blue-600 font-medium">Luxury Hotel Bookings</p>
                        </div>
                    </div>
                    <p className="mt-6 text-sm leading-relaxed">
                        QuickStay offers luxury hotel bookings worldwide with exclusive deals, premium amenities, and exceptional service. 
                        Experience comfort and elegance at the world's finest destinations.
                    </p>
                    <div className="flex items-center gap-4 mt-6">
                        <div className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors cursor-pointer group">
                            <img src={assets.facebookIcon} alt="Facebook" className="w-4 h-4 group-hover:opacity-80" />
                        </div>
                        <div className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors cursor-pointer group">
                            <img src={assets.twitterIcon} alt="Twitter" className="w-4 h-4 group-hover:opacity-80" />
                        </div>
                        <div className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors cursor-pointer group">
                            <img src={assets.instagramIcon} alt="Instagram" className="w-4 h-4 group-hover:opacity-80" />
                        </div>
                        <div className="p-2 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors cursor-pointer group">
                            <img src={assets.linkendinIcon} alt="LinkedIn" className="w-4 h-4 group-hover:opacity-80" />
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-16">
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Quick Links</h2>
                        <ul className="text-sm space-y-3">
                            <li><a href="#" className="hover:text-gray-800 transition-colors">Hotels</a></li>
                            <li><a href="#" className="hover:text-gray-800 transition-colors">Destinations</a></li>
                            <li><a href="#" className="hover:text-gray-800 transition-colors">Special Offers</a></li>
                            <li><a href="#" className="hover:text-gray-800 transition-colors">My Bookings</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-5 text-gray-800">Support</h2>
                        <ul className="text-sm space-y-3">
                            <li><a href="#" className="hover:text-gray-800 transition-colors">Contact Us</a></li>
                            <li><a href="#" className="hover:text-gray-800 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-gray-800 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-gray-800 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-800 mb-5">Exclusive Deals</h2>
                        <div className="text-sm space-y-2">
                            <p>Get exclusive hotel deals and member-only rates delivered to your inbox.</p>
                            <div className="flex items-center gap-2 pt-4">
                                <input className="border border-gray-300 placeholder-gray-400 focus:ring-2 ring-blue-500 outline-none w-full max-w-64 h-10 rounded-lg px-3 focus:border-blue-500 transition-colors" type="email" placeholder="Enter your email" />
                                <button className="bg-blue-600 hover:bg-blue-700 w-24 h-10 text-white rounded-lg font-medium transition-colors">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-6 text-center text-xs md:text-sm pb-6">
                Copyright 2025 © QuickStay. All Rights Reserved. | Luxury Hotel Bookings Worldwide
            </p>
        </footer>
    </div>
  )
}

export default Footer
