import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    // Basic Information
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true
    },
    
    // Clerk Integration
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    
    // User Role Management
    role: {
        type: String,
        enum: ['customer', 'hotel_owner'],
        required: true,
        default: 'customer'
    },
    userType: {
        type: String,
        enum: ['customer', 'owner'],
        required: true,
        default: 'customer'
    },
    
    // Profile Information
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    avatar: {
        type: String, // URL to profile image
        default: null
    },
    
    // Address Information
    address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        country: { type: String, trim: true },
        zipCode: { type: String, trim: true }
    },
    
    // Customer Specific Fields
    preferences: {
        roomType: { 
            type: String, 
            enum: ['standard', 'deluxe', 'suite', 'family', 'business'],
            default: 'standard'
        },
        maxBudget: { type: Number, default: 1000 },
        amenities: [{
            type: String,
            enum: ['wifi', 'breakfast', 'pool', 'gym', 'spa', 'parking', 'roomService']
        }]
    },
    
    // Hotel Owner Specific Fields
    hotelOwnerInfo: {
        businessName: { type: String, trim: true },
        businessLicense: { type: String, trim: true },
        taxId: { type: String, trim: true },
        bankAccount: {
            accountNumber: { type: String, trim: true },
            routingNumber: { type: String, trim: true },
            bankName: { type: String, trim: true }
        },
        isVerified: { type: Boolean, default: false },
        verificationDocuments: [{
            type: { type: String, enum: ['license', 'tax', 'identity', 'bank'] },
            url: { type: String },
            status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
            uploadedAt: { type: Date, default: Date.now }
        }]
    },
    
    // Account Status
    isActive: {
        type: Boolean,
        default: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    isPhoneVerified: {
        type: Boolean,
        default: false
    },
    
    // Activity Tracking
    lastLogin: {
        type: Date,
        default: Date.now
    },
    loginCount: {
        type: Number,
        default: 0
    },
    
    // Notification Preferences
    notifications: {
        email: {
            bookingConfirmation: { type: Boolean, default: true },
            promotions: { type: Boolean, default: false },
            newsletters: { type: Boolean, default: false }
        },
        sms: {
            bookingReminders: { type: Boolean, default: true },
            promotions: { type: Boolean, default: false }
        },
        push: {
            enabled: { type: Boolean, default: true },
            bookingUpdates: { type: Boolean, default: true },
            offers: { type: Boolean, default: false }
        }
    },
    
    // Statistics (for hotel owners)
    stats: {
        totalHotels: { type: Number, default: 0 },
        totalBookings: { type: Number, default: 0 },
        totalRevenue: { type: Number, default: 0 },
        averageRating: { type: Number, default: 0 }
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields
});

// Indexes for performance
userSchema.index({ email: 1 });
userSchema.index({ clerkId: 1 });
userSchema.index({ role: 1 });
userSchema.index({ 'hotelOwnerInfo.isVerified': 1 });

// Virtual for full name
userSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`.trim() || this.name;
});

// Method to check if user is hotel owner
userSchema.methods.isHotelOwner = function() {
    return this.role === 'hotel_owner' || this.userType === 'owner';
};

// Method to check if user is customer
userSchema.methods.isCustomer = function() {
    return this.role === 'customer' || this.userType === 'customer';
};

// Method to update last login
userSchema.methods.updateLastLogin = function() {
    this.lastLogin = new Date();
    this.loginCount += 1;
    return this.save();
};

// Static method to find by Clerk ID
userSchema.statics.findByClerkId = function(clerkId) {
    return this.findOne({ clerkId });
};

// Pre-save middleware to ensure consistency
userSchema.pre('save', function(next) {
    // Sync role and userType
    if (this.role === 'hotel_owner') {
        this.userType = 'owner';
    } else if (this.role === 'customer') {
        this.userType = 'customer';
    }
    
    // Set default name if firstName/lastName provided
    if (this.firstName && this.lastName && !this.name) {
        this.name = `${this.firstName} ${this.lastName}`;
    }
    
    next();
});

const User = mongoose.model('User', userSchema);

export default User;