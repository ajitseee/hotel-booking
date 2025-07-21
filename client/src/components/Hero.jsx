import React from 'react'
import heroImage from '../assets/heroImage.png'
import { assets } from '../assets/assets.js'

const Hero = () => {
  // Sample cities data since cities.js doesn't exist
  const cities = [
    "New York", "London", "Paris", "Tokyo", "Dubai", "Singapore", 
    "Los Angeles", "Sydney", "Mumbai", "Barcelona", "Rome", "Bangkok"
  ];
  return (
    <div className='flex flex-col items-start justify-center px-5 md:px-14 lg:px-20 xl:px-28 text-white bg-no-repeat bg-cover bg-center h-screen' 
         style={{backgroundImage: `url(${heroImage})`}}>
      <div className='flex items-center gap-2.5 bg-blue-600/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full mb-5'>
        <div className='w-1.5 h-1.5 bg-yellow-300 rounded-full'></div>
        <p className='text-sm md:text-base font-medium text-white'>The Ultimate Hotel Experience</p>
      </div>
      <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight font-playfair'>Discover your Perfect Gateway Destination</h1>
      <p className='text-sm md:text-base lg:text-lg max-w-xl leading-relaxed opacity-90 mb-5'>Unparalleled luxury and comfort await at the world's most exclusive hotels and resort. Start your journey today.</p>

 <form className='bg-white text-gray-500 rounded-lg px-5 py-3.5 flex flex-col md:flex-row max-md:items-start gap-3.5 max-md:mx-auto'>

            <div>
                <div className='flex items-center gap-1.5'>
                 <img src={assets.calenderIcon} alt="" className='h-3.5' />
                    <label htmlFor="destinationInput" className='text-sm font-medium'>Destination</label>
                </div>
                <input list='destinations' id="destinationInput" type="text" className="rounded border border-gray-200 px-2.5 py-1.5 mt-1 text-sm outline-none" placeholder="Type here" required />
                <datalist id='destinations'> 
                    {cities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                    ))}
                </datalist>
            </div>

            <div>
                <div className='flex items-center gap-1.5'>
                  <img src={assets.calenderIcon} alt="" className='h-3.5' />
                    <label htmlFor="checkIn" className='text-sm font-medium'>Check in</label>
                </div>
                <input id="checkIn" type="date" className="rounded border border-gray-200 px-2.5 py-1.5 mt-1 text-sm outline-none" />
            </div>

            <div>
                <div className='flex items-center gap-2'>
                    <svg className="w-4 h-4 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 10h16M8 14h8m-4-7V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
                    </svg>
                    <label htmlFor="checkOut">Check out</label>
                </div>
                <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                <label htmlFor="guests">Guests</label>
                <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
            </div>

            <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
               <img src={assets.searchIcon} alt="searchIcon" className='h-7' />
                <span>Search</span>
            </button>
        </form>
    </div>
  )
}

export default Hero
