const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const {
    getAllRequests,
    getMyRequests,
    createRequest,
    updateRequestStatus,
    deleteRequest
} = require('../controllers/requestController')

router.get('/', getAllRequests)
router.get('/mine', authMiddleware, getMyRequests)
router.post('/', authMiddleware, createRequest)
router.put('/:id', updateRequestStatus)
router.delete('/:id', deleteRequest)

module.exports = router
