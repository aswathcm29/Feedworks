
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config('./env')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRoutes')
const llmRouter = require('./routes/llmRoutes')
const feedRouter = require('./routes/feedRoutes')
// const bodyParser = require("body-parser")
const app = express()

app.use(express.json())

app.use(cors());

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users',userRouter)

app.use('/llm',llmRouter)

app.use('/feeds',feedRouter)

try{
  const connect = async()=>{
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Database connected')
  }
   connect();   
}catch(err){
   console.log(err.message)
}

app.get('/',(req, res)=>{
    res.status(200).json("hello world")
})
app.listen(process.env.PORT || 5000 , () => {
  console.log('Server is running on port 5000')
})
