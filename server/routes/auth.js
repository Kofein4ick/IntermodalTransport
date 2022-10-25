const Router = require('express')
const {registration, login, getUser} = require('../controllers/auth')
const { checkToken, checkFields } = require('../middleware/authMiddleware')

const router = new Router()

router.post('/registration', registration)

router.post('/login', checkFields, login)

router.get('/check', checkToken, getUser)

module.exports = router