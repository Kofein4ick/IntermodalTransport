const Router = require('express')
const { saveRoute, getUserRoutes, deleteRoute } = require('../controllers/route')
const { checkToken } = require('../middleware/authMiddleware')

const router = new Router()

router.post('/save', checkToken, saveRoute)

router.get('/user', checkToken, getUserRoutes)

router.delete('/:id', checkToken, deleteRoute)

module.exports = router