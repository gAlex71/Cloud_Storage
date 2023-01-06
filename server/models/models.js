const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    diskSpace: { type: DataTypes.INTEGER, defaultValue: 1024**3 },
    usedSpace: { type: DataTypes.INTEGER, defaultValue: 0 },
    avatar: { type: DataTypes.STRING, defaultValue: '' }
}, {timestamps: false, tableName: 'user'})

const File = sequelize.define('file', {
    name: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
    accessLink: { type: DataTypes.STRING, unique: true },
    size: { type: DataTypes.INTEGER, defaultValue: 0 },
    path: { type: DataTypes.STRING, defaultValue: '' },
    date: { type: DataTypes.DATE, defaultValue: Date.now() },
}, {timestamps: false, tableName: 'file'})

User.hasMany(File)
File.belongsTo(User)

module.exports = {
    User,
    File
}