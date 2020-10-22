const { DataTypes } = require('sequelize');
const {sequelize} = require('../../config/dbconnection');
// Models
const Profile = require('../profile/profileModel');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    profile_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Profile,
            key: 'id',
        }
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true
});

module.exports = User;