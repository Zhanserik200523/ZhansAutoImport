const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const {
    getProfile,
    updatePassword,
    updateProfile
} = require('../controllers/profileController')

router.get('/', authMiddleware, getProfile)
router.put('/password', authMiddleware, updatePassword)
router.put('/profile', authMiddleware, updateProfile)

module.exports = router
