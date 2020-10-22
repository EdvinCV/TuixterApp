const { DataTypes } = require('sequelize');
const {sequelize} = require('../../config/dbconnection');

const Profile = sequelize.define('Profile', {
    profilePhoto: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    coverPhoto: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    biography: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    location: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Profile',
    timestamps: true
});

module.exports = Profile;