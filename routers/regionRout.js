const express=require('express')

const Router=express.Router()
const regionController=require('../controller/regionController')

Router.route('/').get(regionController.getAllRegion).post(regionController.addRegion)
Router.route('/:id').delete(regionController.deleteRegion).get(regionController.getOneRegion).patch(regionController.updateRegion)



module.exports=Router