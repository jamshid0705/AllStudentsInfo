const express=require('express')

const Router=express.Router()
const groupController=require('../controller/groupController')

Router.route('/').get(groupController.getAllGroup).post(groupController.addGroup)
Router.route('/:id').delete(groupController.deleteGroup).get(groupController.getOneGroup).patch(groupController.updateGroup)



module.exports=Router