const dotenv=require('dotenv').config({path:'config.env'})
const db=require('./config/db')
db()

const app=require('./middleware/app')




app.listen(process.env.PORT,()=>{
  console.log("Port sizni tinglamoqda !")
})

