const Message = require('../models/Message')
const User = require('../models/User')

module.exports = function(io) {
    io.on('connection', (socket) => {
        console.log('🟢 Пользователь подключился:', socket.id)

        socket.on('get_messages', async (userId) => {
            const messages = await Message.find({ userId })
            socket.emit('chat_history', messages)
        })

        socket.on('send_message', async (data) => {
            const user = await User.findById(data.userId)

            const newMessage = new Message({
                sender: data.sender,
                name: user ? `${user.firstName} ${user.lastName}` : data.name || 'Без имени',
                text: data.text,
                time: data.time,
                userId: data.userId
            })

            await newMessage.save()
            io.emit('receive_message', newMessage)
        })

        socket.on('disconnect', () => {
            console.log('🔴 Пользователь отключился:', socket.id)
        })
    })
}
