import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

// Load environment variables
dotenv.config()

// Database connection
let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    return;
  }
  
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }
    
    await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

// User Schema (simplified for serverless)
const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  firstName: String,
  lastName: String,
  role: { type: String, enum: ['customer', 'hotelOwner'], default: 'customer' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

// Express app setup
const app = express()

// Middleware
app.use(cors())

// Webhook endpoint (before express.json())
app.post('/api/webhooks/clerk', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    await connectToDatabase();
    
    // Simple webhook processing without signature verification for now
    const payload = JSON.parse(req.body.toString());
    const { type, data } = payload;
    
    console.log('Webhook received:', type, data);
    
    if (type === 'user.created') {
      const { id, email_addresses, first_name, last_name, public_metadata } = data;
      
      const newUser = new User({
        clerkId: id,
        email: email_addresses[0]?.email_address,
        firstName: first_name,
        lastName: last_name,
        role: public_metadata?.role || 'customer'
      });
      
      await newUser.save();
      console.log('User created in database:', newUser);
    }
    
    if (type === 'user.updated') {
      const { id, email_addresses, first_name, last_name, public_metadata } = data;
      
      await User.findOneAndUpdate(
        { clerkId: id },
        {
          email: email_addresses[0]?.email_address,
          firstName: first_name,
          lastName: last_name,
          role: public_metadata?.role || 'customer',
          updatedAt: new Date()
        }
      );
      console.log('User updated in database');
    }
    
    if (type === 'user.deleted') {
      await User.findOneAndDelete({ clerkId: data.id });
      console.log('User deleted from database');
    }
    
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook processing failed', message: error.message });
  }
})

// Regular middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Basic routes
app.get('/', (req, res) => res.json({
  message: "Hotel Booking API is Working Fine!",
  timestamp: new Date().toISOString(),
  environment: "production"
}))

app.get('/api', (req, res) => res.json({
  message: "API endpoint is working!",
  timestamp: new Date().toISOString()
}))

app.get('/api/test', (req, res) => res.json({
  message: "Test endpoint working!",
  timestamp: new Date().toISOString()
}))

// Get all users (for testing)
app.get('/api/users', async (req, res) => {
  try {
    await connectToDatabase();
    const users = await User.find().select('-__v');
    res.json({ users, count: users.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
