const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')
dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // адрес твоего фронта
        methods: ['GET', 'POST'],
    },
})

const setupChat = require('./socket/chatHandler')
setupChat(io)
app.use(cors())
app.use(express.json())

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.error('❌ MongoDB error:', err))

const authRoutes = require('./routes/auth')
const profileRoutes = require('./routes/profile')
const carRoutes = require('./routes/cars')
const requestRoutes = require('./routes/requests')
const userRoutes = require('./routes/users')
const messageRoutes = require('./routes/messages')(io)
const favoriteRoutes = require('./routes/favorites')

app.use('/api/favorites', favoriteRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)
app.use('/api/requests', requestRoutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/cars', carRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/profile', profileRoutes)

app.get('/', (req, res) => {
    res.send('Server is running...')
})

const PORT = process.env.PORT || 8080
server.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`))
