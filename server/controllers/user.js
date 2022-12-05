const {User, City, Route} = require('../models/models')
const {Op} = require('sequelize')
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
        const user = await User.findOne({where : {id: req.params.id}})
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
        console.log("Сервер  best")
        const {from, to, mode} = req.body
        console.log("Сервер best принял", {from, to, mode})

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
        let path = spawnSync('..\\AStar\\AStar.exe', [ `${from_city.id}`, `${to_city.id}`, `${mode}`], { windowsVerbatimArguments: true })
        //парсинг результатов
        path = path.output[1].toString()
        path = path.split('\r\n')

        //проверка на существование маршрута
        if (path[0].length === 0) {
            return res.status(400).json({
                message:'Пути между городами не существует.',
    
            })
        }

        //формирование результата
        let result = path.map((element) =>{
            return element.split("Length")
        })
        path = result[0][0]
        path = path.split(' ')
        let res_path = []
        let temp
        for (let i = 0; i < path.length; i++) {
            temp = await City.findByPk(Number(path[i]))
            res_path.push(temp.name)
        }

        //для многокритериального
        let length = 0
        let cost = 0

        switch (mode) {
            case '0':
                return res.status(200).json({
                    path: res_path,
                    length: result[0][1],
                    message:'Наилучший путь успешно получен.',
                })
                break

            case '1':
                return res.status(200).json({
                    path: res_path,
                    cost: result[0][1],
                    message:'Наилучший путь успешно получен.',
                })
                break

            case '2':
                for (let i = 0; i < path.length-1; i++) {
                    temp = await Route.findOne({
                        where: {
                            [Op.and] : [
                                {from: path[i]},
                                {to: path[i+1]}
                            ]
                        }
                    })
                    length = length + Number(temp.length)
                    cost = cost + Number(temp.cost)
                }
                return res.status(200).json({
                    path: res_path,
                    length: length.toString(),
                    cost: cost.toString(),
                    message:'Наилучший путь успешно получен.',
                })
                break

            default:
                break
        }
    } catch (error) {
        res.status(408).json({
            message:'При получении лучшего пути произошла непредвиденная ошибка.'
        })
    }
}

const getAllRoutes = async (req, res) => {
    try {
        console.log("Сервер  all")
        //определение индекса города отправки и назначения
        const {from, to, mode} = req.body
        console.log("Сервер all принял: ", {from, to, mode})
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
        let path = spawnSync('..\\Ant\\Ants.exe', [ `${from_city.id}`, `${to_city.id}`,`${mode}`], { windowsVerbatimArguments: true })
        
        //парсинг результатов
        path = path.output[1].toString()
        path = path.split('\r\n')
        let result = path.map((element) =>{
            return element.split("Length")
        })

        //проверка на существование маршрута
        if (path[0].length === 0) {
            return res.status(400).json({
                message:'Пути между городами не существует.',
    
            })
        }

        //будущий массив объектов для отправки
        const resp = []
        let element
        //подготовка результатов к отправке на фронт
        for (let i = 0; i < result.length; i++) {
            //формирование результата построчно
            path = result[i][0]
            let length = result[i][1]
            let cost = 0
            path = path.split(' ')
            let res_path = []
            for (let i = 0; i < path.length; i++) {
                let temp = await City.findByPk(Number(path[i]))
                res_path.push(temp.name)
            }
            switch (mode) {
                case '0':
                    element = {
                        path: res_path,
                        length: length
                    } 
                    break
    
                case '1':
                    element = {
                        path: res_path,
                        cost: length
                    }
                    break
    
                case '2':
                    length = 0
                    for (let i = 0; i < path.length-1; i++) {
                        temp = await Route.findOne({
                            where: {
                                [Op.and] : [
                                    {from: path[i]},
                                    {to: path[i+1]}
                                ]
                            }
                        })
                        length = length + Number(temp.length)
                        cost = cost + Number(temp.cost)
                    }

                    element = {
                        path: res_path,
                        length: length.toString(),
                        cost: cost.toString(),
                    }
                    break
    
                default:
                    break
            }
            resp.push(element)
        }
        return res.status(200).json({
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