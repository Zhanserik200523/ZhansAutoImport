const Request = require('../models/Request')
const Car = require('../models/Car')
const sendEmail = require('../utils/sendEmail')

exports.getAllRequests = async (req, res) => {
    try {
        const requests = await Request.find().populate('car').sort({ createdAt: -1 })
        res.json(requests)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Ошибка при получении заявок' })
    }
}

exports.getMyRequests = async (req, res) => {
    try {
        const requests = await Request.find({ user: req.user.id }).populate('car')
        res.json(requests)
    } catch (err) {
        res.status(500).json({ message: 'Ошибка при получении заявок' })
    }
}

exports.createRequest = async (req, res) => {
    try {
        const newReq = new Request({
            ...req.body,
            user: req.user.id
        })
        await newReq.save()

        const carInfo = await Car.findById(req.body.car)
        await sendEmail({ ...req.body, car: carInfo })

        res.status(201).json({ message: 'Заявка создана' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Ошибка при создании заявки' })
    }
}

exports.updateRequestStatus = async (req, res) => {
    try {
        const updated = await Request.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
        res.json(updated)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Ошибка при обновлении статуса' })
    }
}

exports.deleteRequest = async (req, res) => {
    try {
        await Request.findByIdAndDelete(req.params.id)
        res.json({ message: 'Заявка удалена' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Ошибка при удалении заявки' })
    }
}
