const mongoose = require('mongoose')

const rentalCarSchema = new mongoose.Schema({

    fuelType: String,
    location: {
      city: String,
      country: String,
      latitude: String,
      longitude: String,
      state: String
    }
  
})

module.exports = mongoose.model('rentalCarData', rentalCarSchema)