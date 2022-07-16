const mongoose=require('mongoose')

const DistrictSchema=new mongoose.Schema({
 name:{
  type:String
 }
})


const District=mongoose.model('districts',DistrictSchema)

module.exports=District