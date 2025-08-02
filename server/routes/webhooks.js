import express from 'express';
import { Webhook } from 'svix';
import User from '../models/User.js';

const router = express.Router();

// POST /api/webhooks/clerk - Handle Clerk webhooks
router.post('/clerk', async (req, res) => {
  console.log('🚀 Webhook received!');
  console.log('Headers:', Object.keys(req.headers));
  console.log('Body type:', typeof req.body);
  
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    
    console.log('Webhook secret exists:', !!WEBHOOK_SECRET);
    console.log('Webhook secret preview:', WEBHOOK_SECRET ? WEBHOOK_SECRET.substring(0, 10) + '...' : 'NOT SET');
    
    if (!WEBHOOK_SECRET) {
      console.error('❌ CLERK_WEBHOOK_SECRET not found');
      return res.status(500).json({
        success: false,
        message: 'Webhook secret not configured'
      });
    }

    // Get the headers
    const headers = req.headers;
    const payload = req.body;

    // Get the Svix headers for verification
    const svix_id = headers['svix-id'];
    const svix_timestamp = headers['svix-timestamp'];
    const svix_signature = headers['svix-signature'];

    console.log('Svix headers check:');
    console.log('- svix-id:', !!svix_id);
    console.log('- svix-timestamp:', !!svix_timestamp);
    console.log('- svix-signature:', !!svix_signature);

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('❌ Missing Svix headers');
      return res.status(400).json({
        success: false,
        message: 'Error occurred -- no svix headers'
      });
    }

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;

    // Verify the payload with the headers
    try {
      console.log('🔍 Verifying webhook signature...');
      evt = wh.verify(payload, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      });
      console.log('✅ Webhook signature verified');
    } catch (err) {
      console.error('❌ Error verifying webhook:', err.message);
      return res.status(400).json({
        success: false,
        message: 'Error occurred during verification',
        error: err.message
      });
    }

    // Handle the webhook
    const eventType = evt.type;
    const userData = evt.data;

    console.log(`🎯 Webhook received: ${eventType}`);
    console.log('📊 User data:', JSON.stringify(userData, null, 2));

    switch (eventType) {
      case 'user.created':
        console.log('👤 Processing user.created event');
        await handleUserCreated(userData);
        break;
      case 'user.updated':
        await handleUserUpdated(userData);
        break;
      case 'user.deleted':
        await handleUserDeleted(userData);
        break;
      default:
        console.log(`Unhandled webhook event: ${eventType}`);
    }

    res.status(200).json({
      success: true,
      message: 'Webhook processed successfully'
    });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({
      success: false,
      message: 'Webhook processing failed',
      error: error.message
    });
  }
});

// Helper function to handle user creation
async function handleUserCreated(userData) {
  try {
    console.log('🔄 Starting user creation process...');
    console.log('User data ID:', userData.id);
    console.log('User email:', userData.email_addresses?.[0]?.email_address);
    
    // Check if user already exists
    const existingUser = await User.findOne({ clerkId: userData.id });
    if (existingUser) {
      console.log('⚠️ User already exists, skipping creation');
      return;
    }
    
    const user = new User({
      clerkId: userData.id,
      email: userData.email_addresses[0]?.email_address,
      firstName: userData.first_name || '',
      lastName: userData.last_name || '',
      profileImage: userData.profile_image_url || '',
      phone: userData.phone_numbers[0]?.phone_number || '',
      role: 'customer' // Default role
    });

    console.log('💾 Saving user to database...');
    const savedUser = await user.save();
    console.log(`✅ User created in database: ${savedUser.email} (ID: ${savedUser._id})`);
    
    return savedUser;
  } catch (error) {
    console.error('❌ Error creating user:', error);
    if (error.code === 11000) {
      console.error('❌ Duplicate key error - user may already exist');
    }
    throw error;
  }
}

// Helper function to handle user updates
async function handleUserUpdated(userData) {
  try {
    const user = await User.findOne({ clerkId: userData.id });
    
    if (user) {
      user.email = userData.email_addresses[0]?.email_address || user.email;
      user.firstName = userData.first_name || user.firstName;
      user.lastName = userData.last_name || user.lastName;
      user.profileImage = userData.profile_image_url || user.profileImage;
      user.phone = userData.phone_numbers[0]?.phone_number || user.phone;
      
      await user.save();
      console.log(`✅ User updated in database: ${user.email}`);
    } else {
      console.log(`⚠️ User not found for update: ${userData.id}`);
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Helper function to handle user deletion
async function handleUserDeleted(userData) {
  try {
    const user = await User.findOneAndDelete({ clerkId: userData.id });
    
    if (user) {
      console.log(`✅ User deleted from database: ${user.email}`);
    } else {
      console.log(`⚠️ User not found for deletion: ${userData.id}`);
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export default router;
