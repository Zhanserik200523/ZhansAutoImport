const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const {
    getAllUsers,
    updateUserRole,
    deleteUser
} = require('../controllers/userController')

router.get('/', authMiddleware, getAllUsers)
router.put('/:id/role', authMiddleware, updateUserRole)
router.delete('/:id', authMiddleware, deleteUser)

module.exports = router