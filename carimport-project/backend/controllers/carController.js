const Car = require('../models/Car');

exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find().sort({ createdAt: -1 });
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при получении машин' });
    }
};

exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: 'Машина не найдена' });
        res.json(car);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

exports.createCar = async (req, res) => {
    try {
        const imageUrls = req.files.map(file => `http://localhost:8080/uploads/${file.filename}`);
        const newCar = new Car({ ...req.body, images: imageUrls });
        await newCar.save();
        res.status(201).json(newCar);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка при добавлении машины' });
    }
};

exports.updateCar = async (req, res) => {
    try {
        const imageUrls = req.files.map(file => `http://localhost:8080/uploads/${file.filename}`);
        const updateData = { ...req.body };
        if (imageUrls.length > 0) updateData.images = imageUrls;

        const updated = await Car.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка при обновлении' });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.params.id);
        res.json({ message: 'Машина удалена' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Ошибка при удалении' });
    }
};
