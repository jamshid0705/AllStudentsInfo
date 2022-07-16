const express=require('express')

const Router=express.Router()
const schoolController=require('../controller/schoolController')

Router.route('/').get(schoolController.getAllSchool).post(schoolController.addSchool)
Router.route('/:id').delete(schoolController.deleteSchool).get(schoolController.getOneSchool).patch(schoolController.updateSchool)



module.exports=Router