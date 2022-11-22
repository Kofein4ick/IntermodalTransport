const Router = require('express')
const checkRole = require('../middleware/checkRoleMiddleware')
const { getAllUsers,
        deleteUser, 
        getBestRoute, 
        getAllRoutes } = require('../controllers/user')

const router = new Router()

router.get('/', checkRole('ADMIN'), getAllUsers)

router.delete('/delete', checkRole('ADMIN'), deleteUser)

router.post('/route', getBestRoute)

router.post('/routes', getAllRoutes)

module.exports = router