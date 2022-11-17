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

module.exports = {
    getAllUsers,
}