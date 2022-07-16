const express=require('express')
const countryController=require('../controller/countryController')

const Router=express.Router()

Router.route('/').get(countryController.getAllCountry).post(countryController.addCountry)
Router.route('/:id').delete(countryController.deleteCountry).get(countryController.getOneCountry).patch(countryController.updateCountry)

module.exports=Router