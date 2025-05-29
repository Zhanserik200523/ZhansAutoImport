const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    phone: String,
    country: String,
    comment: String,
    status: { type: String, default: 'новая' }

}, { timestamps: true })

module.exports = mongoose.model('Request', requestSchema)
