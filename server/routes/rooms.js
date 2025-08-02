import express from 'express';
import Room from '../models/Room.js';

const router = express.Router();

// GET /api/rooms - Get all rooms with filters
router.get('/', async (req, res) => {
  try {
    const { 
      hotel, 
      type, 
      minPrice, 
      maxPrice, 
      adults, 
      children, 
      available = true,
      page = 1, 
      limit = 10 
    } = req.query;
    
    let query = {};
    
    if (hotel) query.hotel = hotel;
    if (type) query.type = type;
    if (available === 'true') query['availability.isAvailable'] = true;
    
    if (minPrice || maxPrice) {
      query['pricing.basePrice'] = {};
      if (minPrice) query['pricing.basePrice'].$gte = Number(minPrice);
      if (maxPrice) query['pricing.basePrice'].$lte = Number(maxPrice);
    }
    
    if (adults) {
      query['capacity.adults'] = { $gte: Number(adults) };
    }
    
    if (children) {
      query['capacity.children'] = { $gte: Number(children) };
    }
    
    const skip = (page - 1) * limit;
    
    const rooms = await Room.find(query)
      .populate('hotel', 'name city address rating images')
      .sort({ 'pricing.basePrice': 1 })
      .skip(skip)
      .limit(Number(limit));
    
    const total = await Room.countDocuments(query);
    
    res.json({
      success: true,
      data: rooms,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch rooms',
      error: error.message
    });
  }
});

// GET /api/rooms/:id - Get single room
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)
      .populate('hotel', 'name city address rating images contact amenities');
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }
    
    res.json({
      success: true,
      data: room
    });
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch room',
      error: error.message
    });
  }
});

// POST /api/rooms - Create new room
router.post('/', async (req, res) => {
  try {
    const roomData = req.body;
    
    // Set available rooms to total rooms initially
    if (!roomData.availability.availableRooms) {
      roomData.availability.availableRooms = roomData.availability.totalRooms;
    }
    
    const room = new Room(roomData);
    await room.save();
    
    res.status(201).json({
      success: true,
      message: 'Room created successfully',
      data: room
    });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create room',
      error: error.message
    });
  }
});

// PUT /api/rooms/:id - Update room
router.put('/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Room updated successfully',
      data: room
    });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update room',
      error: error.message
    });
  }
});

// DELETE /api/rooms/:id - Delete room
router.delete('/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    
    if (!room) {
      return res.status(404).json({
        success: false,
        message: 'Room not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Room deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete room',
      error: error.message
    });
  }
});

// GET /api/rooms/hotel/:hotelId - Get rooms by hotel
router.get('/hotel/:hotelId', async (req, res) => {
  try {
    const rooms = await Room.find({ 
      hotel: req.params.hotelId,
      'availability.isAvailable': true 
    }).sort({ 'pricing.basePrice': 1 });
    
    res.json({
      success: true,
      data: rooms
    });
  } catch (error) {
    console.error('Error fetching hotel rooms:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hotel rooms',
      error: error.message
    });
  }
});

export default router;
