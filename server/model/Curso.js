const Sequilize = require('sequelize')
const database = require('../db')


const Curso = database.define('curso', {
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_curso: {
        type: Sequilize.STRING(20),
        allowNull: false
    },
    description: {
        type: Sequilize.STRING(500),
        allowNull: false
    },
    time: {
        type: Sequilize.FLOAT,
        allowNull: false
    }

})

module.exports = Curso