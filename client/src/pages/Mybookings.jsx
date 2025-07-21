import Title from '../components/Title'
import React, { useState } from 'react'
import { userBookingsDummyData, assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import Starrating from '../components/Starrating'

const Mybookings = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('all') // 'all', 'upcoming', 'completed', 'cancelled'
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)

  // Filter bookings based on active tab
  const filterBookings = () => {
    const currentDate = new Date()
    
    switch(activeTab) {
      case 'upcoming':
        return userBookingsDummyData.filter(booking => {
          const checkInDate = new Date(booking.checkInDate)
          return checkInDate >= currentDate && booking.status !== 'cancelled'
        })
      case 'completed':
        return userBookingsDummyData.filter(booking => {
          const checkOutDate = new Date(booking.checkOutDate)
          return checkOutDate < currentDate && booking.status !== 'cancelled'
        })
      case 'cancelled':
        return userBookingsDummyData.filter(booking => booking.status === 'cancelled')
      default:
        return userBookingsDummyData
    }
  }

  const filteredBookings = filterBookings()

  // Debug: Log the data to console
  console.log('userBookingsDummyData:', userBookingsDummyData)
  console.log('activeTab:', activeTab)
  console.log('filteredBookings:', filteredBookings)
  console.log('Current date:', new Date())

  // Helper function to get count for each tab
  const getTabCount = (tabId) => {
    const currentDate = new Date()
    
    switch(tabId) {
      case 'upcoming':
        return userBookingsDummyData.filter(booking => {
          const checkInDate = new Date(booking.checkInDate)
          return checkInDate >= currentDate && booking.status !== 'cancelled'
        }).length
      case 'completed':
        return userBookingsDummyData.filter(booking => {
          const checkOutDate = new Date(booking.checkOutDate)
          return checkOutDate < currentDate && booking.status !== 'cancelled'
        }).length
      case 'cancelled':
        return userBookingsDummyData.filter(booking => booking.status === 'cancelled').length
      default:
        return userBookingsDummyData.length
    }
  }

  // Format date helper
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Calculate nights
  const calculateNights = (checkIn, checkOut) => {
    const diff = new Date(checkOut) - new Date(checkIn)
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Show booking details modal
  const showBookingDetails = (booking) => {
    setSelectedBooking(booking)
    setShowDetailsModal(true)
  }

  // Handle payment for pending bookings
  const handlePayNow = (booking) => {
    // Simulate payment process
    alert(`Processing payment of $${booking.totalPrice} for ${booking.hotel.name}...`)
    
    // In a real app, you would integrate with a payment processor here
    // For demo purposes, we'll just show a success message
    setTimeout(() => {
      alert('Payment successful! Your booking is now confirmed.')
      // In a real app, you would update the booking status in your backend
    }, 1500)
  }

  return (
    <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
      <Title title='My Bookings' subTitle='Easily manage your past, current, and upcoming hotel reservations in one place. Plan your trips seamlessly with just a few clicks' align='left'/>
      
      {/* Tabs */}
      <div className='mt-8 mb-6'>
        <div className='border-b border-gray-200'>
          <nav className='-mb-px flex space-x-8'>
            {[
              { id: 'all', label: 'All Bookings' },
              { id: 'upcoming', label: 'Upcoming' },
              { id: 'completed', label: 'Completed' },
              { id: 'cancelled', label: 'Cancelled' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({getTabCount(tab.id)})
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className='space-y-4'>
          {filteredBookings.map((booking, index) => (
            <div key={booking._id} className='bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow'>
              <div className='p-4'>
                <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
                  
                  {/* Hotel Image */}
                  <div className='sm:w-32 sm:h-24 w-full h-32 flex-shrink-0'>
                    <img 
                      src={booking.room.images[0]} 
                      alt={booking.hotel.name}
                      className='w-full h-full object-cover rounded-md'
                    />
                  </div>

                  {/* Booking Details */}
                  <div className='flex-1 space-y-3'>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                      <div>
                        <h3 className='text-lg font-semibold text-gray-900'>{booking.hotel.name}</h3>
                        <p className='text-gray-600 flex items-center gap-1 text-sm'>
                          <img src={assets.locationIcon} alt="location" className='w-3 h-3' />
                          {booking.hotel.address}, {booking.hotel.city}
                        </p>
                        <p className='text-xs text-gray-500 mt-1'>{booking.room.roomType} Room</p>
                      </div>
                      <div className='flex flex-col items-start sm:items-end gap-1'>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                        <div className='text-right'>
                          <div className='text-lg font-bold text-gray-900'>${booking.totalPrice}</div>
                          <div className='text-xs text-gray-500'>Total Amount</div>
                        </div>
                      </div>
                    </div>

                    <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs'>
                      <div>
                        <div className='text-gray-500'>Check-in</div>
                        <div className='font-medium text-gray-900'>{formatDate(booking.checkInDate)}</div>
                      </div>
                      <div>
                        <div className='text-gray-500'>Check-out</div>
                        <div className='font-medium text-gray-900'>{formatDate(booking.checkOutDate)}</div>
                      </div>
                      <div>
                        <div className='text-gray-500'>Duration</div>
                        <div className='font-medium text-gray-900'>
                          {calculateNights(booking.checkInDate, booking.checkOutDate)} night{calculateNights(booking.checkInDate, booking.checkOutDate) > 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>

                    <div className='flex flex-col sm:flex-row gap-2 pt-3 border-t border-gray-100'>
                      <button 
                        onClick={() => showBookingDetails(booking)}
                        className='px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium text-sm'
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => navigate(`/rooms/${booking.room._id}`)}
                        className='px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm'
                      >
                        View Room
                      </button>
                      {booking.status === 'pending' && !booking.isPaid && (
                        <button 
                          onClick={() => handlePayNow(booking)}
                          className='px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium text-sm'
                        >
                          Pay Now
                        </button>
                      )}
                      {booking.status === 'confirmed' && new Date(booking.checkInDate) > new Date() && (
                        <button className='px-3 py-1.5 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors font-medium text-sm'>
                          Cancel Booking
                        </button>
                      )}
                      {booking.status === 'completed' && (
                        <button className='px-3 py-1.5 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-50 transition-colors font-medium text-sm'>
                          Write Review
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center py-12'>
          <div className='text-gray-400 text-6xl mb-4'>🏨</div>
          <h3 className='text-lg font-medium text-gray-900 mb-2'>No bookings found</h3>
          <p className='text-gray-600 mb-6'>
            {activeTab === 'all' 
              ? "You haven't made any bookings yet." 
              : `No ${activeTab} bookings to display.`
            }
          </p>
          <button 
            onClick={() => navigate('/rooms')}
            className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium'
          >
            Browse Hotels
          </button>
        </div>
      )}

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='p-6'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold text-gray-900'>Booking Details</h2>
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  className='text-gray-400 hover:text-gray-600'
                >
                  <img src={assets.closeIcon} alt="close" className='w-6 h-6' />
                </button>
              </div>

              <div className='space-y-6'>
                {/* Hotel Info */}
                <div>
                  <img 
                    src={selectedBooking.room.images[0]} 
                    alt={selectedBooking.hotel.name}
                    className='w-full h-48 object-cover rounded-lg mb-4'
                  />
                  <h3 className='text-xl font-semibold text-gray-900'>{selectedBooking.hotel.name}</h3>
                  <p className='text-gray-600'>{selectedBooking.hotel.address}, {selectedBooking.hotel.city}</p>
                  <p className='text-sm text-gray-500'>{selectedBooking.room.roomType} Room</p>
                </div>

                {/* Booking Information */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <h4 className='font-medium text-gray-900 mb-2'>Booking ID</h4>
                    <p className='text-gray-600 text-sm'>{selectedBooking._id}</p>
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-900 mb-2'>Status</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.status)}`}>
                      {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-900 mb-2'>Check-in</h4>
                    <p className='text-gray-600'>{formatDate(selectedBooking.checkInDate)}</p>
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-900 mb-2'>Check-out</h4>
                    <p className='text-gray-600'>{formatDate(selectedBooking.checkOutDate)}</p>
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-900 mb-2'>Guests</h4>
                    <p className='text-gray-600'>{selectedBooking.guests} guest{selectedBooking.guests > 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <h4 className='font-medium text-gray-900 mb-2'>Duration</h4>
                    <p className='text-gray-600'>
                      {calculateNights(selectedBooking.checkInDate, selectedBooking.checkOutDate)} night{calculateNights(selectedBooking.checkInDate, selectedBooking.checkOutDate) > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                {/* Payment Information */}
                <div className='border-t pt-4'>
                  <h4 className='font-medium text-gray-900 mb-3'>Payment Information</h4>
                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <p className='text-sm text-gray-500'>Payment Method</p>
                      <p className='font-medium'>{selectedBooking.paymentMethod}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Payment Status</p>
                      <p className={`font-medium ${selectedBooking.isPaid ? 'text-green-600' : 'text-orange-600'}`}>
                        {selectedBooking.isPaid ? 'Paid' : 'Pending Payment'}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Total Amount</p>
                      <p className='text-xl font-bold text-gray-900'>${selectedBooking.totalPrice}</p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-500'>Booking Date</p>
                      <p className='font-medium'>{formatDate(selectedBooking.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Room Amenities */}
                <div className='border-t pt-4'>
                  <h4 className='font-medium text-gray-900 mb-3'>Room Amenities</h4>
                  <div className='flex flex-wrap gap-2'>
                    {selectedBooking.room.amenities.map((amenity, index) => (
                      <span key={index} className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm'>
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className='flex gap-3 mt-6 pt-6 border-t'>
                <button 
                  onClick={() => setShowDetailsModal(false)}
                  className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
                >
                  Close
                </button>
                
                {selectedBooking.status === 'pending' && !selectedBooking.isPaid && (
                  <button 
                    onClick={() => {
                      handlePayNow(selectedBooking)
                      setShowDetailsModal(false)
                    }}
                    className='flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium'
                  >
                    Pay Now - ${selectedBooking.totalPrice}
                  </button>
                )}
                
                <button 
                  onClick={() => {
                    setShowDetailsModal(false)
                    navigate(`/rooms/${selectedBooking.room._id}`)
                  }}
                  className='flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
                >
                  View Room
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Mybookings
