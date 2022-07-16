const mongoose=require('mongoose')

const DistrictSchema=new mongoose.Schema({
 name:{
  type:String
 },
 regionId:[{
  type:mongoose.Schema.ObjectId,
  ref:'regions'
}]
})


const District=mongoose.model('districts',DistrictSchema)

module.exports=District