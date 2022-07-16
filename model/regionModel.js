const mongoose=require('mongoose')

const regionSchema=new mongoose.Schema({
  name:{
    type:String,
    districtId:[{
      type:mongoose.Schema.ObjectId,
      ref:'districts'
    }]
  }
})

const Region=mongoose.model('regions',regionSchema)

module.exports=Region