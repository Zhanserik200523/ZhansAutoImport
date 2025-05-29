const express = require('express')
const {
    getChatUsers,
    getMessagesByUser,
    updateMessage,
    deleteMessage
} = require('../controllers/messageController')

module.exports = function(io) {
    const router = express.Router()

    router.get('/users', getChatUsers)
    router.get('/by-user/:id', getMessagesByUser)
    router.put('/:id', updateMessage(io))
    router.delete('/:id', deleteMessage(io))

    return router
}
