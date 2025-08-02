import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  hotel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hotel',
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Standard', 'Deluxe', 'Suite', 'Premium', 'Executive', 'Presidential']
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    url: String,
    alt: String
  }],
  capacity: {
    adults: {
      type: Number,
      required: true,
      min: 1
    },
    children: {
      type: Number,
      default: 0
    }
  },
  bedConfiguration: {
    bedType: {
      type: String,
      enum: ['Single', 'Double', 'Queen', 'King', 'Twin'],
      required: true
    },
    bedCount: {
      type: Number,
      required: true,
      min: 1
    }
  },
  amenities: [{
    type: String,
    enum: [
      'Air Conditioning',
      'Mini Bar',
      'Flat Screen TV',
      'Private Bathroom',
      'City View',
      'Ocean View',
      'Mountain View',
      'Balcony',
      'Free WiFi',
      'Room Service',
      'Safe',
      'Hair Dryer',
      'Coffee Maker',
      'Refrigerator',
      'Work Desk',
      'Sofa',
      'Jacuzzi'
    ]
  }],
  pricing: {
    basePrice: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    taxesIncluded: {
      type: Boolean,
      default: false
    }
  },
  availability: {
    isAvailable: {
      type: Boolean,
      default: true
    },
    totalRooms: {
      type: Number,
      required: true,
      min: 1
    },
    availableRooms: {
      type: Number,
      required: true
    }
  },
  policies: {
    checkIn: {
      type: String,
      default: '15:00'
    },
    checkOut: {
      type: String,
      default: '11:00'
    },
    cancellationPolicy: {
      type: String,
      default: 'Free cancellation up to 24 hours before check-in'
    },
    smokingAllowed: {
      type: Boolean,
      default: false
    },
    petsAllowed: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true
});

// Indexes for efficient queries
roomSchema.index({ hotel: 1, 'availability.isAvailable': 1 });
roomSchema.index({ type: 1, 'pricing.basePrice': 1 });

export default mongoose.model('Room', roomSchema);
