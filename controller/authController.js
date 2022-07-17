const User=require('../model/usersModel')
const catchError = require('../utility/catchError')
const jwt=require('jsonwebtoken')
const appError = require('../utility/appError')
const mail = require('../utility/mail')



////////// create token ////////////

const createToken=(id)=>{
  return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN})
}  

/////////// Sign up //////////

const signup=catchError(async(req,res,next)=>{
  const user=await User.create({
    name:req.body.name,
    email:req.body.email,
    role:req.body.role,
    password:req.body.password,
    passwordConfirm:req.body.passwordConfirm,
    
  })
  
  const token=createToken(user._id)

  res.status(200).json({
    status:'success',
    data:user,
    token:token
  })
})

////////// Sign in //////////

const signin=catchError(async(req,res,next)=>{
  // 1 email bilan password bor yoqligini tekshirish
  console.log(Date.now())
   const {email,password}=req.body
    if(!email || !password){
      return next(new appError('Siz email bilan password kiriting !',404))
    }
  // 2 shunday emailli user borligini tekshirish
  const user=await User.findOne({email:email})

  if(!user){
    return next(new appError('Bunday user mavjud emas! ',404))
  }

  // 3 token berish
  const token=createToken(user._id)

  res.status(200).json({
    status:'success',
    token:token
  })
})


////////// Token yaroqliligini tekshirish middleware //////

const protect=catchError(async(req,res,next)=>{
  // 1 headerdan token kelganini tekshirish
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token=req.headers.authorization.split(' ')[1]
  }

  if(!token || token=='null'){
    return next(new appError('Token mavjud emas iltimos ro\'yhatdan o\'ting !',404))
  }

  // 2 token bor bo'lsa server tokenni bilan solishtirish
  const tokencha=jwt.verify(token,process.env.JWT_SECRET)

  // console.log(tokencha)

  // 3 token dan id ni olib o'sha id lik user borligini tekshirish
  const user=await User.findOne({_id:tokencha.id})
  // console.log(user)
  if(!user){
    return next(new appError('Bunday user mavjud emas !',404))
  }

  // 4 token yaroqli ekanligini tekshirish
  // console.log(tokencha)
  if(Date.now()/1000>=tokencha.exp){
    return next(new appError('Sizning tokeningiz vaqt tugagan !',404))
  }

  req.user=user
  console.log(req.user)
  next()
})

//////////////// role middleware //////////////////

const role=(roles)=>{
  return catchError(async(req,res,next)=>{
    if(!roles.includes(req.user.role)){
      return next(new appError('Siz bu huquqga ega emassiz !',404))
    }
    next()
  })
}

////////////// Forgot password ///////////////

const forgotPassword=catchError(async(req,res,next)=>{
  // 1 email bor yo'qligini tekshiramiz
   if(!req.body.email){
    return next(new appError('Siz email kiritishingiz kerak !',404))
   }
  // 2 emaillik user bor yo'qligini tekshiramiz
  const user=await User.findOne({email:req.body.email})
  
  if(!user){
    return next(new appError('Bunday user mavjud emas !',404))
  }
  // 3 token berish. Random orqali token yasaymiz emailga jo'natish uchun. Modulda 
  const resetToken=user.resetHash()
  console.log(resetToken)

  await user.save({validateBeforeSave:false})

  // 4 emailga tokenni jo'natish
  resentLink=`${req.protocol}://${req.headers.host}/api/v1/user/forgotpassword/:${resetToken}`
  subject='Habar keldi !'
  html=`<h3><a style="color:red" href="${resentLink}">👉Reset Password</a></h3>`
  to='jamshidshamshod0705@gmail.com'
  from="jamshidshamshod0705@gmail.com"

  await mail({from,subject,to,html})

  res.status(200).json({
    status:"success",
    data:"Right"
  })
  next()
})



module.exports={signup,signin,protect,role,forgotPassword}