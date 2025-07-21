import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets.js'

const HotelCard = ({room, index}) => {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg bg-white">
      <Link to={`/rooms/${room._id}`} onClick={() => scrollTo(0,0)} key={room._id}>
        <img src={room.images[0]} alt="" className='w-full h-48 object-cover rounded-t-lg' />
        {index % 2 === 0 && <p className='px-3 py-1 absolute top-3 left-3 bg-white text-gray-800 rounded-full text-xs font-medium'>Best Seller</p>}

        <div className='p-4'>
            <div className='flex items-center justify-between mb-2'>
                <p className='font-playfair text-xl font-medium text-gray-800'>{room.hotel.name}</p>
                <div className='flex items-center gap-1'>
                    <img src={assets.starIconFilled} alt="star-icon" className='w-4 h-4' /> 
                    <span className='text-sm text-gray-600'>4.5</span>
                </div>
            </div>
            
            <div className='flex items-center gap-1 text-sm text-gray-600 mb-3'>
                <img src={assets.locationIcon} alt="location-icon" className='w-4 h-4' />
                <span>{room.hotel.address}</span>
            </div>
            
            <div className='flex items-center justify-between'>
                <p><span className='text-xl font-semibold text-gray-800'>${room.pricePerNight}</span>/night</p>
                <button className='px-4 py-2 text-sm font-medium border border-gray-300 rounded hover:bg-gray-50 transition-all cursor-pointer'>Book Now</button>
            </div>
        </div>
      </Link>
    </div>
  )
}

export default HotelCard
