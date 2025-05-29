const User = require('../models/User')

exports.getProfile = async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ message: 'User not found' })

    res.json({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        _id: user._id
    })
}

exports.updatePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body

    if (!currentPassword || !newPassword || !confirmPassword)
        return res.status(400).json({ message: 'Заполните все поля' })

    if (newPassword !== confirmPassword)
        return res.status(400).json({ message: 'Пароли не совпадают' })

    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ message: 'Пользователь не найден' })

    const isMatch = await user.comparePassword(currentPassword)
    if (!isMatch)
        return res.status(403).json({ message: 'Неверный текущий пароль' })

    user.password = newPassword
    await user.save()

    res.json({ message: 'Пароль успешно обновлён' })
}

exports.updateProfile = async (req, res) => {
    const userId = req.user.id
    const { firstName, lastName, phone, avatar } = req.body

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { firstName, lastName, phone, avatar },
            { new: true }
        ).select('-password')

        res.json(updatedUser)
    } catch (err) {
        console.error('❌ Ошибка сервера:', err)
        res.status(500).json({ message: 'Ошибка сервера' })
    }
}
