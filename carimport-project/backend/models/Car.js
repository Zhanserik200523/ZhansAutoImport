const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: String,
    model: String,
    year: Number,
    price: Number,
    mileage: Number,
    fuel: String,
    transmission: String,
    drive: String,
    condition: String,
    bodyType: String,
    engineVolume: Number,
    country: String,
    images: [String],
});

module.exports = mongoose.model('Car', carSchema);
