const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['domestic', 'international'],
    required: true
  },
  activities: [{
    type: String
  }],
  healthRequirements: [{
    type: String
  }],
  ageRecommendation: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  }
});

module.exports = mongoose.model('Trip', tripSchema);
