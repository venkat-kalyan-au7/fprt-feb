import app from "./app"
require('dotenv').config()
import mongoose from "mongoose"


//database connection
mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true
}).then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log("failed to connect database: ",err)
})

//connecting to port
const PORT = process.env.PORT||4000
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})