import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import chalk from 'chalk'
import morgan from 'morgan'
import mongoose from 'mongoose'
import leadRouter from './router/leadRouter.js'
import newLeadRouter from './router/newLeadRouter.js'
import productRouter from './router/productRouter.js'

// ************** config settings ********************************
dotenv.config({ path: "./config/config.env" })
let port = process.env.PORT
let hostName = process.env.HOST_NAME
console.log(hostName);
let mongoUrl = process.env.MONGO_DB_URL


const app = express()

app.use(cors());   //to implement the cross origin resourse sharing to enable client access point
app.use(morgan('tiny'))  //http logger
app.use(express.json()) //to read form data
app.use(express.urlencoded({ extended: false }))



// ***********************MongoDB*******************************
mongoose.set('strictQuery', false);
// console.log(mongoUrl);
mongoose.connect(mongoUrl)
   .then((response) => {
      console.log('mongoDB connected successfully..');
   })
   .catch((err) => {
      console.log(err);
      process.exit(1)

   })

app.get('/', (request, response) => {
   response.send('<h1>Server is running successfully...!</h1>')
})

app.use('/leads', leadRouter)
app.use('/newleads', newLeadRouter) //for digital lead form
app.use('/products', productRouter)

app.listen(port, hostName, (err) => {
   if (err) throw err
   console.log(`server is listening to`, (chalk.bgGray(`http://${hostName}:${port}`)));
})