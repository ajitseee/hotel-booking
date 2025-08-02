import express from 'express';
import Hotel from '../models/Hotel.js';
import Room from '../models/Room.js';

const router = express.Router();

// GET /api/hotels - Get all hotels with optional filters
router.get('/', async (req, res) => {
  try {
    const { city, minPrice, maxPrice, amenities, rating, page = 1, limit = 10 } = req.query;
    
    let query = { status: 'active' };
    
    // Add filters
    if (city) {
      query.city = new RegExp(city, 'i');
    }
    
    if (minPrice || maxPrice) {
      query['priceRange.min'] = {};
      if (minPrice) query['priceRange.min'].$gte = Number(minPrice);
      if (maxPrice) query['priceRange.max'].$lte = Number(maxPrice);
    }
    
    if (amenities) {
      const amenityList = amenities.split(',');
      query.amenities = { $in: amenityList };
    }
    
    if (rating) {
      query['rating.average'] = { $gte: Number(rating) };
    }
    
    const skip = (page - 1) * limit;
    
    const hotels = await Hotel.find(query)
      .populate('owner', 'firstName lastName email')
      .sort({ 'rating.average': -1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    const total = await Hotel.countDocuments(query);
    
    res.json({
      success: true,
      data: hotels,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hotels',
      error: error.message
    });
  }
});

// GET /api/hotels/:id - Get single hotel with rooms
router.get('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id)
      .populate('owner', 'firstName lastName email phone');
    
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }
    
    // Get rooms for this hotel
    const rooms = await Room.find({ hotel: hotel._id, 'availability.isAvailable': true });
    
    res.json({
      success: true,
      data: {
        ...hotel.toObject(),
        rooms
      }
    });
  } catch (error) {
    console.error('Error fetching hotel:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch hotel',
      error: error.message
    });
  }
});

// POST /api/hotels - Create new hotel (Hotel Owner only)
router.post('/', async (req, res) => {
  try {
    const hotelData = req.body;
    
    // Add owner from user context (you'll implement auth middleware)
    // hotelData.owner = req.user.id;
    
    const hotel = new Hotel(hotelData);
    await hotel.save();
    
    res.status(201).json({
      success: true,
      message: 'Hotel created successfully',
      data: hotel
    });
  } catch (error) {
    console.error('Error creating hotel:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create hotel',
      error: error.message
    });
  }
});

// PUT /api/hotels/:id - Update hotel
router.put('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Hotel updated successfully',
      data: hotel
    });
  } catch (error) {
    console.error('Error updating hotel:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update hotel',
      error: error.message
    });
  }
});

// DELETE /api/hotels/:id - Delete hotel
router.delete('/:id', async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { status: 'inactive' },
      { new: true }
    );
    
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: 'Hotel not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Hotel deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting hotel:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete hotel',
      error: error.message
    });
  }
});

// GET /api/hotels/search/:query - Search hotels
router.get('/search/:query', async (req, res) => {
  try {
    const searchQuery = req.params.query;
    
    const hotels = await Hotel.find({
      $and: [
        { status: 'active' },
        {
          $or: [
            { name: new RegExp(searchQuery, 'i') },
            { city: new RegExp(searchQuery, 'i') },
            { description: new RegExp(searchQuery, 'i') },
            { address: new RegExp(searchQuery, 'i') }
          ]
        }
      ]
    }).limit(20);
    
    res.json({
      success: true,
      data: hotels
    });
  } catch (error) {
    console.error('Error searching hotels:', error);
    res.status(500).json({
      success: false,
      message: 'Search failed',
      error: error.message
    });
  }
});

export default router;
