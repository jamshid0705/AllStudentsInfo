const express=require('express')
const app=express()
const countryRout=require('../routers/countryRout')
const groupRout=require('../routers/groupRout')
const schoolRout=require('../routers/schoolRout')
const studentRout=require('../routers/studentRout')
const districtRout=require('../routers/districtRout')
const regionRout=require('../routers/regionRout')
const userRout=require('../routers/userRout')

const appError=require('../utility/appError')

app.use(express.json())

app.use('/api/v1/country',countryRout)
app.use('/api/v1/group',groupRout)
app.use('/api/v1/school',schoolRout)
app.use('/api/v1/student',studentRout)
app.use('/api/v1/district',districtRout)
app.use('/api/v1/region',regionRout)
app.use('/api/v1/user',userRout)


app.all('*',function(req,res,next){  // bu error noto'g'ri page ni ushlab qoladi
  // const err={
  //   statusCode:404,
  //   status:'fail',
  //   message:'Not page'
  // }
  next(new appError('Not page',404))
})

app.use((err,req,res,next)=>{  // appErrorga kelgan xatolarni bu funksiyaning err elementi ushlab qoladi
  err.status=err.status || 'fail',
  err.statusCode=err.statusCode || 404,
  err.message=err.message || 'Not found'

  res.status(err.statusCode).json({
    status:err.status,
    data:err.message
  })
  next()
})


module.exports=app