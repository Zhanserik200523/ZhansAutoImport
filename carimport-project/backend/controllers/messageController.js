const Message = require('../models/Message')
const User = require('../models/User')

exports.getChatUsers = async (req, res) => {
    try {
        const distinctIds = await Message.distinct('userId')
        const users = await User.find({ _id: { $in: distinctIds } }).select('_id firstName lastName email')
        res.json(users)
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при получении пользователей' })
    }
}

exports.getMessagesByUser = async (req, res) => {
    try {
        const messages = await Message.find({ userId: req.params.id })
        res.json(messages)
    } catch (err) {
        res.status(500).json({ error: 'Ошибка при получении сообщений' })
    }
}

exports.updateMessage = io => async (req, res) => {
    const { text } = req.body
    try {
        const msg = await Message.findByIdAndUpdate(
            req.params.id,
            { text, edited: true },
            { new: true }
        )
        io.emit('message_updated', msg)
        res.json(msg)
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при обновлении сообщения' })
    }
}

exports.deleteMessage = io => async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id)
        io.emit('message_deleted', req.params.id)
        res.json({ message: 'Сообщение удалено' })
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при удалении сообщения' })
    }
}

