const express=require('express')
const districtController=require('../controller/districtController')
const Router=express.Router()

Router.route('/').get(districtController.getAllDistrict).post(districtController.addDistrict)
Router.route('/:id').delete(districtController.deleteDistrict).get(districtController.getOneDistrict).patch(districtController.updateDistrict)


module.exports=Router