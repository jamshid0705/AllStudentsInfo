const User=require('../model/usersModel')


const {getAll,getOne,add,update,deleteData}= require('./handlerController')



const getAllUser=(req,res)=>{getAll(req,res,User)}

const getOneUser=(req,res)=>{getOne(req,res,User)}

const addUser=(req,res)=>{add(req,res,User)}

const updateUser=(req,res)=>{update(req,res,User)}

const deleteUser=(req,res)=>{deleteData(req,res,User)}



module.exports={getAllUser,getOneUser,addUser,updateUser,deleteUser}