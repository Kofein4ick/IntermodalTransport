const Router = require('express')
const checkRole = require('../middleware/checkRoleMiddleware')
const { getAllUsers, deleteUser } = require('../controllers/user')

const router = new Router()

router.get('/', checkRole('ADMIN'), getAllUsers)

router.delete('/delete', checkRole('ADMIN'), deleteUser)

module.exports = router