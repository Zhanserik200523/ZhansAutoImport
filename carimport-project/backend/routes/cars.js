const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const {
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
} = require('../controllers/carController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.get('/', getAllCars);
router.get('/:id', getCarById);
router.post('/', upload.array('images', 10), createCar);
router.put('/:id', upload.array('images', 10), updateCar);
router.delete('/:id', deleteCar);

module.exports = router;
