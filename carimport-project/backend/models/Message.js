const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sender: String,
    name: String,
    text: String,
    time: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    edited: {
        type: Boolean,
        default: false
    }

})
module.exports = mongoose.model('Message', messageSchema)
