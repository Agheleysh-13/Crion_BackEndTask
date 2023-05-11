// Requiring module
// require('dotenv').config()
const express = require('express');
const mongoose =require('mongoose')
const app = express();


const userrouter= require('./UsersController')
app.use('/User',userrouter)
const URl=process.env.DB_URL

//Function to establish MongoDb connection
async function connect(){
    try{
        console.log("Into Connection")
         await mongoose.connect(URl);
         const dbcon =mongoose.connection
         dbcon.on('error',(error)=>console.error(error))
        dbcon.once('open',()=>console.log('Connection established sccessfully'))
        
    } catch(error){
        console.log('errorOccured',error)
        console.error(error)
    }
}
connect();
console.log("process.env.port",process.env.PORT)

const port = process.env.PORT ||5000;
app.listen(port,console.log(`Server started on port ${port}`));

module.exports = mongoose
