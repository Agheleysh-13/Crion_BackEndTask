const mongoose = require('mongoose')

//Schema of the User in the Users collection
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        requiured:true
    },
    email:{
        type:String,
        requiured:true
    },
    password:{
        type:String,
        requuired:true
    }
},
{timestamps:true})


module.exports = mongoose.model('User',UserSchema)