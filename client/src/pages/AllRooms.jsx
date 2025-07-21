import React, { useState } from 'react'
import Footer from '../components/Footer'
import { roomsDummyData } from '../assets/assets'
import Starrating from '../components/Starrating'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const AllRooms = () => {
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState('name');
    const [filterBy, setFilterBy] = useState('all');
    const [priceRange, setPriceRange] = useState(500);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [favorites, setFavorites] = useState(new Set());
    const [quickFilters, setQuickFilters] = useState({
      freeBreakfast: false,
      poolAccess: false,
      petFriendly: false,
      businessCenter: false
    });

    // Filter and sort rooms based on current filters
    const getFilteredAndSortedRooms = () => {
      let filteredRooms = [...roomsDummyData];

      // Apply search filter
      if (searchTerm) {
        filteredRooms = filteredRooms.filter(room => 
          room.hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.hotel.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.hotel.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply room type filter
      if (filterBy !== 'all') {
        filteredRooms = filteredRooms.filter(room => {
          // You can modify this logic based on your room data structure
          const roomType = room.type || 'standard'; // Default to standard if no type
          return roomType.toLowerCase() === filterBy;
        });
      }

      // Apply price filter
      filteredRooms = filteredRooms.filter((room, index) => {
        const originalIndex = roomsDummyData.indexOf(room);
        const basePrice = 199 + (originalIndex * 50);
        return basePrice <= priceRange;
      });

      // Apply quick filters
      if (quickFilters.freeBreakfast) {
        filteredRooms = filteredRooms.filter(room => room.amenities?.includes('breakfast') || true);
      }
      if (quickFilters.poolAccess) {
        filteredRooms = filteredRooms.filter(room => room.amenities?.includes('pool') || true);
      }
      if (quickFilters.petFriendly) {
        filteredRooms = filteredRooms.filter(room => room.amenities?.includes('petFriendly') || true);
      }
      if (quickFilters.businessCenter) {
        filteredRooms = filteredRooms.filter(room => room.amenities?.includes('businessCenter') || true);
      }

      // Apply sorting
      filteredRooms.sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.hotel.name.localeCompare(b.hotel.name);
          case 'price':
            const priceA = 199 + (roomsDummyData.indexOf(a) * 50);
            const priceB = 199 + (roomsDummyData.indexOf(b) * 50);
            return priceA - priceB;
          case 'rating':
            return (b.rating || 4) - (a.rating || 4);
          case 'city':
            return a.hotel.city.localeCompare(b.hotel.city);
          default:
            return 0;
        }
      });

      return filteredRooms;
    };

    const filteredRooms = getFilteredAndSortedRooms();

    const handleQuickFilterChange = (filterName) => {
      setQuickFilters(prev => ({
        ...prev,
        [filterName]: !prev[filterName]
      }));
    };

    const toggleFavorite = (roomId) => {
      setFavorites(prev => {
        const newFavorites = new Set(prev);
        if (newFavorites.has(roomId)) {
          newFavorites.delete(roomId);
        } else {
          newFavorites.add(roomId);
        }
        return newFavorites;
      });
    };

    const clearAllFilters = () => {
      setFilterBy('all');
      setSortBy('name');
      setPriceRange(500);
      setSearchTerm('');
      setQuickFilters({
        freeBreakfast: false,
        poolAccess: false,
        petFriendly: false,
        businessCenter: false
      });
    };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-8'>
          <div className='text-center'>
            <h1 className='font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-3'>
              Hotel Rooms
            </h1>
            <p className='text-base text-gray-600 max-w-xl mx-auto'>
              Find your perfect accommodation from our premium collection.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Rooms and Filter Side by Side */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex flex-col lg:flex-row gap-8'>
          
          {/* Left Side - Hotel Rooms */}
          <div className='lg:w-3/4'>
            {/* Search and View Controls */}
            <div className='mb-6'>
              <div className='flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-4'>
                <div className='flex-1 max-w-md'>
                  <div className='relative'>
                    <input
                      type="text"
                      placeholder="Search hotels by name, city, or address..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    />
                    <img src={assets.searchIcon} alt="search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                
                <div className='flex items-center gap-3'>
                  {/* View Mode Toggle */}
                  <div className='flex bg-gray-100 rounded-lg p-1'>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                        viewMode === 'grid' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                      }`}
                    >
                      Grid
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                        viewMode === 'list' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                      }`}
                    >
                      List
                    </button>
                  </div>
                </div>
              </div>
              
              <div className='flex items-center justify-between'>
                <h2 className='text-xl font-semibold text-gray-900'>Available Rooms</h2>
                <p className='text-sm text-gray-600'>
                  Showing {filteredRooms.length} of {roomsDummyData.length} rooms
                  {searchTerm && <span className='text-blue-600 font-medium'> for "{searchTerm}"</span>}
                </p>
              </div>
            </div>
            
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4' : 'space-y-4'}>
              {filteredRooms.map((room, index) => {
                // Generate dynamic pricing based on original room index
                const originalIndex = roomsDummyData.indexOf(room);
                const basePrice = 199 + (originalIndex * 50);
                const amenities = [
                  { name: 'Wi-Fi', icon: '📶' },
                  { name: 'AC', icon: '❄️' },
                  { name: 'Service', icon: '🛎️' },
                  { name: 'Mini Bar', icon: '🍸' },
                  { name: 'TV', icon: '📺' },
                  { name: 'Bath', icon: '🛁' }
                ];
                
                return (
                <div key={index} className={viewMode === 'grid' 
                  ? "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 max-w-sm" 
                  : "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex gap-4"
                }> 
                  <div className={viewMode === 'grid' ? "relative" : "relative flex-shrink-0 w-48"}>
                    <img 
                      onClick={() => {
                        navigate(`/rooms/${room._id}`);
                        window.scrollTo(0,0);
                      }}
                      src={room.images[0]} 
                      alt="hotel-img" 
                      title='View Room Details' 
                      className={viewMode === 'grid' 
                        ? 'w-full h-36 object-cover cursor-pointer hover:scale-105 transition-transform duration-300'
                        : 'w-full h-32 object-cover cursor-pointer hover:scale-105 transition-transform duration-300'
                      }
                    />
                    <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded-full">
                      <span className="text-xs font-semibold text-gray-800">Premium</span>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full">
                      <span className="text-xs font-semibold">${basePrice}</span>
                    </div>
                    {/* Favorite Heart */}
                    <button
                      onClick={() => toggleFavorite(room._id)}
                      className="absolute top-2 left-2 p-1 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 transition-all"
                    >
                      <span className={favorites.has(room._id) ? 'text-red-500' : 'text-gray-400'}>
                        {favorites.has(room._id) ? '❤️' : '🤍'}
                      </span>
                    </button>
                  </div>
                  
                  <div className={viewMode === 'grid' ? 'p-3' : 'p-4 flex-1'}>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full'>
                        {room.hotel.city}
                      </span>
                      <div className='flex items-center'>
                        <Starrating rating={4} />
                        <span className='ml-1 text-xs text-gray-500'>(200+)</span>
                      </div>
                    </div>
                    
                    <h3 
                      onClick={() => {
                        navigate(`/rooms/${room._id}`);
                        window.scrollTo(0,0);
                      }} 
                      className={viewMode === 'grid' 
                        ? 'text-sm font-playfair font-bold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors line-clamp-2'
                        : 'text-lg font-playfair font-bold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors'
                      }
                    >
                      {room.hotel.name}
                    </h3>
                    
                    <div className='flex items-center text-gray-600 mb-2'>
                      <img src={assets.locationIcon} alt="location-icon" className="w-3 h-3 mr-1" />
                      <span className="text-xs truncate">{room.hotel.address}</span>
                    </div>

                    {/* Compact Amenities */}
                    <div className='mb-3'>
                      <div className={viewMode === 'grid' ? 'grid grid-cols-3 gap-1' : 'flex flex-wrap gap-2'}>
                        {amenities.slice(0, 6).map((amenity, amenityIndex) => (
                          <div key={amenityIndex} className='flex items-center text-xs text-gray-700'>
                            <span className='text-xs mr-1'>{amenity.icon}</span>
                            <span className='truncate text-xs'>{amenity.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className={viewMode === 'grid' 
                      ? 'flex items-center justify-between pt-2 border-t border-gray-100'
                      : 'flex items-center justify-between pt-3 border-t border-gray-100 mt-auto'
                    }>
                      <div className='flex flex-col'>
                        <div className='flex items-baseline gap-1'>
                          <span className='text-sm font-bold text-gray-900'>${basePrice}</span>
                          <span className='text-xs text-gray-500 line-through'>${basePrice + 50}</span>
                        </div>
                        <span className='text-xs text-gray-500'>per night</span>
                      </div>
                      <div className='flex gap-2'>
                        <button 
                          onClick={() => {
                            navigate(`/rooms/${room._id}`);
                            window.scrollTo(0,0);
                          }}
                          className='bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs font-medium transition-colors duration-200'
                        >
                          Book
                        </button>
                        {viewMode === 'list' && (
                          <button className='border border-gray-300 hover:border-gray-400 text-gray-700 px-3 py-1 rounded-md text-xs font-medium transition-colors'>
                            Compare
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                )
              })}
            </div>
          </div>

          {/* Right Side - Filter Container */}
          <div className='lg:w-1/4'>
            <div className='bg-white rounded-xl shadow-md p-6 sticky top-8'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>Filter & Sort</h3>
              
              {/* Filter Section */}
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Filter by Room Type</label>
                <select 
                  value={filterBy} 
                  onChange={(e) => setFilterBy(e.target.value)}
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                >
                  <option value="all">All Rooms</option>
                  <option value="luxury">Luxury</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="standard">Standard</option>
                </select>
              </div>
              
              {/* Sort Section */}
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Sort by</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className='w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                >
                  <option value="name">Hotel Name</option>
                  <option value="price">Price (Low to High)</option>
                  <option value="rating">Rating</option>
                  <option value="city">City</option>
                </select>
              </div>

              {/* Price Range */}
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Price Range</label>
                <div className='space-y-2'>
                  <input 
                    type="range" 
                    min="100" 
                    max="500" 
                    value={priceRange}
                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                    className='w-full' 
                  />
                  <div className='flex justify-between text-xs text-gray-500'>
                    <span>$100</span>
                    <span className='font-medium text-blue-600'>Up to ${priceRange}</span>
                    <span>$500</span>
                  </div>
                </div>
              </div>

              {/* Quick Filters */}
              <div className='mb-6'>
                <label className='block text-sm font-medium text-gray-700 mb-2'>Quick Filters</label>
                <div className='space-y-2'>
                  <label className='flex items-center text-sm'>
                    <input 
                      type="checkbox" 
                      checked={quickFilters.freeBreakfast}
                      onChange={() => handleQuickFilterChange('freeBreakfast')}
                      className='mr-2 rounded' 
                    />
                    Free Breakfast
                  </label>
                  <label className='flex items-center text-sm'>
                    <input 
                      type="checkbox" 
                      checked={quickFilters.poolAccess}
                      onChange={() => handleQuickFilterChange('poolAccess')}
                      className='mr-2 rounded' 
                    />
                    Pool Access
                  </label>
                  <label className='flex items-center text-sm'>
                    <input 
                      type="checkbox" 
                      checked={quickFilters.petFriendly}
                      onChange={() => handleQuickFilterChange('petFriendly')}
                      className='mr-2 rounded' 
                    />
                    Pet Friendly
                  </label>
                  <label className='flex items-center text-sm'>
                    <input 
                      type="checkbox" 
                      checked={quickFilters.businessCenter}
                      onChange={() => handleQuickFilterChange('businessCenter')}
                      className='mr-2 rounded' 
                    />
                    Business Center
                  </label>
                </div>
              </div>

              <button 
                onClick={clearAllFilters}
                className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors'
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AllRooms
