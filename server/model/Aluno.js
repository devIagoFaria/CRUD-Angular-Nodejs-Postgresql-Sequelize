const Sequilize = require('sequelize')
const database = require('../db')


const Curso = require('./Curso')
const Matricula = require('./Matricula')



const Aluno = database.define('aluno', {
    id: {
        type: Sequilize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_aluno: {
        type: Sequilize.STRING(100),
        allowNull: false
    },
    email: {
        type: Sequilize.STRING(100),
        allowNull: false
    },
    tel: {
        type: Sequilize.STRING(20),
        allowNull: false
    }

})



//Associoações
Aluno.belongsToMany(Curso, {
    through: {
        model: Matricula
    },
    foreignKey: 'idAluno',
    constraints: true
})

Curso.belongsToMany(Aluno, {
    through: {
        model: Matricula
    },
    foreignKey: 'idCurso',
    constraints: true
})



module.exports = Aluno