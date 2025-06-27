import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoute from './routes/authRoute.js'


dotenv.config()


const app = express()
app.use(cors({origin:process.env.CLIENT_URL, credentials:true}))
app.use(express.json())

app.use('/api/auth',authRoute)
 const PORT = process.env.PORT

 mongoose.connect(process.env.MONGO_URL)
 .then(()=> {
    console.log('Connection established successfully')
})
.catch(err => console.log(err))

app.listen( PORT || 5000, ()=> console.log(`server is running on port ${PORT}`))