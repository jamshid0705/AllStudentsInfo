const User=require('../model/usersModel')
const catchError = require('../utility/catchError')
const jwt=require('jsonwebtoken')

const {getAll,getOne,add,update,deleteData}= require('./handlerController')



const getAllUser=(req,res,next)=>{getAll(req,res,next,User)}

const getOneUser=(req,res,next)=>{getOne(req,res,next,User)}

const addUser=(req,res,next)=>{add(req,res,next,User)}

const updateUser=(req,res,next)=>{update(req,res,next,User)}

const deleteUser=(req,res,next)=>{deleteData(req,res,next,User)}

/////////// Sign up //////////

const signup=catchError(async(req,res,next)=>{
  const user=await User.create({
    name:req.body.name,
    email:req.body.email,
    role:req.body.role,
    password:req.body.password
  })

  const token=jwt.sign(user._id,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})

  res.status(200).json({
    status:'success',
    token:token
  })
})

module.exports={getAllUser,getOneUser,addUser,updateUser,deleteUser,signup}