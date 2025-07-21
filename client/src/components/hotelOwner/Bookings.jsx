import React, { useState } from 'react'
import { assets } from '../../assets/assets'

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Dummy bookings data for Ajit Singh's hotels
  const bookings = [
    {
      id: 'BK001',
      guestName: 'John Doe',
      guestEmail: 'john.doe@email.com',
      guestPhone: '+91-9876543210',
      hotel: 'Urbanza Suites',
      roomType: 'Deluxe Room',
      checkIn: '2024-08-15',
      checkOut: '2024-08-18',
      nights: 3,
      guests: 2,
      amount: 897,
      status: 'confirmed',
      bookingDate: '2024-08-01',
      paymentStatus: 'paid'
    },
    {
      id: 'BK002',
      guestName: 'Jane Smith',
      guestEmail: 'jane.smith@email.com',
      guestPhone: '+91-9765432101',
      hotel: 'Singh Palace Hotel',
      roomType: 'Suite',
      checkIn: '2024-09-20',
      checkOut: '2024-09-22',
      nights: 2,
      guests: 2,
      amount: 798,
      status: 'pending',
      bookingDate: '2024-08-10',
      paymentStatus: 'pending'
    },
    {
      id: 'BK003',
      guestName: 'Mike Johnson',
      guestEmail: 'mike.johnson@email.com',
      guestPhone: '+91-9654321012',
      hotel: 'Elite Business Suites',
      roomType: 'Business Room',
      checkIn: '2024-08-10',
      checkOut: '2024-08-12',
      nights: 2,
      guests: 1,
      amount: 700,
      status: 'completed',
      bookingDate: '2024-07-25',
      paymentStatus: 'paid'
    },
    {
      id: 'BK004',
      guestName: 'Sarah Wilson',
      guestEmail: 'sarah.wilson@email.com',
      guestPhone: '+91-9543210123',
      hotel: 'Urbanza Suites',
      roomType: 'Standard Room',
      checkIn: '2024-08-25',
      checkOut: '2024-08-27',
      nights: 2,
      guests: 1,
      amount: 598,
      status: 'cancelled',
      bookingDate: '2024-08-05',
      paymentStatus: 'refunded'
    }
  ]

  const tabs = [
    { id: 'all', label: 'All Bookings', count: bookings.length },
    { id: 'confirmed', label: 'Confirmed', count: bookings.filter(b => b.status === 'confirmed').length },
    { id: 'pending', label: 'Pending', count: bookings.filter(b => b.status === 'pending').length },
    { id: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: bookings.filter(b => b.status === 'cancelled').length }
  ]

  const filteredBookings = bookings.filter(booking => {
    const matchesTab = activeTab === 'all' || booking.status === activeTab
    const matchesSearch = booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.hotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'completed':
        return 'bg-blue-100 text-blue-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'refunded':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleStatusUpdate = (bookingId, newStatus) => {
    // Handle status update logic here
    console.log(`Updating booking ${bookingId} to ${newStatus}`)
  }

  return (
    <div className='p-6'>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Bookings Management</h1>
        <p className='text-gray-600'>Manage all guest reservations across your hotels</p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-blue-100 rounded-lg'>
              <img src={assets.totalBookingIcon} alt="Total" className='w-5 h-5 text-blue-600' />
            </div>
            <div>
              <p className='text-sm text-gray-600'>Total Bookings</p>
              <p className='text-xl font-bold text-gray-900'>{bookings.length}</p>
            </div>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-green-100 rounded-lg'>
              <img src={assets.totalRevenueIcon} alt="Revenue" className='w-5 h-5 text-green-600' />
            </div>
            <div>
              <p className='text-sm text-gray-600'>Total Revenue</p>
              <p className='text-xl font-bold text-gray-900'>${bookings.reduce((sum, b) => sum + b.amount, 0)}</p>
            </div>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-yellow-100 rounded-lg'>
              <img src={assets.calenderIcon} alt="Pending" className='w-5 h-5 text-yellow-600' />
            </div>
            <div>
              <p className='text-sm text-gray-600'>Pending</p>
              <p className='text-xl font-bold text-gray-900'>{bookings.filter(b => b.status === 'pending').length}</p>
            </div>
          </div>
        </div>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-purple-100 rounded-lg'>
              <img src={assets.guestsIcon} alt="Guests" className='w-5 h-5 text-purple-600' />
            </div>
            <div>
              <p className='text-sm text-gray-600'>Total Guests</p>
              <p className='text-xl font-bold text-gray-900'>{bookings.reduce((sum, b) => sum + b.guests, 0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
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
              placeholder="Search by guest name, hotel, or booking ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            />
          </div>
          <select className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
            <option value="">All Hotels</option>
            <option value="urbanza-suites">Urbanza Suites</option>
            <option value="singh-palace">Singh Palace Hotel</option>
            <option value="elite-business">Elite Business Suites</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 mb-6'>
        <div className='flex overflow-x-auto'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Booking ID</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Guest</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Hotel</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Dates</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Guests</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Amount</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Status</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Payment</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className='border-b border-gray-100 hover:bg-gray-50'>
                  <td className='py-3 px-4'>
                    <span className='text-sm font-medium text-gray-900'>{booking.id}</span>
                  </td>
                  <td className='py-3 px-4'>
                    <div>
                      <p className='text-sm font-medium text-gray-900'>{booking.guestName}</p>
                      <p className='text-xs text-gray-600'>{booking.guestEmail}</p>
                    </div>
                  </td>
                  <td className='py-3 px-4'>
                    <div>
                      <p className='text-sm font-medium text-gray-900'>{booking.hotel}</p>
                      <p className='text-xs text-gray-600'>{booking.roomType}</p>
                    </div>
                  </td>
                  <td className='py-3 px-4'>
                    <div>
                      <p className='text-sm text-gray-900'>{booking.checkIn}</p>
                      <p className='text-xs text-gray-600'>to {booking.checkOut}</p>
                      <p className='text-xs text-gray-600'>{booking.nights} nights</p>
                    </div>
                  </td>
                  <td className='py-3 px-4'>
                    <span className='text-sm text-gray-900'>{booking.guests}</span>
                  </td>
                  <td className='py-3 px-4'>
                    <span className='text-sm font-medium text-gray-900'>${booking.amount}</span>
                  </td>
                  <td className='py-3 px-4'>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className='py-3 px-4'>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className='py-3 px-4'>
                    <div className='flex gap-1'>
                      {booking.status === 'pending' && (
                        <button
                          onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                          className='px-2 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors'
                        >
                          Confirm
                        </button>
                      )}
                      <button className='px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors'>
                        View
                      </button>
                      <button className='px-2 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded transition-colors'>
                        Contact
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <div className='text-center py-12'>
            <div className='w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center'>
              <img src={assets.totalBookingIcon} alt="No bookings" className='w-8 h-8 text-gray-400' />
            </div>
            <h3 className='text-lg font-medium text-gray-900 mb-2'>No bookings found</h3>
            <p className='text-gray-600'>
              {searchTerm ? 'Try adjusting your search criteria' : 'No bookings match the selected filter'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Bookings
