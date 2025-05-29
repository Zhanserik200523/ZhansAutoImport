const { body } = require('express-validator')
const router = require('express').Router()
const { register, login } = require('../controllers/authController')

router.post(
    '/register',
    [
        body('email').isEmail().withMessage('Неверный email'),
        body('password').isLength({ min: 6 }).withMessage('Минимум 6 символов'),
        body('firstName').notEmpty().withMessage('Имя обязательно')
    ],
    register
)

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Введите корректный email'),
        body('password').notEmpty().withMessage('Введите пароль')
    ],
    login
)

module.exports = router
