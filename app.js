import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"
import cors from "cors"
import validator from "express-validator"
import path from "path"

//importing routes
import authRoutes from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes"
import adminRoutes from "./routes/adminRoutes"
import queryRoutes from "./routes/queryRoutes"
import orderRoutes from "./routes/orderRoutes"

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

/** This validation middleware checks the request body contains the required fields and 
 whether they are in correct format or not*/ 
app.use(validator())


app.use('/api',authRoutes)
app.use('/api',userRoutes)
app.use('/api',adminRoutes)
app.use('/api',queryRoutes)
app.use('/api',orderRoutes)

if(process.env.NODE_ENV == "production"){
    app.use(express.static('client/build'))
    const path = require('path');
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", 'index.html'))
    })
}


module.exports=app