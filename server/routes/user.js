const Router = require('express')
const checkRole = require('../middleware/checkRoleMiddleware')
const { getAllUsers } = require('../controllers/user')

const router = new Router()

router.get('/', checkRole('ADMIN'), getAllUsers)

module.exports = router