const sequelize = require('../db')
const {DataTypes} = require ('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    login: {type:DataTypes.STRING, unique:true, allowNull:false},
    password: {type:DataTypes.STRING, allowNull:false},
    role: {type:DataTypes.STRING, defaultValue:"USER"},
})

const City = sequelize.define('city', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type:DataTypes.STRING, unique:true, allowNull:false},
})

const Route = sequelize.define('route', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    from: {type:DataTypes.STRING, allowNull:false},
    to: {type:DataTypes.STRING, allowNull:false},
    visited: {type:DataTypes.TEXT, allowNull: false},
    length: {type:DataTypes.STRING},
    cost: {type:DataTypes.STRING},
    time: {type:DataTypes.STRING},
})

module.exports = {
    User,
    City,
}