const District=require('../model/districtModel')
const {getAll,getOne,add,update,deleteData}= require('./handlerController')



const getAllDistrict=(req,res,next)=>{
  const options={path:'regionId',extraselect:"-__v -_id -countryId"}
  getAll(req,res,District,options)}

const getOneDistrict=(req,res,next)=>{
  const options={path:'regionId',select:"-__v -_id -countryId"}
  getOne(req,res,District)}

const addDistrict=(req,res,next)=>{add(req,res,District)}

const updateDistrict=(req,res,next)=>{update(req,res,District)}

const deleteDistrict=(req,res,next)=>{deleteData(req,res,District)}

module.exports={getAllDistrict,getOneDistrict,addDistrict,updateDistrict,deleteDistrict}