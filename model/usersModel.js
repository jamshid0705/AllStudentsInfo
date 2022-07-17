const validator=require('validator')
const bcrypt=require('bcrypt')
const crypto=require('crypto')

const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
  name:{type:String,
    required:true},
  email:{
    type:String,
    required:true,
    unique:[true,'Bunday email mavjud !'],
    validate:[validator.isEmail,'Email  xato!']
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
    validate:{validator:function(val){
      return validator.isStrongPassword(val)
    },message:"Siz kuchliroq parol kiriting !"},
    select:false
  },
  passwordConfirm:{
    type:String,
    required:true,
    validate:{validator:function(val){
      return val===this.password
    },message:'Siz bir xil password kiriting!'}
  },
  resetTokenHash:String,
  resetTokenData:Date
})


///////////// parolni hashlash //////////

userSchema.pre('save',async function(req,res,next){  // parolni hashlash
  if(!this.isModified('password')){
    return next()
  }

  const hash=await bcrypt.hash(this.password,12)
  
  this.password=hash,
  this.passwordConfirm=undefined
  next()
})

////////////// crypto ///////////

userSchema.methods.resetHash=function(){
  const token=crypto.randomBytes(32).toString('hex')
  console.log('token',token)
  const tokenHash=crypto.createHash('sha256').update(token).digest('hex')

  this.resetTokenHash=tokenHash,
  this.resetTokenData=Date.now()+10*60*1000

  return token
}

const User=mongoose.model('users',userSchema)

module.exports=User