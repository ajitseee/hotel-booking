import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const AddHotel = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    city: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    images: [],
    facilities: [],
    rooms: [],
    pricing: {
      standard: '',
      deluxe: '',
      suite: ''
    }
  })

  const cities = assets.citiesData || [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'
  ]

  const facilitiesList = [
    { id: 'wifi', name: 'Free WiFi', icon: assets.freeWifiIcon },
    { id: 'breakfast', name: 'Free Breakfast', icon: assets.freeBreakfastIcon },
    { id: 'pool', name: 'Swimming Pool', icon: assets.poolIcon },
    { id: 'roomservice', name: '24/7 Room Service', icon: assets.roomServiceIcon },
    { id: 'mountain', name: 'Mountain View', icon: assets.mountainIcon },
    { id: 'parking', name: 'Free Parking', icon: assets.locationIcon }
  ]

  const roomTypes = [
    { id: 'standard', name: 'Standard Room', description: 'Comfortable room with basic amenities' },
    { id: 'deluxe', name: 'Deluxe Room', description: 'Spacious room with premium amenities' },
    { id: 'suite', name: 'Suite', description: 'Luxury suite with separate living area' }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name
      }))
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 6) // Limit to 6 images
      }))
    }
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const toggleFacility = (facilityId) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facilityId)
        ? prev.facilities.filter(id => id !== facilityId)
        : [...prev.facilities, facilityId]
    }))
  }

  const handlePricingChange = (roomType, value) => {
    setFormData(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [roomType]: value
      }
    }))
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log('Hotel registration data:', formData)
    // Handle hotel registration logic here
    alert('Hotel added successfully!')
    navigate('/owner/hotels')
  }

  const renderStep1 = () => (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>Basic Information</h2>
        <p className='text-gray-600'>Tell us about your hotel</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Hotel Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder="Enter hotel name"
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>City *</label>
          <select
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className='md:col-span-2'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Address *</label>
          <textarea
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            rows={3}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder="Enter complete address"
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Phone Number *</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder="Enter email address"
          />
        </div>

        <div className='md:col-span-2'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Website (Optional)</label>
          <input
            type="url"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder="Enter website URL"
          />
        </div>

        <div className='md:col-span-2'>
          <label className='block text-sm font-medium text-gray-700 mb-2'>Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder="Describe your hotel, its unique features, and what makes it special"
          />
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>Images & Facilities</h2>
        <p className='text-gray-600'>Upload photos and select facilities</p>
      </div>

      {/* Image Upload */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-3'>Hotel Images (Max 6)</label>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          {formData.images.map((image, index) => (
            <div key={index} className='relative group'>
              <img
                src={image.preview}
                alt={`Hotel ${index + 1}`}
                className='w-full h-32 object-cover rounded-lg border border-gray-300'
              />
              <button
                onClick={() => removeImage(index)}
                className='absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
              >
                <img src={assets.closeIcon} alt="Remove" className='w-3 h-3 filter brightness-0 invert' />
              </button>
            </div>
          ))}
          
          {formData.images.length < 6 && (
            <label className='border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors h-32 flex flex-col items-center justify-center'>
              <img src={assets.uploadArea} alt="Upload" className='w-8 h-8 mb-2 text-gray-400' />
              <span className='text-sm text-gray-600'>Upload Image</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className='hidden'
              />
            </label>
          )}
        </div>
      </div>

      {/* Facilities */}
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-3'>Facilities & Amenities</label>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          {facilitiesList.map((facility) => (
            <div
              key={facility.id}
              onClick={() => toggleFacility(facility.id)}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.facilities.includes(facility.id)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className='flex items-center gap-3'>
                <img src={facility.icon} alt={facility.name} className='w-5 h-5' />
                <span className='text-sm font-medium text-gray-900'>{facility.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold text-gray-900 mb-2'>Pricing</h2>
        <p className='text-gray-600'>Set your room rates</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {roomTypes.map((room) => (
          <div key={room.id} className='border border-gray-300 rounded-lg p-4'>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>{room.name}</h3>
            <p className='text-sm text-gray-600 mb-4'>{room.description}</p>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Price per night ($)</label>
              <input
                type="number"
                value={formData.pricing[room.id]}
                onChange={(e) => handlePricingChange(room.id, e.target.value)}
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder="0"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className='bg-gray-50 rounded-lg p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Registration Summary</h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
          <div>
            <p className='text-gray-600'>Hotel Name:</p>
            <p className='font-medium text-gray-900'>{formData.name || 'Not specified'}</p>
          </div>
          <div>
            <p className='text-gray-600'>Location:</p>
            <p className='font-medium text-gray-900'>{formData.city || 'Not specified'}</p>
          </div>
          <div>
            <p className='text-gray-600'>Images:</p>
            <p className='font-medium text-gray-900'>{formData.images.length} uploaded</p>
          </div>
          <div>
            <p className='text-gray-600'>Facilities:</p>
            <p className='font-medium text-gray-900'>{formData.facilities.length} selected</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className='p-6'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='mb-8'>
          <button
            onClick={() => navigate('/owner/hotels')}
            className='flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4'
          >
            <img src={assets.arrowIcon} alt="Back" className='w-4 h-4 rotate-180' />
            Back to Hotels
          </button>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Add New Hotel</h1>
          <p className='text-gray-600'>Register a new property to your portfolio</p>
        </div>

        {/* Progress Bar */}
        <div className='mb-8'>
          <div className='flex items-center justify-between mb-2'>
            {[1, 2, 3].map((step) => (
              <div key={step} className='flex items-center'>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-24 h-1 mx-2 ${currentStep > step ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
                )}
              </div>
            ))}
          </div>
          <div className='flex justify-between text-xs text-gray-600'>
            <span>Basic Info</span>
            <span>Images & Facilities</span>
            <span>Pricing</span>
          </div>
        </div>

        {/* Form Content */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6'>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        {/* Navigation Buttons */}
        <div className='flex justify-between'>
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-2 border border-gray-300 rounded-lg ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          
          {currentStep < 3 ? (
            <button
              onClick={nextStep}
              className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg'
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className='px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg'
            >
              Add Hotel
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AddHotel
