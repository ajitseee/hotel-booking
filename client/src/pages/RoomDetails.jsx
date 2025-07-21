import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { roomsDummyData, assets, testimonials, roomCommonData } from '../assets/assets'
import Starrating from '../components/Starrating'
import Footer from '../components/Footer'

const RoomDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [guests, setGuests] = useState(1)
  const [paymentOption, setPaymentOption] = useState('online') // 'online' or 'hotel'
  const [nights, setNights] = useState(1)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [userLocation, setUserLocation] = useState(null)
  const [locationError, setLocationError] = useState('')

  // Find the room by ID
  const room = roomsDummyData.find(room => room._id === id)
  
  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Room Not Found</h1>
          <p className="text-gray-600 mb-6">The room you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/rooms')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Rooms
          </button>
        </div>
      </div>
    )
  }

  // Use actual price from room data
  const basePrice = room.pricePerNight || 199
  
  // Calculate number of nights between dates
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate)
      const checkOut = new Date(checkOutDate)
      const diffTime = checkOut - checkIn
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setNights(diffDays > 0 ? diffDays : 1)
    }
  }, [checkInDate, checkOutDate])

  // Dynamic pricing calculations
  const serviceFee = 25
  const taxesPerNight = 18
  const totalTaxes = taxesPerNight * nights
  const roomTotal = basePrice * nights
  const grandTotal = roomTotal + serviceFee + totalTaxes
  
  // Payment option discount
  const hotelPaymentDiscount = paymentOption === 'hotel' ? Math.round(grandTotal * 0.05) : 0 // 5% discount for hotel payment
  const finalTotal = grandTotal - hotelPaymentDiscount
  
  // Use amenities from room data with icons
  const amenityIconMap = {
    'Free WiFi': '📶',
    'Free Breakfast': '🥐',
    'Room Service': '🛎️',
    'Mountain View': '🏔️',
    'Pool Access': '🏊‍♂️',
    'Air Conditioning': '❄️',
    'Mini Bar': '🍸',
    'Flat Screen TV': '📺',
    'Private Bathroom': '🛁',
    'City View': '🏙️',
    'Fitness Center': '💪',
    'Spa Services': '💆‍♀️',
    'Business Center': '💼'
  }

  // Custom owner information
  const customOwner = {
    name: "Ajit Singh",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop&crop=face",
    email: room.hotel.owner.email,
    phone: "7696253670",
    role: "Verified Host",
    createdAt: room.hotel.owner.createdAt
  }

  // Combine room amenities with some default amenities
  const roomAmenities = room.amenities || []
  const defaultAmenities = ['Air Conditioning', 'Mini Bar', 'Flat Screen TV', 'Private Bathroom', 'City View', 'Fitness Center', 'Spa Services', 'Business Center']
  const allAmenities = [...roomAmenities, ...defaultAmenities.filter(amenity => !roomAmenities.includes(amenity))]
  
  const amenities = allAmenities.map(amenity => ({
    name: amenity,
    icon: amenityIconMap[amenity] || '✨'
  }))

  // Gallery navigation functions
  const openGallery = (index) => {
    setCurrentImageIndex(index)
    setIsGalleryOpen(true)
  }

  const closeGallery = () => {
    setIsGalleryOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % room.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length)
  }

  // Keyboard navigation for gallery
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isGalleryOpen) {
        if (e.key === 'ArrowRight') nextImage()
        if (e.key === 'ArrowLeft') prevImage()
        if (e.key === 'Escape') closeGallery()
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isGalleryOpen])

  // Handle booking submission
  const handleBooking = async () => {
    setIsBooking(true)
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false)
      alert('Booking confirmed! You will receive a confirmation email shortly.')
    }, 2000)
  }

  // Location functions
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          setLocationError('')
        },
        (error) => {
          setLocationError('Unable to get your location. Please enable location services.')
          console.error('Location error:', error)
        }
      )
    } else {
      setLocationError('Geolocation is not supported by this browser.')
    }
  }

  const openInMaps = () => {
    const address = encodeURIComponent(`${room.hotel.name}, ${room.hotel.address}, ${room.hotel.city}`)
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${address}`
    window.open(mapsUrl, '_blank')
    
    // Optional: Show confirmation
    console.log('Opening Google Maps for:', room.hotel.name)
  }

  const getDirections = () => {
    if (userLocation) {
      const destination = encodeURIComponent(`${room.hotel.name}, ${room.hotel.address}, ${room.hotel.city}`)
      const directionsUrl = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${destination}`
      window.open(directionsUrl, '_blank')
    } else {
      // First get user location, then open directions
      getCurrentLocation()
      // Wait for location to be detected
      setTimeout(() => {
        if (userLocation) {
          getDirections()
        } else {
          // If location failed, open directions anyway (user can set origin manually)
          const destination = encodeURIComponent(`${room.hotel.name}, ${room.hotel.address}, ${room.hotel.city}`)
          const directionsUrl = `https://www.google.com/maps/dir//${destination}`
          window.open(directionsUrl, '_blank')
        }
      }, 2000)
    }
  }

  // New function for opening different map apps
  const openInMapApp = (appType = 'google') => {
    const address = encodeURIComponent(`${room.hotel.name}, ${room.hotel.address}, ${room.hotel.city}`)
    
    switch(appType) {
      case 'google':
        window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank')
        break
      case 'apple':
        window.open(`https://maps.apple.com/?q=${address}`, '_blank')
        break
      case 'bing':
        window.open(`https://www.bing.com/maps?q=${address}`, '_blank')
        break
      default:
        window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white pt-28 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/rooms')}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to All Rooms
          </button>
        </div>
      </div>

      {/* Room Images with Gallery */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2 relative group">
              <img 
                src={room.images[0]} 
                alt="Main room view"
                className="w-full h-96 object-cover rounded-lg cursor-pointer transition-transform hover:scale-105"
                onClick={() => openGallery(0)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center">
                <button 
                  onClick={() => openGallery(0)}
                  className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-4 py-2 rounded-lg font-medium transition-all"
                >
                  View Gallery
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {room.images.slice(1, 3).map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image} 
                    alt={`Room view ${index + 2}`}
                    className="w-full h-44 object-cover rounded-lg cursor-pointer transition-transform hover:scale-105"
                    onClick={() => openGallery(index + 1)}
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {room.images.slice(3, 5).map((image, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={image} 
                    alt={`Room view ${index + 4}`}
                    className="w-full h-44 object-cover rounded-lg cursor-pointer transition-transform hover:scale-105"
                    onClick={() => openGallery(index + 3)}
                  />
                  {index === 1 && room.images.length > 5 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                      <span className="text-white font-semibold">+{room.images.length - 5} more</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* View All Photos Button */}
          <div className="mt-4 text-center">
            <button 
              onClick={() => openGallery(0)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-lg font-medium transition-colors"
            >
              📷 View all {room.images.length} photos
            </button>
          </div>
        </div>
      </div>

      {/* Room Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Room Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    {room.hotel.city}
                  </span>
                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                    Available
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-full transition-all ${
                      isFavorite 
                        ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <svg className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-2">
                {room.hotel.name} - {room.roomType}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <Starrating rating={4} />
                  <span className="ml-2 text-sm text-gray-600">({testimonials.length} reviews)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <img src={assets.locationIcon} alt="location" className="w-4 h-4 mr-1" />
                  <span className="text-sm">{room.hotel.address}</span>
                  <button 
                    onClick={() => setShowLocationModal(true)}
                    className="ml-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    • View Map
                  </button>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed">
                Experience luxury and comfort in this beautifully appointed room featuring modern amenities 
                and stunning city views. Perfect for both business and leisure travelers, this room offers 
                everything you need for a memorable stay in {room.hotel.city}.
              </p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Room Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="text-xl">{amenity.icon}</span>
                    <span className="text-gray-700">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Features from Assets Data */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Why Choose This Room</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roomCommonData.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <img src={feature.icon} alt={feature.title} className="w-8 h-8 mt-1" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hosted By Owner */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Hosted By</h2>
              <div className="flex items-start gap-4">
                <img 
                  src={customOwner.image} 
                  alt={customOwner.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{customOwner.name}</h3>
                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                      {customOwner.role}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>📧</span>
                      <span>{customOwner.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>📞</span>
                      <span>+91 {customOwner.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>🏨</span>
                      <span>Managing {room.hotel.name} since {new Date(customOwner.createdAt).getFullYear()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Starrating rating={5} />
                      <span className="text-gray-600">(4.9 host rating)</span>
                    </div>
                    <div className="text-gray-600">
                      Response time: Within 1 hour
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowContactModal(true)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Contact Host
                  </button>
                  <a 
                    href={`tel:+91${customOwner.phone}`}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    📞
                  </a>
                  <a 
                    href={`mailto:${customOwner.email}`}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    ✉️
                  </a>
                </div>
              </div>
            </div>

            {/* Reviews from Testimonials Data */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Guest Reviews</h2>
              
              {/* Overall Rating */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900">4.8</div>
                    <Starrating rating={5} />
                    <div className="text-sm text-gray-600 mt-1">Overall Rating</div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">Based on {testimonials.length} verified guest reviews</div>
                  </div>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-4 mb-4">
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex items-start gap-3">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{testimonial.name}</span>
                          <span className="text-sm text-gray-500">• {testimonial.address}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Starrating rating={testimonial.rating} />
                          <span className="text-sm text-gray-600">({testimonial.rating}/5)</span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">{testimonial.review}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Read all verified reviews →
              </button>
            </div>

            {/* Location & Directions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Location & Directions</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">📍</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{room.hotel.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{room.hotel.address}, {room.hotel.city}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button 
                        onClick={() => {
                          openInMaps()
                          // Optional: Show toast notification
                          console.log('🗺️ Opening Google Maps...')
                        }}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 active:scale-95"
                      >
                        🗺️ View on Map
                      </button>
                      
                      <button 
                        onClick={() => {
                          getDirections()
                          console.log('🧭 Getting directions...')
                        }}
                        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 active:scale-95"
                      >
                        🧭 Get Directions
                      </button>
                      
                      <button 
                        onClick={() => {
                          getCurrentLocation()
                          console.log('📱 Detecting location...')
                        }}
                        className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all transform hover:scale-105 active:scale-95"
                      >
                        📱 My Location
                      </button>
                    </div>
                    
                    {locationError && (
                      <div className="mt-2 text-red-600 text-sm">{locationError}</div>
                    )}
                    
                    {userLocation && (
                      <div className="mt-2 text-green-600 text-sm">
                        ✅ Location detected: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Nearby Attractions</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span>🏛️</span>
                      <span>City Center - 2.5 km</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>✈️</span>
                      <span>Airport - 15.2 km</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🚇</span>
                      <span>Metro Station - 0.8 km</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🛍️</span>
                      <span>Shopping Mall - 1.2 km</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold text-gray-900">${basePrice}</span>
                  <span className="text-lg text-gray-500 line-through">${basePrice + 50}</span>
                </div>
                <p className="text-sm text-gray-600">per night • Save 15%</p>
              </div>

              {/* Booking Form */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                    <input 
                      type="date" 
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                    <input 
                      type="date" 
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      min={checkInDate || new Date().toISOString().split('T')[0]}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <select 
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4 Guests</option>
                  </select>
                </div>

                {/* Payment Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Option</label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="online"
                        checked={paymentOption === 'online'}
                        onChange={(e) => setPaymentOption(e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Pay Online</div>
                        <div className="text-xs text-gray-600">Secure payment • Instant confirmation</div>
                      </div>
                      <div className="text-green-600 text-sm font-medium">💳</div>
                    </label>
                    
                    <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="hotel"
                        checked={paymentOption === 'hotel'}
                        onChange={(e) => setPaymentOption(e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Pay at Hotel</div>
                        <div className="text-xs text-gray-600">Pay when you arrive • 5% discount</div>
                      </div>
                      <div className="text-blue-600 text-sm font-medium">🏨</div>
                    </label>
                  </div>
                </div>

                {/* Dynamic Nights Display */}
                {checkInDate && checkOutDate && nights > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="text-sm text-blue-800">
                      <strong>{nights} night{nights > 1 ? 's' : ''}</strong> selected
                      {nights > 1 && <span className="text-blue-600"> • ${basePrice} per night</span>}
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={handleBooking}
                disabled={!checkInDate || !checkOutDate || nights <= 0 || isBooking}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-colors mb-4 flex items-center justify-center gap-2"
              >
                {isBooking ? (
                  <>
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Processing...
                  </>
                ) : (
                  paymentOption === 'online' ? 'Pay Now & Reserve' : 'Reserve Now - Pay at Hotel'
                )}
              </button>

              <div className="text-center text-sm text-gray-600 mb-4">
                {paymentOption === 'online' 
                  ? 'Secure payment • Instant confirmation' 
                  : 'Free cancellation until 24 hours before check-in'
                }
              </div>

              {/* Price Breakdown */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>${basePrice} × {nights} night{nights > 1 ? 's' : ''}</span>
                  <span>${roomTotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Service fee</span>
                  <span>${serviceFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Taxes ({nights} night{nights > 1 ? 's' : ''})</span>
                  <span>${totalTaxes}</span>
                </div>
                
                {/* Payment Option Discount */}
                {hotelPaymentDiscount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Hotel Payment Discount (5%)</span>
                    <span>-${hotelPaymentDiscount}</span>
                  </div>
                )}
                
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${finalTotal}</span>
                </div>
                
                {/* Savings Display */}
                {hotelPaymentDiscount > 0 && (
                  <div className="text-center text-sm text-green-600 font-medium">
                    You save ${hotelPaymentDiscount} by paying at hotel!
                  </div>
                )}
                
                {/* Per Night Average */}
                {nights > 1 && (
                  <div className="text-center text-xs text-gray-500">
                    Average: ${Math.round(finalTotal / nights)} per night
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Image Gallery Modal */}
      {isGalleryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative max-w-4xl max-h-full p-4">
            <button 
              onClick={closeGallery}
              className="absolute top-4 right-4 text-white text-2xl z-10 bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70"
            >
              ×
            </button>
            
            <img 
              src={room.images[currentImageIndex]} 
              alt={`Room view ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-70"
            >
              ‹
            </button>
            
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-70"
            >
              ›
            </button>
            
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
              {currentImageIndex + 1} / {room.images.length}
            </div>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Contact {customOwner.name}</h3>
              <button 
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">📞</div>
                <div>
                  <div className="font-medium">Call directly</div>
                  <div className="text-sm text-gray-600">+91 {customOwner.phone}</div>
                </div>
                <a 
                  href={`tel:+91${customOwner.phone}`}
                  className="ml-auto bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                  Call
                </a>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">✉️</div>
                <div>
                  <div className="font-medium">Send email</div>
                  <div className="text-sm text-gray-600">{customOwner.email}</div>
                </div>
                <a 
                  href={`mailto:${customOwner.email}`}
                  className="ml-auto bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Email
                </a>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl">💬</div>
                <div>
                  <div className="font-medium">Quick message</div>
                  <div className="text-sm text-gray-600">Response within 1 hour</div>
                </div>
                <button className="ml-auto bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700">
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Hotel Location</h3>
              <button 
                onClick={() => setShowLocationModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Hotel Address */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">{room.hotel.name}</h4>
                <p className="text-gray-600">{room.hotel.address}</p>
                <p className="text-gray-600">{room.hotel.city}</p>
                <p className="text-gray-600">📞 {room.hotel.contact}</p>
              </div>

              {/* Embedded Map (Google Maps) */}
              <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                {/* Fallback for when Google Maps API is not available */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <div className="font-medium text-gray-700">{room.hotel.name}</div>
                    <div className="text-sm text-gray-600">{room.hotel.address}</div>
                    <div className="text-sm text-gray-600">{room.hotel.city}</div>
                    <button 
                      onClick={openInMaps}
                      className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                    >
                      Open in Google Maps
                    </button>
                  </div>
                </div>
                
                {/* Uncomment below when you have Google Maps API key */}
                {/* 
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(room.hotel.name + ', ' + room.hotel.address + ', ' + room.hotel.city)}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '0.5rem' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hotel Location"
                  className="rounded-lg"
                />
                */}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button 
                  onClick={() => {
                    openInMapApp('google')
                    console.log('🗺️ Opening in Google Maps...')
                  }}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
                >
                  🗺️ Open in Google Maps
                </button>
                
                <button 
                  onClick={() => {
                    getDirections()
                    console.log('🧭 Getting directions...')
                  }}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium transition-all transform hover:scale-105"
                >
                  🧭 Get Directions
                </button>
              </div>

              {/* Additional Map Options */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Open in Other Map Apps</h4>
                <div className="grid grid-cols-3 gap-2">
                  <button 
                    onClick={() => openInMapApp('apple')}
                    className="flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                  >
                    🍎 Apple Maps
                  </button>
                  
                  <button 
                    onClick={() => openInMapApp('bing')}
                    className="flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                  >
                    🔍 Bing Maps
                  </button>
                  
                  <button 
                    onClick={() => {
                      // Copy address to clipboard
                      navigator.clipboard.writeText(`${room.hotel.name}, ${room.hotel.address}, ${room.hotel.city}`)
                      alert('Address copied to clipboard!')
                    }}
                    className="flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                  >
                    📋 Copy Address
                  </button>
                </div>
              </div>

              {/* Nearby Places */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Nearby Attractions & Services</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <span className="text-2xl">🏛️</span>
                    <div>
                      <div className="font-medium text-gray-900">City Center</div>
                      <div className="text-sm text-gray-600">2.5 km • 5 min drive</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <span className="text-2xl">✈️</span>
                    <div>
                      <div className="font-medium text-gray-900">Airport</div>
                      <div className="text-sm text-gray-600">15.2 km • 20 min drive</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <span className="text-2xl">🚇</span>
                    <div>
                      <div className="font-medium text-gray-900">Metro Station</div>
                      <div className="text-sm text-gray-600">0.8 km • 10 min walk</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <span className="text-2xl">🛍️</span>
                    <div>
                      <div className="font-medium text-gray-900">Shopping Mall</div>
                      <div className="text-sm text-gray-600">1.2 km • 15 min walk</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transportation Options */}
              <div className="border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Transportation</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <span>🚗</span>
                    <span>Free parking available on-site</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>🚌</span>
                    <span>Bus stop 200m away (Line 42, 56)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>🚕</span>
                    <span>Taxi service available 24/7</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>🚲</span>
                    <span>Bike rental nearby</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  )
}

export default RoomDetails
