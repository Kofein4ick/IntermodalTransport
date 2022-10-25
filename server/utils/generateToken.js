const jwt = require('jsonwebtoken')

const generateJwt = (id, login) => {
    return jwt.sign(
        {
            id:id,
            login,
        },
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

module.exports = {
    generateJwt,
}