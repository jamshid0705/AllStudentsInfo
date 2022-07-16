// const catchError=require('../utility/catchError')

const getAll=async (req,res,Model,options)=>{
  let datas
  if(options){
    datas=await Model.find().populate({
      path:options.path,
      select:options.select
    })
  }else{
    datas=await Model.find()
  }
 

  res.status(200).json({
    status:'success',
    results:datas.length,
    data:datas,
  })
}

///// get one

const getOne=async(req,res,Model)=>{
  let data
  if(options){
    data=await Model.find().populate({
      path:options.path,
      select:options.select
    })
  }else{
    data=await Model.find()
  }
  if(!data){
    throw new Error('Bunday id lik ma\'lumot mavjud emas !')
  }
  res.status(200).json({
    status:'success',
    data:data,
  })
}


/// create


const add=async(req,res,Model)=>{
  const data=await Model.create(req.body)

  res.status(200).json({
    status:'success',
    data:data,
  })
  
}

////// update

const update=async(req,res,Model)=>{
  const data=await Model.findByIdAndUpdate(req.params.id)
  
  if(!data){
    throw new Error('Bunday id lik ma\'lumot mavjud emas !')
  }
  res.status(200).json({
    status:'success',
    data:data,
  })
}

//// delete
const deleteData=async(req,res,Model)=>{
  const data=await Model.findByIdAndDelete(req.params.id)

  if(!data){
    throw new Error('Bunday id lik ma\'lumot mavjud emas !')
  }
  res.status(200).json({
    status:'success',
    data:data,
  })
}

module.exports={getAll,getOne,add,update,deleteData}