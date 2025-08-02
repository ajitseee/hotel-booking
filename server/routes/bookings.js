import express from 'express';
import Booking from '../models/Booking.js';
import Room from '../models/Room.js';

const router = express.Router();

// GET /api/bookings - Get all bookings (with filters)
router.get('/', async (req, res) => {
  try {
    const { 
      user, 
      hotel, 
      status, 
      checkIn, 
      checkOut,
      page = 1, 
      limit = 10 
    } = req.query;
    
    let query = {};
    
    if (user) query.user = user;
    if (hotel) query.hotel = hotel;
    if (status) query.status = status;
    
    if (checkIn || checkOut) {
      query['dates.checkIn'] = {};
      if (checkIn) query['dates.checkIn'].$gte = new Date(checkIn);
      if (checkOut) query['dates.checkOut'].$lte = new Date(checkOut);
    }
    
    const skip = (page - 1) * limit;
    
    const bookings = await Booking.find(query)
      .populate('user', 'firstName lastName email')
      .populate('hotel', 'name city address')
      .populate('room', 'type name pricing')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    const total = await Booking.countDocuments(query);
    
    res.json({
      success: true,
      data: bookings,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bookings',
      error: error.message
    });
  }
});

// GET /api/bookings/:id - Get single booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('user', 'firstName lastName email phone')
      .populate('hotel', 'name city address contact')
      .populate('room', 'type name description amenities pricing');
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: error.message
    });
  }
});

// POST /api/bookings - Create new booking
router.post('/', async (req, res) => {
  try {
    const bookingData = req.body;
    
    // Validate room availability
    const room = await Room.findById(bookingData.room);
    if (!room || !room.availability.isAvailable || room.availability.availableRooms < 1) {
      return res.status(400).json({
        success: false,
        message: 'Room is not available'
      });
    }
    
    // Calculate nights
    const checkIn = new Date(bookingData.dates.checkIn);
    const checkOut = new Date(bookingData.dates.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    // Calculate total amount
    const roomPrice = room.pricing.basePrice * nights;
    const taxes = roomPrice * 0.1; // 10% tax
    const totalAmount = roomPrice + taxes;
    
    // Create booking object
    const booking = new Booking({
      ...bookingData,
      dates: {
        ...bookingData.dates,
        nights
      },
      pricing: {
        roomPrice,
        taxes,
        totalAmount,
        currency: room.pricing.currency
      }
    });
    
    await booking.save();
    
    // Update room availability
    room.availability.availableRooms -= 1;
    if (room.availability.availableRooms === 0) {
      room.availability.isAvailable = false;
    }
    await room.save();
    
    // Populate the saved booking for response
    await booking.populate([
      { path: 'user', select: 'firstName lastName email' },
      { path: 'hotel', select: 'name city address' },
      { path: 'room', select: 'type name pricing' }
    ]);
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create booking',
      error: error.message
    });
  }
});

// PUT /api/bookings/:id - Update booking
router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate([
      { path: 'user', select: 'firstName lastName email' },
      { path: 'hotel', select: 'name city address' },
      { path: 'room', select: 'type name pricing' }
    ]);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Booking updated successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update booking',
      error: error.message
    });
  }
});

// DELETE /api/bookings/:id - Cancel booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Update booking status to cancelled
    booking.status = 'cancelled';
    booking.cancellation.isCancelled = true;
    booking.cancellation.cancelledAt = new Date();
    booking.cancellation.reason = req.body.reason || 'Cancelled by user';
    
    await booking.save();
    
    // Restore room availability
    const room = await Room.findById(booking.room);
    if (room) {
      room.availability.availableRooms += 1;
      room.availability.isAvailable = true;
      await room.save();
    }
    
    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      data: booking
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel booking',
      error: error.message
    });
  }
});

// GET /api/bookings/user/:userId - Get user's bookings
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId })
      .populate('hotel', 'name city address images')
      .populate('room', 'type name images pricing')
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: bookings
    });
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user bookings',
      error: error.message
    });
  }
});

// GET /api/bookings/booking/:bookingId - Get booking by booking ID
router.get('/booking/:bookingId', async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.bookingId })
      .populate('user', 'firstName lastName email phone')
      .populate('hotel', 'name city address contact')
      .populate('room', 'type name description amenities');
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    res.json({
      success: true,
      data: booking
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch booking',
      error: error.message
    });
  }
});

export default router;
