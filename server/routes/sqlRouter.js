const express = require('express')
const router = express.Router()
const sqlController = require('../controller/sqlController')





router.get("/", (req, res) => {
    res.send('Hello World')

})



//Students
router.get("/students", (req, res) => {sqlController.dbSQL.read(req, res, 'Aluno')})
router.get("/student/:id", (req, res) => {sqlController.dbSQL.readOne(req, res, 'Aluno')})
router.post("/student", (req, res) => {sqlController.dbSQL.add(req, res, 'Aluno')})
router.put("/student/edit/:id", (req, res) => {sqlController.dbSQL.edit(req, res, 'Aluno')})
router.delete("/student/delete/:id", (req, res) => {sqlController.dbSQL.delete(req, res, 'Aluno')})


//Courses
router.get("/courses", (req, res) => {sqlController.dbSQL.read(req, res, 'Curso')})
router.get("/course/:id", (req, res) => {sqlController.dbSQL.readOne(req, res, 'Curso')})
router.post("/course", (req, res) => {sqlController.dbSQL.add(req, res, 'Curso')})
router.put("/course/edit/:id", (req, res) => {sqlController.dbSQL.edit(req, res, 'Curso')})
router.delete("/course/delete/:id", (req, res) => {sqlController.dbSQL.delete(req, res, 'Curso')})


//Enrollments
router.get("/enrollments", (req, res) => {sqlController.dbSQL.read(req, res, 'Matricula')})
router.post("/enrollment", (req, res) => {sqlController.dbSQL.add(req, res, 'Matricula')})
router.delete("/enrollment/delete/:id", (req, res) => {sqlController.dbSQL.delete(req, res, 'Matricula')})




module.exports = router; 