require('dotenv').config() //подключение конфига
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')

// Запуск приложения
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

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