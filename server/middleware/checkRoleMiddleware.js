const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function(req, res, next) {

        if (req.method === "OPTIONS") {
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

            //проверка роли
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if (decoded.role !== role) {
                return res.status(403).json({
                    message:'Нет доступа к данной странице.'
                })
            }
            req.user = decoded

            next()
            
        } catch (error) {
            res.status(408).json({
                message:'Не удалось проверить роль пользователя.'
            })
        }
    }
}