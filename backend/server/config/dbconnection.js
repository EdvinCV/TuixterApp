const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASS, {
    dialect: "mysql",
    host: process.env.DB_HOST,
});

const dbconnection = async () => {
    try {
        await sequelize.sync({force: false});
        console.log("DB connection established");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    dbconnection,
    sequelize
};