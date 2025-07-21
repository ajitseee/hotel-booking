import React, { useState } from 'react'
import { assets } from '../../assets/assets'

const Revenue = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedHotel, setSelectedHotel] = useState('all')

  // Revenue data for Ajit Singh's hotels
  const revenueData = {
    totalRevenue: 12073,
    monthlyGrowth: 18.5,
    yearlyGrowth: 24.3,
    totalBookings: 35,
    avgBookingValue: 345
  }

  const monthlyRevenue = [
    { month: 'Jan', revenue: 2400, bookings: 8 },
    { month: 'Feb', revenue: 2800, bookings: 9 },
    { month: 'Mar', revenue: 3200, bookings: 11 },
    { month: 'Apr', revenue: 2900, bookings: 10 },
    { month: 'May', revenue: 3500, bookings: 12 },
    { month: 'Jun', revenue: 4100, bookings: 14 },
    { month: 'Jul', revenue: 4500, bookings: 15 },
    { month: 'Aug', revenue: 5200, bookings: 17 }
  ]

  const hotelRevenue = [
    {
      name: 'Urbanza Suites',
      revenue: 4485,
      bookings: 15,
      growth: 22.5,
      avgRate: 299
    },
    {
      name: 'Singh Palace Hotel',
      revenue: 4788,
      bookings: 12,
      growth: 18.3,
      avgRate: 399
    },
    {
      name: 'Elite Business Suites',
      revenue: 2800,
      bookings: 8,
      growth: 15.7,
      avgRate: 350
    }
  ]

  const recentTransactions = [
    {
      id: 'TXN001',
      guest: 'John Doe',
      hotel: 'Urbanza Suites',
      amount: 897,
      date: '2024-08-15',
      status: 'completed'
    },
    {
      id: 'TXN002',
      guest: 'Jane Smith',
      hotel: 'Singh Palace Hotel',
      amount: 798,
      date: '2024-08-14',
      status: 'completed'
    },
    {
      id: 'TXN003',
      guest: 'Mike Johnson',
      hotel: 'Elite Business Suites',
      amount: 700,
      date: '2024-08-13',
      status: 'completed'
    },
    {
      id: 'TXN004',
      guest: 'Sarah Wilson',
      hotel: 'Urbanza Suites',
      amount: 598,
      date: '2024-08-12',
      status: 'refunded'
    }
  ]

  const getMaxRevenue = () => {
    return Math.max(...monthlyRevenue.map(item => item.revenue))
  }

  const getTransactionStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'refunded':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className='p-6'>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Revenue Analytics</h1>
          <p className='text-gray-600'>Track your financial performance across all properties</p>
        </div>
        <div className='flex gap-2'>
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <select 
            value={selectedHotel}
            onChange={(e) => setSelectedHotel(e.target.value)}
            className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          >
            <option value="all">All Hotels</option>
            <option value="urbanza">Urbanza Suites</option>
            <option value="singh-palace">Singh Palace Hotel</option>
            <option value="elite">Elite Business Suites</option>
          </select>
        </div>
      </div>

      {/* Revenue Overview Cards */}
      <div className='grid grid-cols-1 md:grid-cols-5 gap-4 mb-6'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-2 bg-green-100 rounded-lg'>
              <img src={assets.totalRevenueIcon} alt="Revenue" className='w-5 h-5 text-green-600' />
            </div>
            <span className='text-sm text-gray-600'>Total Revenue</span>
          </div>
          <p className='text-2xl font-bold text-gray-900'>${revenueData.totalRevenue.toLocaleString()}</p>
          <p className='text-sm text-green-600'>+{revenueData.monthlyGrowth}% from last month</p>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-2 bg-blue-100 rounded-lg'>
              <img src={assets.totalBookingIcon} alt="Bookings" className='w-5 h-5 text-blue-600' />
            </div>
            <span className='text-sm text-gray-600'>Total Bookings</span>
          </div>
          <p className='text-2xl font-bold text-gray-900'>{revenueData.totalBookings}</p>
          <p className='text-sm text-blue-600'>+12% from last month</p>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-2 bg-purple-100 rounded-lg'>
              <img src={assets.badgeIcon} alt="Average" className='w-5 h-5 text-purple-600' />
            </div>
            <span className='text-sm text-gray-600'>Avg Booking Value</span>
          </div>
          <p className='text-2xl font-bold text-gray-900'>${revenueData.avgBookingValue}</p>
          <p className='text-sm text-purple-600'>+8% from last month</p>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-2 bg-orange-100 rounded-lg'>
              <img src={assets.calenderIcon} alt="Growth" className='w-5 h-5 text-orange-600' />
            </div>
            <span className='text-sm text-gray-600'>Monthly Growth</span>
          </div>
          <p className='text-2xl font-bold text-gray-900'>{revenueData.monthlyGrowth}%</p>
          <p className='text-sm text-orange-600'>vs last month</p>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4'>
          <div className='flex items-center gap-3 mb-2'>
            <div className='p-2 bg-indigo-100 rounded-lg'>
              <img src={assets.arrowIcon} alt="Yearly" className='w-5 h-5 text-indigo-600' />
            </div>
            <span className='text-sm text-gray-600'>Yearly Growth</span>
          </div>
          <p className='text-2xl font-bold text-gray-900'>{revenueData.yearlyGrowth}%</p>
          <p className='text-sm text-indigo-600'>vs last year</p>
        </div>
      </div>

      {/* Revenue Chart and Hotel Performance */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6'>
        {/* Revenue Chart */}
        <div className='lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>Revenue Trend</h2>
          <div className='h-64'>
            {/* Simple bar chart */}
            <div className='flex items-end justify-between h-full gap-2'>
              {monthlyRevenue.map((item, index) => (
                <div key={index} className='flex flex-col items-center flex-1'>
                  <div className='w-full bg-gray-200 rounded-t-lg relative' style={{ height: '200px' }}>
                    <div 
                      className='bg-blue-500 rounded-t-lg transition-all duration-300 hover:bg-blue-600'
                      style={{ 
                        height: `${(item.revenue / getMaxRevenue()) * 100}%`,
                        width: '100%',
                        position: 'absolute',
                        bottom: 0
                      }}
                      title={`$${item.revenue}`}
                    ></div>
                  </div>
                  <span className='text-xs text-gray-600 mt-2'>{item.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Hotels */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>Hotel Performance</h2>
          <div className='space-y-4'>
            {hotelRevenue.map((hotel, index) => (
              <div key={index} className='p-4 border border-gray-200 rounded-lg'>
                <div className='flex justify-between items-center mb-2'>
                  <h3 className='font-medium text-gray-900'>{hotel.name}</h3>
                  <span className='text-sm text-green-600'>+{hotel.growth}%</span>
                </div>
                <div className='grid grid-cols-2 gap-2 text-sm text-gray-600'>
                  <div>
                    <p>Revenue</p>
                    <p className='font-medium text-gray-900'>${hotel.revenue}</p>
                  </div>
                  <div>
                    <p>Bookings</p>
                    <p className='font-medium text-gray-900'>{hotel.bookings}</p>
                  </div>
                </div>
                <div className='mt-2'>
                  <p className='text-sm text-gray-600'>Avg Rate: <span className='font-medium text-gray-900'>${hotel.avgRate}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-semibold text-gray-900'>Recent Transactions</h2>
          <button className='text-blue-600 hover:text-blue-700 text-sm font-medium'>
            View All Transactions
          </button>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-gray-200'>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Transaction ID</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Guest</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Hotel</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Amount</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Date</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className='border-b border-gray-100'>
                  <td className='py-3 px-4 text-sm font-medium text-gray-900'>{transaction.id}</td>
                  <td className='py-3 px-4 text-sm text-gray-900'>{transaction.guest}</td>
                  <td className='py-3 px-4 text-sm text-gray-600'>{transaction.hotel}</td>
                  <td className='py-3 px-4 text-sm font-medium text-gray-900'>${transaction.amount}</td>
                  <td className='py-3 px-4 text-sm text-gray-600'>{transaction.date}</td>
                  <td className='py-3 px-4'>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTransactionStatusColor(transaction.status)}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Revenue
