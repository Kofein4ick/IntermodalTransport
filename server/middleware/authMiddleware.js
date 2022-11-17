const jwt = require('jsonwebtoken')
const { validationSchema } = require('../utils/validationSchema')

const checkToken = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        //получение токена
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({
                message:'Пользователь не авторизован.'
            })
        }

        //раскодирование токена
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded

        next()

    } catch (error) {
        res.status(408).json({
            message:'Непредвиденная ошибка.'
        })
    }
}

const checkFields = (req, res, next) => {
    const {login, password} = req.body

    const payload = {
        email: login,
        password: password,
    }

    const {error} = validationSchema.validate(payload)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    next()
}

module.exports = {
    checkToken,
    checkFields,
}