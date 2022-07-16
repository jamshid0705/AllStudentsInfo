const express=require('express')

const Router=express.Router()
const studentsController=require('../controller/studentsController')

Router.route('/').get(studentsController.getAllStudent).post(studentsController.addStudent)
Router.route('/:id').delete(studentsController.deleteStudent).get(studentsController.getOneStudent).patch(studentsController.updateStudent)



module.exports=Router