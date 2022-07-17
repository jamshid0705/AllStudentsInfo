const Region=require('../model/regionModel')
const District=require('../model/districtModel')
const {getAll,getOne,add,update,deleteData}= require('./handlerController')



const getAllRegion=(req,res,next)=>{
  const options={path:'countryId',select:'name -_id'}
  getAll(req,res,Region,options)
}

const getOneRegion=(req,res,next)=>{
  const options={path:'countryId',select:'name -_id'}
  getOne(req,res,Region,options)}

const addRegion=(req,res,next)=>{add(req,res,Region)}

const updateRegion=(req,res,next)=>{update(req,res,Region)}

const deleteRegion=(req,res,next)=>{deleteData(req,res,Region)}

const getOneRegionAllDistrict=async(req,res)=>{
  const data=await District.find({regionId:req.params.id})

  res.status(200).json({
    data:data
  })
}

module.exports={getAllRegion,getOneRegion,addRegion,updateRegion,deleteRegion,getOneRegionAllDistrict}