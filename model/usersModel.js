const validator=require('validator')

const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
  name:{type:String,
  required:true},
  email:{
    type:String,
    required:true,
    unique:[true,'bunday email mavjud !'],
    validate:[validator.isEmail,'Bunday email mavjud !']
  },
  role:{
    type:String,
    required:true,
    enum:['admin','teacher','student'],
    default:'student'
  },
  password:{
    type:String,
    required:true,
    validate:[validator.isStrongPassword,'Siz kuchliroq password kiriting !']
  },
  passwordConfirm:{
    type:String,
    required:true,
    validate:{validator:function(val){
      return val===this.password
    },message:'Siz bir xil password kiriting!'}
  }
})

const User=mongoose.model('users',userSchema)

module.exports=User