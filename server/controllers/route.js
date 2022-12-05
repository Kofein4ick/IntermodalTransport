const { SavedRoute } = require('../models/models')

const saveRoute = async (req, res) => {
    try {
        //получение данных для сохранения маршрута
        const {id} = req.user
        let {from, to, visited, length, cost} = req.body

        visited = visited.join(' ')

        //занесение пути в бд
        const route = await SavedRoute.create({
            from,
            to,
            visited,
            length,
            cost,
            userId: id
        })

        return res.status(200).json({
            message:'Путь успешно сохранён.',
        })

    } catch (error) {
        res.status(408).json({
            message:'При добавлении пути произошла непредвиденная ошибка.'
        })
    }
}

const getUserRoutes = async (req, res) => {
    try {
        //получение путей пользователя
        const {id} = req.user

        const routes = await SavedRoute.findAll({where: {userId: id}})
        if (!routes) {
            return res.status(406).json({
                message:'У пользователя нет сохранённых путей.'
            })
        }

        return res.status(200).json({
            routes
        })

    } catch (error) {
        res.status(408).json({
            message:'При получении списка путей произошла непредвиденная ошибка.'
        })
    }
}

const deleteRoute = async (req, res) => {
    try {
        //проверка существования пути
        const route = await SavedRoute.findByPk(req.params.id)
        if (!route) {
            return res.status(406).json({
                message:'Такого пути не существует.'
            })
        }

        //удаление пути
        await SavedRoute.destroy({where: {id: route.id}, force:true})

        return res.status(200).json({
            message:'Путь успешно удалён.',
        })

    } catch (error) {
        res.status(408).json({
            message:'При удалении пути произошла непредвиденная ошибка.'
        })
    }
}

module.exports = {
    saveRoute,
    getUserRoutes,
    deleteRoute,
}