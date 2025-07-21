import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()
  const [timeFilter, setTimeFilter] = useState('month')

  // Enhanced stats with more detailed information
  const stats = [
    {
      title: 'Total Hotels',
      value: '3',
      icon: assets.homeIcon,
      color: 'bg-blue-500',
      change: '+2 this month',
      trend: 'up',
      details: '100% occupancy rate'
    },
    {
      title: 'Total Bookings',
      value: '24',
      icon: assets.totalBookingIcon,
      color: 'bg-green-500',
      change: '+12% from last month',
      trend: 'up',
      details: '6 pending confirmation'
    },
    {
      title: 'Total Revenue',
      value: '$8,950',
      icon: assets.totalRevenueIcon,
      color: 'bg-purple-500',
      change: '+18% from last month',
      trend: 'up',
      details: 'Target: $10,000'
    },
    {
      title: 'Active Listings',
      value: '3',
      icon: assets.listIcon,
      color: 'bg-orange-500',
      change: 'All hotels active',
      trend: 'stable',
      details: '75 total rooms'
    }
  ]

  // Performance metrics
  const performanceMetrics = [
    {
      hotel: 'Urbanza Suites',
      occupancy: 85,
      revenue: '$4,485',
      rating: 4.8,
      bookings: 15
    },
    {
      hotel: 'Singh Palace Hotel',
      occupancy: 78,
      revenue: '$4,788',
      rating: 4.9,
      bookings: 12
    },
    {
      hotel: 'Elite Business Suites',
      occupancy: 70,
      revenue: '$2,800',
      rating: 4.7,
      bookings: 8
    }
  ]

  const quickActions = [
    {
      title: 'Add New Hotel',
      description: 'Register a new hotel property',
      icon: assets.addIcon,
      color: 'bg-blue-600',
      action: () => navigate('/owner/add-hotel')
    },
    {
      title: 'View Bookings',
      description: 'Manage guest reservations',
      icon: assets.totalBookingIcon,
      color: 'bg-green-600',
      action: () => navigate('/owner/bookings')
    },
    {
      title: 'Check Revenue',
      description: 'View financial analytics',
      icon: assets.totalRevenueIcon,
      color: 'bg-purple-600',
      action: () => navigate('/owner/revenue')
    }
  ]

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      {/* Customer Notice Banner */}
      <div className='mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <svg className='h-5 w-5 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
              </svg>
            </div>
            <div className='ml-3'>
              <p className='text-sm text-blue-800'>
                <span className='font-medium'>Looking to book a room?</span> You're currently in the Hotel Owner Dashboard.
              </p>
            </div>
          </div>
          <div className='flex-shrink-0'>
            <button
              onClick={() => navigate('/')}
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2'
            >
              <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
              </svg>
              Book Rooms
            </button>
          </div>
        </div>
      </div>

      {/* Header with Welcome Message */}
      <div className='mb-8'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Welcome back, Ajit Singh!</h1>
            <p className='text-gray-600'>Here's your hotel business overview for today</p>
          </div>
          <div className='flex gap-3'>
            <select 
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500'
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            <button 
              onClick={() => navigate('/owner/add-hotel')}
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2'
            >
              <img src={assets.addIcon} alt="Add" className='w-4 h-4 filter brightness-0 invert' />
              Add Hotel
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
        {stats.map((stat, index) => (
          <div key={index} className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow'>
            <div className='flex items-center justify-between mb-4'>
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <img src={stat.icon} alt={stat.title} className='w-6 h-6 filter brightness-0 invert' />
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-green-100 text-green-600' : 
                stat.trend === 'down' ? 'bg-red-100 text-red-600' : 
                'bg-gray-100 text-gray-600'
              }`}>
                {stat.trend === 'up' ? '↗' : stat.trend === 'down' ? '↘' : '→'}
              </div>
            </div>
            <div>
              <h3 className='text-2xl font-bold text-gray-900 mb-1'>{stat.value}</h3>
              <p className='text-sm font-medium text-gray-600 mb-2'>{stat.title}</p>
              <p className='text-xs text-green-600 mb-1'>{stat.change}</p>
              <p className='text-xs text-gray-500'>{stat.details}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Hotel Performance Overview */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
        <div className='lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <div className='flex justify-between items-center mb-6'>
            <h2 className='text-xl font-semibold text-gray-900'>Hotel Performance</h2>
            <button 
              onClick={() => navigate('/owner/hotels')}
              className='text-blue-600 hover:text-blue-700 text-sm font-medium'
            >
              View All Hotels
            </button>
          </div>
          <div className='space-y-4'>
            {performanceMetrics.map((hotel, index) => (
              <div key={index} className='p-4 bg-gray-50 rounded-lg'>
                <div className='flex justify-between items-center mb-3'>
                  <h3 className='font-semibold text-gray-900'>{hotel.hotel}</h3>
                  <div className='flex items-center gap-1'>
                    <img src={assets.starIconFilled} alt="Rating" className='w-4 h-4' />
                    <span className='text-sm font-medium'>{hotel.rating}</span>
                  </div>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                  <div>
                    <p className='text-xs text-gray-600'>Occupancy</p>
                    <div className='flex items-center gap-2'>
                      <div className='flex-1 bg-gray-200 rounded-full h-2'>
                        <div 
                          className='bg-blue-500 h-2 rounded-full' 
                          style={{ width: `${hotel.occupancy}%` }}
                        ></div>
                      </div>
                      <span className='text-sm font-medium text-gray-900'>{hotel.occupancy}%</span>
                    </div>
                  </div>
                  <div>
                    <p className='text-xs text-gray-600'>Revenue</p>
                    <p className='text-sm font-bold text-gray-900'>{hotel.revenue}</p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-600'>Bookings</p>
                    <p className='text-sm font-bold text-gray-900'>{hotel.bookings}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>Quick Actions</h2>
          <div className='space-y-3'>
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className='w-full flex items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-left group'
              >
                <div className={`p-3 rounded-lg ${action.color} mr-4 group-hover:scale-105 transition-transform`}>
                  <img src={action.icon} alt={action.title} className='w-5 h-5 filter brightness-0 invert' />
                </div>
                <div>
                  <h3 className='font-medium text-gray-900'>{action.title}</h3>
                  <p className='text-sm text-gray-600'>{action.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        {/* Recent Activity */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>Recent Activity</h2>
          <div className='space-y-4'>
            <div className='flex items-start p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500'>
              <div className='w-3 h-3 bg-blue-500 rounded-full mt-1 mr-3'></div>
              <div className='flex-1'>
                <p className='text-sm font-medium text-gray-900'>New booking received</p>
                <p className='text-xs text-gray-600'>Urbanza Suites - Room 201</p>
                <p className='text-xs text-gray-500'>2 hours ago</p>
              </div>
              <div className='text-sm font-bold text-blue-600'>$299</div>
            </div>
            <div className='flex items-start p-4 bg-green-50 rounded-lg border-l-4 border-green-500'>
              <div className='w-3 h-3 bg-green-500 rounded-full mt-1 mr-3'></div>
              <div className='flex-1'>
                <p className='text-sm font-medium text-gray-900'>Payment confirmed</p>
                <p className='text-xs text-gray-600'>Singh Palace Hotel - Suite 105</p>
                <p className='text-xs text-gray-500'>4 hours ago</p>
              </div>
              <div className='text-sm font-bold text-green-600'>$399</div>
            </div>
            <div className='flex items-start p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500'>
              <div className='w-3 h-3 bg-yellow-500 rounded-full mt-1 mr-3'></div>
              <div className='flex-1'>
                <p className='text-sm font-medium text-gray-900'>Guest checked in</p>
                <p className='text-xs text-gray-600'>Elite Business Suites - Room 301</p>
                <p className='text-xs text-gray-500'>6 hours ago</p>
              </div>
              <div className='text-sm font-bold text-yellow-600'>Active</div>
            </div>
            <div className='flex items-start p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500'>
              <div className='w-3 h-3 bg-purple-500 rounded-full mt-1 mr-3'></div>
              <div className='flex-1'>
                <p className='text-sm font-medium text-gray-900'>5-star review posted</p>
                <p className='text-xs text-gray-600'>Urbanza Suites</p>
                <p className='text-xs text-gray-500'>1 day ago</p>
              </div>
              <div className='flex items-center gap-1'>
                <img src={assets.starIconFilled} alt="Star" className='w-4 h-4' />
                <span className='text-sm font-bold text-purple-600'>5.0</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/owner/bookings')}
            className='w-full mt-4 text-center text-blue-600 hover:text-blue-700 text-sm font-medium py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors'
          >
            View All Activities
          </button>
        </div>

        {/* Today's Check-ins/Check-outs */}
        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>Today's Schedule</h2>
          <div className='space-y-4'>
            <div>
              <h3 className='text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                Check-ins (3)
              </h3>
              <div className='space-y-2'>
                <div className='flex justify-between items-center p-2 bg-gray-50 rounded'>
                  <div>
                    <p className='text-sm font-medium'>John Doe</p>
                    <p className='text-xs text-gray-600'>Urbanza Suites - Room 201</p>
                  </div>
                  <span className='text-xs text-gray-500'>2:00 PM</span>
                </div>
                <div className='flex justify-between items-center p-2 bg-gray-50 rounded'>
                  <div>
                    <p className='text-sm font-medium'>Sarah Wilson</p>
                    <p className='text-xs text-gray-600'>Singh Palace - Suite 105</p>
                  </div>
                  <span className='text-xs text-gray-500'>3:30 PM</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className='text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                Check-outs (2)
              </h3>
              <div className='space-y-2'>
                <div className='flex justify-between items-center p-2 bg-gray-50 rounded'>
                  <div>
                    <p className='text-sm font-medium'>Mike Johnson</p>
                    <p className='text-xs text-gray-600'>Elite Business - Room 301</p>
                  </div>
                  <span className='text-xs text-gray-500'>11:00 AM</span>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={() => navigate('/owner/bookings')}
            className='w-full mt-4 text-center text-blue-600 hover:text-blue-700 text-sm font-medium py-2 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors'
          >
            Manage Schedule
          </button>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-xl font-semibold text-gray-900'>Recent Bookings</h2>
          <button 
            onClick={() => navigate('/owner/bookings')}
            className='text-blue-600 hover:text-blue-700 text-sm font-medium bg-blue-50 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors'
          >
            View All Bookings
          </button>
        </div>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50'>
              <tr>
                <th className='text-left py-3 px-4 font-medium text-gray-700 rounded-l-lg'>Guest</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Hotel</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Check-in</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700'>Amount</th>
                <th className='text-left py-3 px-4 font-medium text-gray-700 rounded-r-lg'>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-b border-gray-100 hover:bg-gray-50'>
                <td className='py-4 px-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                      <span className='text-sm font-medium text-blue-600'>JD</span>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-900'>John Doe</p>
                      <p className='text-xs text-gray-600'>john.doe@email.com</p>
                    </div>
                  </div>
                </td>
                <td className='py-4 px-4 text-sm text-gray-600'>Urbanza Suites</td>
                <td className='py-4 px-4 text-sm text-gray-600'>Aug 15, 2025</td>
                <td className='py-4 px-4 text-sm text-gray-900 font-medium'>$299</td>
                <td className='py-4 px-4'>
                  <span className='px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full'>
                    Confirmed
                  </span>
                </td>
              </tr>
              <tr className='border-b border-gray-100 hover:bg-gray-50'>
                <td className='py-4 px-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center'>
                      <span className='text-sm font-medium text-purple-600'>JS</span>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-900'>Jane Smith</p>
                      <p className='text-xs text-gray-600'>jane.smith@email.com</p>
                    </div>
                  </div>
                </td>
                <td className='py-4 px-4 text-sm text-gray-600'>Singh Palace Hotel</td>
                <td className='py-4 px-4 text-sm text-gray-600'>Sep 20, 2025</td>
                <td className='py-4 px-4 text-sm text-gray-900 font-medium'>$399</td>
                <td className='py-4 px-4'>
                  <span className='px-3 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full'>
                    Pending
                  </span>
                </td>
              </tr>
              <tr className='hover:bg-gray-50'>
                <td className='py-4 px-4'>
                  <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                      <span className='text-sm font-medium text-green-600'>MJ</span>
                    </div>
                    <div>
                      <p className='text-sm font-medium text-gray-900'>Mike Johnson</p>
                      <p className='text-xs text-gray-600'>mike.johnson@email.com</p>
                    </div>
                  </div>
                </td>
                <td className='py-4 px-4 text-sm text-gray-600'>Elite Business Suites</td>
                <td className='py-4 px-4 text-sm text-gray-600'>Aug 25, 2025</td>
                <td className='py-4 px-4 text-sm text-gray-900 font-medium'>$350</td>
                <td className='py-4 px-4'>
                  <span className='px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full'>
                    Check-in
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
