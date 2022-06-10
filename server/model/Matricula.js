const Sequilize = require('sequelize')
const database = require('../db')




const Matricula = database.define('matricula', {
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
})





module.exports = Matricula