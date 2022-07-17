const express=require('express')

const Router=express.Router()
const userController=require('../controller/userController')
const authController=require('../controller/authController')

Router.route('/').get(authController.protect,userController.getAllUser).post(authController.protect,userController.addUser)
Router.route('/:id').delete(authController.protect,authController.role(['admin']),userController.deleteUser).get(authController.protect,userController.getOneUser).patch(authController.protect,userController.updateUser)

Router.route('/signup').post(authController.signup)
Router.route('/signin').post(authController.signin)



module.exports=Router