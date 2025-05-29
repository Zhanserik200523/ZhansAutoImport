const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const {
    getFavorites,
    addFavorite,
    removeFavorite
} = require('../controllers/favoriteController')

router.get('/', authMiddleware, getFavorites)
router.post('/:carId', authMiddleware, addFavorite)
router.delete('/:carId', authMiddleware, removeFavorite)

module.exports = router
