const express = require('express')

const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGOURI}= require('./keys')






mongoose.connect(MONGOURI,{
    userNewUrlParser:true,
    useUnifiedTopology:true

})
mongoose.connection.on('connected', () => {
    console.log("connected to mongo, Yes it is ")
})

mongoose.connection.on('error', (err) => {
    console.log("error in connecting  ", err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

// Hy0udBYvsepBrV8K

// const customMiddleware = (req,res,next) =>{
//     console.log("middleware executed")
//     next()
// }


// // app.use(customeMiddleware)

// app.get('/', (req,res)=>{
//     res.send("hello node")
// })

// app.get('/about',customMiddleware,(req,res)=>{
//     console.log("about")
//     res.send("about page")

// }) 

app.listen(PORT,()=>{
    console.log("server in running",PORT)
})