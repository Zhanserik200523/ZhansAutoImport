const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        const users = await User.find()

        for (const user of users) {
            if (!user.password.startsWith('$2b$')) {
                const hashed = await bcrypt.hash(user.password, 10)
                user.password = hashed
                await user.save()
                console.log(`✅ Захеширован: ${user.email}`)
            } else {
                console.log(`ℹ️ Уже хеширован: ${user.email}`)
            }
        }

        mongoose.disconnect()
    })
    .catch(err => console.error('❌ Ошибка подключения:', err))
