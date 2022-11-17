const {User} = require('../models/models')

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

module.exports = {
    getAllUsers,
    deleteUser,
}