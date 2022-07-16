const mongoose=require('mongoose')

const regionSchema=new mongoose.Schema({
  name:{
    type:String,
  },
  countryId:{
    type:mongoose.Schema.ObjectId,
    ref:'countries'
  }
})

const Region=mongoose.model('regions',regionSchema)

module.exports=Region