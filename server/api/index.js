import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

// Environment validation
console.log('Environment check:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- MONGODB_URI:', process.env.MONGODB_URI ? 'Set' : 'Missing');
console.log('- CLERK_WEBHOOK_SECRET:', process.env.CLERK_WEBHOOK_SECRET ? 'Set' : 'Missing');

// Database connection
let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }
  
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    console.error('MongoDB URI (redacted):', process.env.MONGODB_URI ? 'Set' : 'Not set');
    throw error;
  }
}

// User Schema (comprehensive for serverless)
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
    type: String,
    default: null
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
  }
}, {
  timestamps: true
});

// Add pre-save middleware to ensure consistency
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

// Create or get existing model
let User;
try {
  User = mongoose.models.User || mongoose.model('User', userSchema);
  console.log('User model initialized successfully');
} catch (error) {
  console.error('Error initializing User model:', error);
  throw error;
}

// Express app setup
const app = express()

// Middleware
app.use(cors())

// Webhook endpoint (before express.json())
app.post('/api/webhooks/clerk', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    console.log('Webhook received, connecting to database...');
    await connectToDatabase();
    console.log('Database connected, processing webhook...');
    
    // Parse webhook payload
    const payload = JSON.parse(req.body.toString());
    const { type, data } = payload;
    
    console.log('Webhook event type:', type);
    console.log('Webhook data:', JSON.stringify(data, null, 2));
    
    if (type === 'user.created') {
      try {
        // Extract role from public metadata
        const userRole = data.public_metadata?.role || data.public_metadata?.userType || 'customer';
        
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || data.username || 'User',
          phone: data.phone_numbers?.[0]?.phone_number || '',
          avatar: data.image_url || data.profile_image_url,
          role: userRole,
          userType: userRole === 'hotel_owner' ? 'owner' : 'customer',
          isEmailVerified: data.email_addresses[0]?.verification?.status === 'verified',
          isPhoneVerified: data.phone_numbers?.[0]?.verification?.status === 'verified',
          lastLogin: new Date(),
          loginCount: 1
        };
        
        console.log('Creating user with data:', userData);
        const newUser = new User(userData);
        await newUser.save();
        console.log('User created successfully:', newUser.email);
      } catch (userError) {
        console.error('Error creating user:', userError);
        // Don't throw, just log the error and continue
      }
    }
    
    if (type === 'user.updated') {
      try {
        const userRole = data.public_metadata?.role || data.public_metadata?.userType || 'customer';
        
        const updateData = {
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          name: `${data.first_name || ''} ${data.last_name || ''}`.trim() || data.username || 'User',
          phone: data.phone_numbers?.[0]?.phone_number || '',
          avatar: data.image_url || data.profile_image_url,
          role: userRole,
          userType: userRole === 'hotel_owner' ? 'owner' : 'customer',
          isEmailVerified: data.email_addresses[0]?.verification?.status === 'verified',
          isPhoneVerified: data.phone_numbers?.[0]?.verification?.status === 'verified'
        };
        
        await User.findOneAndUpdate(
          { clerkId: data.id },
          updateData,
          { new: true, upsert: true }
        );
        console.log('User updated successfully');
      } catch (updateError) {
        console.error('Error updating user:', updateError);
      }
    }
    
    if (type === 'user.deleted') {
      try {
        await User.findOneAndDelete({ clerkId: data.id });
        console.log('User deleted successfully:', data.id);
      } catch (deleteError) {
        console.error('Error deleting user:', deleteError);
      }
    }
    
    res.status(200).json({ 
      success: true,
      message: 'Webhook processed successfully',
      type: type
    });
  } catch (error) {
    console.error('Webhook processing error:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      success: false,
      error: 'Webhook processing failed', 
      message: error.message,
      type: 'webhook_error'
    });
  }
})

// Regular middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Basic routes
app.get('/', (req, res) => res.json({
  message: "Hotel Booking API is Working Fine!",
  timestamp: new Date().toISOString(),
  environment: "production",
  status: "healthy",
  version: "v1.1"
}))

app.get('/api', (req, res) => res.json({
  message: "API endpoint is working!",
  timestamp: new Date().toISOString(),
  status: "healthy"
}))

app.get('/api/health', async (req, res) => {
  try {
    await connectToDatabase();
    res.json({
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(503).json({
      status: "unhealthy",
      database: "disconnected",
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
})

app.get('/api/debug', async (req, res) => {
  try {
    console.log('Debug endpoint called');
    await connectToDatabase();
    
    // Test creating a sample user
    const testUser = {
      clerkId: 'test_' + Date.now(),
      email: 'test@example.com',
      name: 'Test User',
      firstName: 'Test',
      lastName: 'User',
      role: 'customer',
      userType: 'customer'
    };
    
    console.log('Testing user creation with:', testUser);
    const user = new User(testUser);
    await user.validate();
    
    res.json({
      status: "success",
      message: "Debug test passed",
      testUser: testUser,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Debug error:', error);
    res.status(500).json({
      status: "error",
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
})

app.get('/api/test', (req, res) => res.json({
  message: "Test endpoint working!",
  timestamp: new Date().toISOString(),
  status: "healthy"
}))

// Get all users (for testing)
app.get('/api/users', async (req, res) => {
  try {
    console.log('Fetching users...');
    await connectToDatabase();
    const users = await User.find().select('-__v').limit(50); // Limit to 50 users
    console.log(`Found ${users.length} users`);
    res.json({ 
      success: true,
      users, 
      count: users.length,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
})

// Handle all other routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
});

export default async function handler(req, res) {
  try {
    console.log(`${req.method} ${req.url} - Processing request`);
    
    // Add request timeout
    const timeout = setTimeout(() => {
      if (!res.headersSent) {
        console.error('Request timeout');
        res.status(504).json({ 
          error: 'Request timeout',
          message: 'The request took too long to process',
          timestamp: new Date().toISOString()
        });
      }
    }, 25000); // 25 second timeout
    
    // Process the request
    await new Promise((resolve, reject) => {
      app(req, res, (err) => {
        clearTimeout(timeout);
        if (err) reject(err);
        else resolve();
      });
    });
    
    clearTimeout(timeout);
  } catch (error) {
    console.error('Handler error:', error);
    console.error('Error stack:', error.stack);
    
    if (!res.headersSent) {
      return res.status(500).json({ 
        success: false,
        error: 'Internal Server Error',
        message: error.message,
        timestamp: new Date().toISOString(),
        type: 'handler_error'
      });
    }
  }
}
