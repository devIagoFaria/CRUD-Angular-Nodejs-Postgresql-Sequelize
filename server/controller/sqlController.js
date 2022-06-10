const express = require('express')
const router = express.Router()
const database = require('../db')

router.get("/", (req, res) => {
    res.send('Hello World')

})


const dbSQL = {
    read: async (req, res, Model) => {



        try {

            if (Model == 'Matricula') {
                dbSQL.readEnrollments(req, res);
                return false
            }

            let Params = require(`../model/${Model}`)

            await database.sync()
            const model = await Params.findAll()
            await res.json(model)

        }

        catch (e) {

            console.log('Error: ', e)

        }


    },
    readOne: async (req, res, Model) => {

        let id = req.params.id
        let Params = require(`../model/${Model}`)

        try {

            await database.sync();
            const model = await Params.findByPk(id)

            await res.json(model)


        } catch (e) {

            console.log('Error: ', e)

        }


    },
    readEnrollments: async (req, res) => {

        let Alunos = require('../model/aluno')
        const Cursos = require('../model/Curso')

        await database.sync();

        const inscrição = await Alunos.findAll({ include: Cursos });

        res.json(inscrição)


    },
    add: async (req, res, Model) => {

        let Params = require(`../model/${Model}`)

        try {

            await database.sync();

            //STUDENTS
            if (Model == 'Aluno') {

                await Params.create({

                    nome_aluno: req.body.name,
                    email: req.body.email,
                    tel: req.body.tel

                }).then(res => { console.log(res) })
            }

            //COURSES
            else if (Model == 'Curso') {

                await Params.create({
                    nome_curso: req.body.name,
                    description: req.body.description,
                    time: req.body.time
                })
            }

            //ENROLLMENTS
            else if (Model == 'Matricula') {

                let Alunos = require('../model/aluno')
                const Cursos = require('../model/Curso')

                let id_aluno = parseFloat(req.body.id_aluno)
                let id_curso = parseFloat(req.body.id_curso)


                await Alunos.findByPk(id_aluno).then(aluno => {
                    aluno.addCursos(id_curso).then(s => {
                        console.log(s)
                    })
                })

            }


            await res.send('Adicionado')

        }

        catch (e) {
            res.send(e)
        }


    },
    edit: async (req, res, Model) => {

        let Params = require(`../model/${Model}`)

        let id = req.params.id

        try {

            await database.sync();

            //STUDENTS
            if (Model == 'Aluno') {

                const aluno = await Params.findByPk(id)

                aluno.nome_aluno = req.body.name
                aluno.email = req.body.email
                aluno.tel = req.body.tel

                await aluno.save();
            }

            //COURSES
            else if (Model == 'Curso') {

                const curso = await Params.findByPk(id)

                curso.nome_curso = req.body.name
                curso.description = req.body.description
                curso.time = req.body.time

                await curso.save();

                res.send('Editado')
            }


            await res.send('Editado')

        }

        catch (e) {
            res.send(e)
        }


    },
    delete: async (req, res, Model) => {

        let Params = require(`../model/${Model}`)
        let Alunos = require(`../model/Aluno`)
        let Cursos = require(`../model/Curso`)

        let id = req.params.id



        try {

            await database.sync();

            let association;


            
            if(Model == 'Aluno'){
              association = await Params.findByPk(id, {include: Cursos})

            }


            else if(Model == 'Curso'){
                association = await Params.findByPk(id, {include: Alunos})

            }


            else{
                
                association = await Params.findByPk(id)
            }
            

            if(association.cursos == "" || association.alunos == "" || Model == 'Matricula'){
               await association.destroy();
                res.json({message: `Deletado com sucesso!`})
            }
            else{
                res.json({message: `${Model} está vinculado e não é possivel excluir`})
            }




        }

        catch (e) {

            console.log('Error: ', e)

        }
    }

}




module.exports = { dbSQL }; 