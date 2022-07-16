const express=require('express')

const Router=express.Router()
const userController=require('../controller/userController')

Router.route('/').get(userController.getAllUser).post(userController.addUser)
Router.route('/:id').delete(userController.deleteUser).get(userController.getOneUser).patch(userController.updateUser)

Router.route('/signup').post(userController.signup)



module.exports=Router