const router = require('express').Router();
const Trip = require('../models/Trip');

// Get all trips
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips' });
  }
});

// Get trip by ID
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trip' });
  }
});

// Search trips with filters
router.post('/search', async (req, res) => {
  try {
    const { location, type, maxPrice, duration, activities } = req.body;
    let query = {};

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (type) {
      query.type = type;
    }
    if (maxPrice) {
      query.price = { $lte: maxPrice };
    }
    if (duration) {
      query.duration = { $lte: duration };
    }
    if (activities && activities.length > 0) {
      query.activities = { $in: activities };
    }

    const trips = await Trip.find(query);
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: 'Error searching trips' });
  }
});

module.exports = router;
