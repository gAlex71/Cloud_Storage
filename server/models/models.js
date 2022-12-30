const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    diskSpace: { type: DataTypes.INTEGER },
    usedSpace: { type: DataTypes.INTEGER },
    avatar: { type: DataTypes.STRING }
}, {timestamps: false, tableName: 'user'})

const File = sequelize.define('file', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING, allowNull: false },
    access_link: { type: DataTypes.STRING, unique: true },
    size: { type: DataTypes.INTEGER },
    user_id: { type: DataTypes.INTEGER },
    parent_id: { type: DataTypes.INTEGER }
}, {timestamps: false, tableName: 'file'})

User.hasMany(File)
File.belongsTo(User)

module.exports = {
    User,
    File
}