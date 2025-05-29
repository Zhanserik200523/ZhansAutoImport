const mongoose = require('mongoose')
const User = require('../models/User')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        const email = 'Zhanserik@mail.ru'
        const user = await User.findOne({ email })

        if (!user) {
            console.log('❌ Пользователь не найден')
        } else {
            user.role = 'admin'
            await user.save()
            console.log(`✅ Назначена роль admin для: ${user.email}`)
        }

        mongoose.disconnect()
    })
    .catch(err => console.error('❌ Ошибка подключения:', err))