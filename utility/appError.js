class appError extends Error{
  constructor(message,statusCode){
    super(message),
    this.message=message,
    this.statusCode=statusCode
    this.status=this.statusCode===404?"Fail":"Error"
  }
}

// console.log(Error)

module.exports=appError