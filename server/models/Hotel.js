import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
    index: true
  },
  country: {
    type: String,
    required: true
  },
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  images: [{
    url: String,
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  amenities: [{
    type: String,
    enum: [
      'Free WiFi',
      'Swimming Pool',
      'Spa',
      'Gym',
      'Restaurant',
      'Bar',
      'Room Service',
      'Concierge',
      'Parking',
      'Pet Friendly',
      'Business Center',
      'Laundry Service',
      'Airport Shuttle',
      'Air Conditioning',
      'Heating',
      'Non-smoking Rooms'
    ]
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    }
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'pending'],
    default: 'active'
  },
  priceRange: {
    min: Number,
    max: Number
  }
}, {
  timestamps: true
});

// Indexes for search optimization
hotelSchema.index({ city: 1, status: 1 });
hotelSchema.index({ name: 'text', description: 'text', city: 'text' });
hotelSchema.index({ 'rating.average': -1 });

export default mongoose.model('Hotel', hotelSchema);
