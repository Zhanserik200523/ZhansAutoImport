const User = require('../models/User')

exports.getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Доступ запрещен' })

        const users = await User.find({}, '-password') // исключаем пароль
        res.json(users)
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при получении пользователей' })
    }
}

exports.updateUserRole = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Нет прав' })

        const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true })
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при смене роли' })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        if (req.user.role !== 'admin') return res.status(403).json({ message: 'Нет прав' })

        await User.findByIdAndDelete(req.params.id)
        res.json({ message: 'Пользователь удалён' })
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при удалении' })
    }
}
