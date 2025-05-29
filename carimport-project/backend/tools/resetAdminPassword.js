const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        const email = 'Admin@mail.ru'
        const newPassword = 'admin123'

        const user = await User.findOne({ email })
        if (!user) {
            console.log('❌ Пользователь не найден')
            return mongoose.disconnect()
        }

        user.password = await bcrypt.hash(newPassword, 10)
        await user.save()
        console.log('✅ Пароль админа сброшен на:', newPassword)

        mongoose.disconnect()
    })
    .catch(err => console.error(err))
