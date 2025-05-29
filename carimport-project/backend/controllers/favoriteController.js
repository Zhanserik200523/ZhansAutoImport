const User = require('../models/User')

exports.getFavorites = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('favorites')
        res.json(user.favorites)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Ошибка при получении избранного' })
    }
}

exports.addFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        const carId = req.params.carId

        if (!user.favorites.includes(carId)) {
            user.favorites.push(carId)
            await user.save()
        }

        res.json({ message: 'Добавлено в избранное' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Ошибка при добавлении' })
    }
}

exports.removeFavorite = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        const carId = req.params.carId

        user.favorites = user.favorites.filter(id => id.toString() !== carId)
        await user.save()

        res.json({ message: 'Удалено из избранного' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Ошибка при удалении' })
    }
}
