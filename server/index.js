require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const models = require('./models/models')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')

const app = express()
const PORT = process.env.PORT || 5000

//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)

async function start() {
    try {
        await sequelize.authenticate() //установка подключения к базе данных
        await sequelize.sync() //функция, сверяющая состояние базы данных со схемой данных
        
        app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()