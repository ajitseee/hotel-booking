import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'

const HotelReg = () => {
  const [formData, setFormData] = useState({
    hotelName: '',
    ownerName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    description: '',
    facilities: [],
    images: [],
    pricePerNight: '',
    roomTypes: []
  })

  const [dragActive, setDragActive] = useState(false)
  const [step, setStep] = useState(1) // Multi-step form

  const availableFacilities = [
    { name: 'Free WiFi', icon: assets.freeWifiIcon },
    { name: 'Free Breakfast', icon: assets.freeBreakfastIcon },
    { name: 'Room Service', icon: assets.roomServiceIcon },
    { name: 'Mountain View', icon: assets.mountainIcon },
    { name: 'Pool Access', icon: assets.poolIcon },
    { name: 'Fitness Center', icon: assets.badgeIcon },
    { name: 'Spa Services', icon: assets.heartIcon },
    { name: 'Business Center', icon: assets.listIcon }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFacilityToggle = (facility) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility]
    }))
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files) => {
    const newImages = Array.from(files).slice(0, 5) // Max 5 images
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages].slice(0, 5)
    }))
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Hotel Registration Data:', formData)
    alert('Hotel registration submitted successfully! We will review your application and get back to you within 24 hours.')
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-8'>
          <img src={assets.logo} alt="Logo" className='h-12 mx-auto mb-4' />
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Register Your Hotel</h1>
          <p className='text-gray-600'>Join our platform and start welcoming guests from around the world</p>
        </div>

        {/* Progress Steps */}
        <div className='mb-8'>
          <div className='flex items-center justify-center space-x-8'>
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className='flex items-center'>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepNum}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  step >= stepNum ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {stepNum === 1 ? 'Basic Info' : stepNum === 2 ? 'Property Details' : 'Images & Pricing'}
                </span>
                {stepNum < 3 && <div className='w-16 h-0.5 bg-gray-200 ml-4'></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className='bg-white rounded-xl shadow-lg overflow-hidden'>
          <div className='flex'>
            {/* Left Side - Image */}
            <div className='hidden lg:block lg:w-1/2'>
              <img 
                src={assets.regImage} 
                alt="Hotel Registration" 
                className='w-full h-full object-cover'
              />
            </div>

            {/* Right Side - Form */}
            <div className='w-full lg:w-1/2 p-8'>
              <form onSubmit={handleSubmit}>
                
                {/* Step 1: Basic Information */}
                {step === 1 && (
                  <div className='space-y-6'>
                    <h2 className='text-2xl font-semibold text-gray-900 mb-6'>Basic Information</h2>
                    
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        <img src={assets.homeIcon} alt="hotel" className='w-4 h-4 inline mr-2' />
                        Hotel Name *
                      </label>
                      <input
                        type="text"
                        name="hotelName"
                        value={formData.hotelName}
                        onChange={handleInputChange}
                        required
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Enter your hotel name'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        <img src={assets.userIcon} alt="owner" className='w-4 h-4 inline mr-2' />
                        Owner Name *
                      </label>
                      <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        required
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Enter owner full name'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Enter email address'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Enter phone number'
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Property Details */}
                {step === 2 && (
                  <div className='space-y-6'>
                    <h2 className='text-2xl font-semibold text-gray-900 mb-6'>Property Details</h2>
                    
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        <img src={assets.locationIcon} alt="location" className='w-4 h-4 inline mr-2' />
                        Address *
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Enter complete address'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        City *
                      </label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      >
                        <option value="">Select City</option>
                        {cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Hotel Description *
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Describe your hotel, its unique features, and what makes it special...'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-4'>
                        Facilities & Amenities
                      </label>
                      <div className='grid grid-cols-2 gap-3'>
                        {availableFacilities.map((facility) => (
                          <label
                            key={facility.name}
                            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                              formData.facilities.includes(facility.name)
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={formData.facilities.includes(facility.name)}
                              onChange={() => handleFacilityToggle(facility.name)}
                              className='hidden'
                            />
                            <img src={facility.icon} alt={facility.name} className='w-5 h-5 mr-2' />
                            <span className='text-sm font-medium'>{facility.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Images & Pricing */}
                {step === 3 && (
                  <div className='space-y-6'>
                    <h2 className='text-2xl font-semibold text-gray-900 mb-6'>Images & Pricing</h2>
                    
                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-4'>
                        Hotel Images * (Max 5 images)
                      </label>
                      <div
                        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                          dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <img src={assets.uploadArea} alt="upload" className='w-16 h-16 mx-auto mb-4 opacity-50' />
                        <p className='text-gray-600 mb-2'>Drag and drop images here, or</p>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleFiles(e.target.files)}
                          className='hidden'
                          id="imageUpload"
                        />
                        <label
                          htmlFor="imageUpload"
                          className='bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors'
                        >
                          Browse Images
                        </label>
                      </div>

                      {/* Image Preview */}
                      {formData.images.length > 0 && (
                        <div className='grid grid-cols-2 gap-4 mt-4'>
                          {formData.images.map((image, index) => (
                            <div key={index} className='relative'>
                              <img
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${index + 1}`}
                                className='w-full h-24 object-cover rounded-lg'
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className='absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600'
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Starting Price per Night (USD) *
                      </label>
                      <input
                        type="number"
                        name="pricePerNight"
                        value={formData.pricePerNight}
                        onChange={handleInputChange}
                        required
                        min="1"
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Enter starting price'
                      />
                    </div>
                  </div>
                )}

                {/* Form Navigation */}
                <div className='flex justify-between items-center mt-8 pt-6 border-t border-gray-200'>
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className='flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
                    >
                      <img src={assets.arrowIcon} alt="back" className='w-4 h-4 mr-2 rotate-180' />
                      Previous
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className='flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                    >
                      Next
                      <img src={assets.arrowIcon} alt="next" className='w-4 h-4 ml-2' />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className='flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
                    >
                      <img src={assets.badgeIcon} alt="submit" className='w-4 h-4 mr-2' />
                      Submit Registration
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className='mt-8 text-center text-sm text-gray-600'>
          <p>By registering your hotel, you agree to our terms and conditions.</p>
          <p className='mt-1'>Need help? Contact our support team at support@hotelplatform.com</p>
        </div>
      </div>
    </div>
  )
}

export default HotelReg
