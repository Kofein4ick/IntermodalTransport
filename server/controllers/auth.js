const {User} = require('../models/models')
const bcrypt = require('bcryptjs')
const {generateJwt} = require('../utils/generateToken')

const registration = async (req, res) => {
    try {
        const {login, password} = req.body

        //проверка на существование пользователя
        const candidate = await User.findOne({where: {login}})
        if (candidate) {
            return res.status(406).json({
                message:'Пользователь с такой электронной почтой уже существует.'
            })
        }

        //хеширование пароля
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)

        const user = await User.create({
            login: login,
            password: hashPassword,
        })

        //генерация токена
        const token = generateJwt(user.id, user.login)
        return res.status(200).json({
            token,
            message:'Вы успешно зарегистрировались.',
        })

    } catch (error) {
        res.status(408).json({
            message:'При регистрации произошла непредвиденная ошибка.'
        })
    }
}

const login = async (req, res) => {
    try {
        const {login, password} = req.body

        //проверка на существование пользователя
        const user = await User.findOne({where: {login}})
        if (!user) {
            return res.status(406).json({
                message:'Пользователя с таким логином не существует.'
            })
        }
        //проверка правильности введенного пароля
        const isCorrect = await bcrypt.compare(password, user.password)
        if (!isCorrect) {
            return res.status(406).json({
                message:'Неправильно введён пароль.'
            })
        }

        const token = generateJwt(user.id, user.login)
        return res.status(200).json({
            token,
            message:'Вы успешно вошли в аккаунт.',
        })

    } catch (error) {
        res.status(408).json({
            message:'При авторизации произошла непредвиденная ошибка.'
        })
    }
}

const getUser = async (req, res) => {
    try {
        const token = generateJwt(req.user.id, req.user.login)
        return res.status(200).json({
            token,
        })

    } catch (error) {
        res.status(408).json({
            message:'Не удалось получить информацию о пользователе.'
        })
    }
}

module.exports = {
    registration,
    login,
    getUser,
}