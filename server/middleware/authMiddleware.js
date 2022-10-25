const jwt = require('jsonwebtoken')

const checkToken = async (req, res, next) => {
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

//TODO: проверка введенных полей

module.exports = {
    checkToken,
}