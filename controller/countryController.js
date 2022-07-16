const Country=require('../model/countryModel')
const Region = require('../model/regionModel')
const {getAll,getOne,add,update,deleteData}= require('./handlerController')



const getAllCountry=(req,res)=>{
  const options={path:"regions",select:"name -countryId -_id"}
  getAll(req,res,Country,options)
}

const getOneCountry=(req,res)=>{
  const options={path:"regions",select:"name -_id"}
  getOne(req,res,Country,options)}

const addCountry=(req,res)=>{add(req,res,Country)}

const updateCountry=(req,res)=>{update(req,res,Country)}

const deleteCountry=(req,res)=>{deleteData(req,res,Country)}

const getOneCountryRegion=async(req,res)=>{
  const data=await Region.find({countryId:req.params.id})

  res.status(200).json({
    data:data
  })
}

module.exports={getAllCountry,getOneCountry,addCountry,updateCountry,deleteCountry,getOneCountryRegion}