const express=require("express")
const connectDB= require("./config/db")

const app=express()
connectDB()

app.use(express.json({ extended:false}))


app.get('/',(req,res)=>res.send('api running'))
app.use('/api/user',require('./routes/api/user'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/bus',require('./routes/api/bus'))
app.use('/api/ticket',require('./routes/api/ticket'))


const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server started ${PORT}`)
})