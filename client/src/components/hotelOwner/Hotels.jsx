import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Hotels = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  // Using Ajit Singh's hotel data
  const hotels = [
    {
      id: 1,
      name: 'Urbanza Suites',
      location: 'Delhi, India',
      image: assets.roomImg1,
      rooms: 25,
      price: 299,
      rating: 4.8,
      status: 'Active',
      bookings: 15,
      revenue: 4485
    },
    {
      id: 2,
      name: 'Singh Palace Hotel',
      location: 'Mumbai, India',
      image: assets.roomImg2,
      rooms: 30,
      price: 399,
      rating: 4.9,
      status: 'Active',
      bookings: 12,
      revenue: 4788
    },
    {
      id: 3,
      name: 'Elite Business Suites',
      location: 'Bangalore, India',
      image: assets.roomImg3,
      rooms: 20,
      price: 350,
      rating: 4.7,
      status: 'Active',
      bookings: 8,
      revenue: 2800
    }
  ]

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className='p-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>My Hotels</h1>
          <p className='text-gray-600'>Manage your hotel properties</p>
        </div>
        <button
          onClick={() => navigate('/owner/add-hotel')}
          className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors'
        >
          <img src={assets.addIcon} alt="Add" className='w-4 h-4 filter brightness-0 invert' />
          Add New Hotel
        </button>
      </div>

      {/* Search and Filter */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex-1 relative'>
            <img 
              src={assets.searchIcon} 
              alt="Search" 
              className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400'
            />
            <input
              type="text"
              placeholder="Search hotels by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>
          <select className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Stats Overview */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-blue-100 rounded-lg'>
              <img src={assets.homeIcon} alt="Hotels" className='w-5 h-5 text-blue-600' />
            </div>
            <div>
              <p className='text-sm text-gray-600'>Total Hotels</p>
              <p className='text-xl font-bold text-gray-900'>{hotels.length}</p>
            </div>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-green-100 rounded-lg'>
              <img src={assets.totalBookingIcon} alt="Bookings" className='w-5 h-5 text-green-600' />
            </div>
            <div>
              <p className='text-sm text-gray-600'>Total Bookings</p>
              <p className='text-xl font-bold text-gray-900'>{hotels.reduce((sum, hotel) => sum + hotel.bookings, 0)}</p>
            </div>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-purple-100 rounded-lg'>
              <img src={assets.totalRevenueIcon} alt="Revenue" className='w-5 h-5 text-purple-600' />
            </div>
            <div>
              <p className='text-sm text-gray-600'>Total Revenue</p>
              <p className='text-xl font-bold text-gray-900'>${hotels.reduce((sum, hotel) => sum + hotel.revenue, 0)}</p>
            </div>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-orange-100 rounded-lg'>
              <img src={assets.listIcon} alt="Active" className='w-5 h-5 text-orange-600' />
            </div>
            <div>
              <p className='text-sm text-gray-600'>Active Hotels</p>
              <p className='text-xl font-bold text-gray-900'>{hotels.filter(h => h.status === 'Active').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
        {filteredHotels.map((hotel) => (
          <div key={hotel.id} className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow'>
            <div className='relative'>
              <img
                src={hotel.image}
                alt={hotel.name}
                className='w-full h-48 object-cover'
              />
              <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(hotel.status)}`}>
                {hotel.status}
              </div>
            </div>
            
            <div className='p-4'>
              <div className='flex justify-between items-start mb-2'>
                <h3 className='text-lg font-semibold text-gray-900'>{hotel.name}</h3>
                <div className='flex items-center gap-1'>
                  <img src={assets.starIconFilled} alt="Star" className='w-4 h-4' />
                  <span className='text-sm font-medium text-gray-700'>{hotel.rating}</span>
                </div>
              </div>
              
              <div className='flex items-center gap-1 mb-3'>
                <img src={assets.locationIcon} alt="Location" className='w-4 h-4 text-gray-400' />
                <span className='text-sm text-gray-600'>{hotel.location}</span>
              </div>
              
              <div className='grid grid-cols-2 gap-4 mb-4 text-sm'>
                <div>
                  <p className='text-gray-600'>Rooms</p>
                  <p className='font-medium text-gray-900'>{hotel.rooms}</p>
                </div>
                <div>
                  <p className='text-gray-600'>Price/Night</p>
                  <p className='font-medium text-gray-900'>${hotel.price}</p>
                </div>
                <div>
                  <p className='text-gray-600'>Bookings</p>
                  <p className='font-medium text-gray-900'>{hotel.bookings}</p>
                </div>
                <div>
                  <p className='text-gray-600'>Revenue</p>
                  <p className='font-medium text-gray-900'>${hotel.revenue}</p>
                </div>
              </div>
              
              <div className='flex gap-2'>
                <button className='flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition-colors'>
                  Edit Hotel
                </button>
                <button className='px-3 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg text-sm transition-colors'>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredHotels.length === 0 && (
        <div className='text-center py-12'>
          <div className='w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center'>
            <img src={assets.homeIcon} alt="No hotels" className='w-8 h-8 text-gray-400' />
          </div>
          <h3 className='text-lg font-medium text-gray-900 mb-2'>No hotels found</h3>
          <p className='text-gray-600 mb-4'>
            {searchTerm ? 'Try adjusting your search criteria' : 'Get started by adding your first hotel'}
          </p>
          <button
            onClick={() => navigate('/owner/add-hotel')}
            className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors'
          >
            Add New Hotel
          </button>
        </div>
      )}
    </div>
  )
}

export default Hotels
