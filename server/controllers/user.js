const {User, City} = require('../models/models')
const { spawnSync } = require('child_process')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({order:[['id','ASC']]})

        return res.status(200).json({
            users,
            message:'Список пользователей успешно получен.',
        })

    } catch (error) {
        res.status(408).json({
            message:'При получении списка пользователей произошла непредвиденная ошибка.'
        })
    }
}

const deleteUser = async (req, res) => {
    try {

        const {login} = req.body
        const user = await User.findOne({where : {login}})
        if (!user) {
            return res.status(406).json({
                message:'Пользователя с таким логином не существует.'
            })
        }

        await User.destroy({where: {id: user.id}, force:true})

        return res.status(200).json({
            message:'Пользователь успешно удалён.',
        })
    } catch (error) {
        res.status(408).json({
            message:'При удалении пользователя произошла непредвиденная ошибка.'
        })
    }
}

const getBestRoute = async (req, res) => {
    try {
        //определение индекса города отправки и назначения
        const {from, to} = req.body

        //если город отправки и назначения это один и тот же город
        if (from === to) {
            return res.status(200).json({
                message:'Вы уже находитесь в городе, в который хотите направиться.'
            })
        }

        const from_city = await City.findOne({where: {name: from}})
        if (!from_city) {
            return res.status(400).json({
                message:'Города с таким названием нет.'
            })
        }

        const to_city = await City.findOne({where: {name:to}})
        if (!to_city) {
            return res.status(400).json({
                message:'Города с таким названием нет.'
            })
        }

        //получение кратчайшего пути
        let path = spawnSync('..\\AStar\\AStar.exe', ['..\\AStar\\graph.txt', `${from_city.id-1}`, `${to_city.id-1}`], { windowsVerbatimArguments: true })
        
        //парсинг результатов
        path = path.output[1].toString()
        path = path.split('\r\n')
        let result = path.map((element) =>{
            return element.split("Length")
        })

        //формирование результата
        path = result[0][0]
        path = path.split(' ')
        let res_path = []
        for (let i = 0; i < path.length; i++) {
            let temp = await City.findByPk(Number(path[i])+1)
            res_path.push(temp.name)
        }

        return res.json({
            path: res_path,
            length: result[0][1],
            message:'Наилучший путь успешно получен.',

        })
    } catch (error) {
        res.status(408).json({
            message:'При получении лучшего пути произошла непредвиденная ошибка.'
        })
    }
}

const getAllRoutes = async (req, res) => {
    try {
        //определение индекса города отправки и назначения
        const {from, to} = req.body
        
        //если город отправки и назначения это один и тот же город
        if (from === to) {
            return res.status(200).json({
                message:'Вы уже находитесь в городе, в который хотите направиться.'
            })
        }

        const from_city = await City.findOne({where: {name: from}})
        if (!from_city) {
            return res.status(400).json({
                message:'Города с таким названием нет.'
            })
        }

        const to_city = await City.findOne({where: {name:to}})
        if (!to_city) {
            return res.status(400).json({
                message:'Города с таким названием нет.'
            })
        }

        //получение всех путей
        let path = spawnSync('..\\Ant\\AntGraphColony.exe', ['..\\Ant\\graph.dat', '0', '7'], { windowsVerbatimArguments: true })
        
        //парсинг результатов
        path = path.output[1].toString()
        path = path.split('\r\n')
        let result = path.map((element) =>{
            return element.split("Length")
        })
        
        //будущий массив объектов для отправки
        const resp = []

        //подготовка результатов к отправке на фронт
        for (let i = 0; i < result.length; i++) {
            //формирование результата построчно
            path = result[i][0]
            let length = result[i][1]
            path = path.split(' ')
            let res_path = []
            for (let i = 0; i < path.length; i++) {
                let temp = await City.findByPk(Number(path[i])+1)
                res_path.push(temp.name)
            }
            let element = {
                path: res_path,
                length: length
            }
            resp.push(element)
        }
        return res.json({
            paths: resp,
            message:'Все пути успешно получены.'
        })
    } catch (error) {
        res.status(408).json({
            message:'При получении всех путей произошла непредвиденная ошибка.'
        })
    }
}

module.exports = {
    getAllUsers,
    deleteUser,
    getBestRoute,
    getAllRoutes,
}