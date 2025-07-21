import User from '../models/User.js';
import { Webhook } from 'svix';

const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        // getting header
        const headers = {
            'svix-id': req.headers['svix-id'],
            'svix-timestamp': req.headers['svix-timestamp'],
            'svix-signature': req.headers['svix-signature']
        };

        // verify the webhook signature
        let evt;
        try {
            evt = whook.verify(JSON.stringify(req.body), headers);
        } catch (err) {
            console.log('Webhook signature verification failed:', err.message);
            return res.status(400).json({ 
                success: false, 
                message: 'Webhook signature verification failed' 
            });
        }

        // getting the data from the verified event
        const { data, type } = evt;
        console.log('Webhook event type:', type);

        // Handle different webhook events
        switch (type) {
            case 'user.created':
                await handleUserCreated(data);
                break;
            case 'user.updated':
                await handleUserUpdated(data);
                break;
            case 'user.deleted':
                await handleUserDeleted(data);
                break;
            default:
                console.log(`Unhandled webhook event type: ${type}`);
        }

        res.status(200).json({ 
            success: true, 
            message: 'Webhook processed successfully' 
        });

    } catch (error) {
        console.error('Webhook error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error' 
        });
    }
}

// Handle user creation
const handleUserCreated = async (data) => {
    try {
        // Extract role from public metadata (set during sign-up)
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

        // Create new user
        const newUser = new User(userData);
        await newUser.save();
        
        console.log('User created successfully:', newUser.email);
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

// Handle user updates
const handleUserUpdated = async (data) => {
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

        const user = await User.findOneAndUpdate(
            { clerkId: data.id },
            updateData,
            { new: true, upsert: true }
        );
        
        console.log('User updated successfully:', user.email);
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

// Handle user deletion
const handleUserDeleted = async (data) => {
    try {
        await User.findOneAndDelete({ clerkId: data.id });
        console.log('User deleted successfully:', data.id);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

export default clerkWebhooks;