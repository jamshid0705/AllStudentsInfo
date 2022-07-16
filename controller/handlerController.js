const catchError=require('../utility/catchError')

const getAll=catchError(async (req,res,next,Model)=>{
  const datas=await Model.find()

  res.status(200).json({
    status:'success',
    results:datas.length,
    data:datas,
  })
})

///// get one

const getOne=catchError(async(req,res,next,Model)=>{
  const data=await Model.findById(req.params.id)

  if(!data){
    throw new Error('Bunday id lik ma\'lumot mavjud emas !')
  }
  res.status(200).json({
    status:'success',
    data:data,
  })
})


/// create


const add=catchError(async(req,res,next,Model)=>{
  const data=await Model.create(req.body)

  res.status(200).json({
    status:'success',
    data:data,
  })
})

////// update

const update=catchError(async(req,res,next,Model)=>{
  const data=await Model.findByIdAndUpdate(req.params.id)
  
  if(!data){
    throw new Error('Bunday id lik ma\'lumot mavjud emas !')
  }
  res.status(200).json({
    status:'success',
    data:data,
  })
})

//// delete
const deleteData=catchError(async(req,res,next,Model)=>{
  const data=await Model.findByIdAndDelete(req.params.id)

  if(!data){
    throw new Error('Bunday id lik ma\'lumot mavjud emas !')
  }
  res.status(200).json({
    status:'success',
    data:data,
  })
})

module.exports={getAll,getOne,add,update,deleteData}