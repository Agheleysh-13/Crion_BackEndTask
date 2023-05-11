const userInfo = require('./Models/UserModel')
const jwt = require('jsonwebtoken')
const connect = require('./index')
require('dotenv').config()



//To generate accessToken for the API's
const GenerateToken = (req, res, nex) => {
  const username = req.body.name
  const user = { name: username }
  const accesstoken = jwt.sign(user, process.env.Access_token_Secret)
  res.json({ accesstoken: accesstoken })
}

//Function to authenticate the auth_token
function Authenticate(req, res, next) {
  var authHead;
  if (req.headers['authorization'] != undefined) {
    authHead = req.headers['authorization']
  } else {
    return res.status(401).json({ Message: "Invalid Token" })
  }
  const token = authHead != null ? authHead.split(' ')[1] : undefined

  if (!token) { return res.status(401) }
  jwt.verify(token, process.env.Access_token_Secret, (err, user) => {
    if (err) {
      return res.status(403).json({ Message: "Invalid Token" })
    }
    console.log(user)
    next()
  })
}

//Function to get the User Summary
const Getuser = async (req, res) => {
  try {
    const Users = await userInfo.find({})
    console.log(Users)
    connect.connection.close()
    res.status(200).json(Users)
  }
  catch (error) {
    console.log('error', error.message)
    connect.connection.close()
    res.status(500).json({ message: error.message })
  }
}

//Function to get info on a User by id
const GetUserBId = async (req, res) => {
  if (req.params.id.length < 24) {
    connect.connection.close()
    res.status(400).json({ Message: "Bad Request,Invaild ID for an user" })
  }
  const { id } = req.params
  console.log('id', id.length)
  try {
    const User = await userInfo.findById(id)
    console.log(User)
    if (!User) {
      connect.connection.close()
      res.status(404).json({ Message: "User Not Found" })
    }
    connect.connection.close()
    res.status(200).json(User)
  }
  catch (error) {
    console.log('error', error.message)
    connect.connection.close()
    res.status(500).json({ message: error.message })
  }
}

//To create an user in the database
const Createuser = async (req, res) => {
  try {
    console.log('request received', req.body)
    const newUser = await userInfo.create(req.body)
    connect.connection.close()
    res.status(200).json(newUser)
  } catch (error) {
    console.log(error.message)
    connect.connection.close()
    res.status(400).json({ message: error.message })
  }
}

//To edit user details
const Edituser = async (req, res) => {
  if (req.params.id.length < 24) {
    connect.connection.close()
    res.status(400).json({ Message: "Bad Request,Invaild ID for an user" })
  }
  const { id } = req.params
  console.log('id', id)
  try {
    console.log('request received', req.body)
    await userInfo.findByIdAndUpdate(id, req.body)
    const updatedUser = await userInfo.findById(id)
    connect.connection.close()
    if (!updatedUser) {
     connect.connection.close()
      res.status(404).json({ Message: "User Not Found" })
    }
    res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error.message)
    connect.connection.close()
    res.status(500).json({ message: error.message })
  }
}

//To delte a user from database
const Deleteuser = async (req, res) => {
  console.log('delete API')
  if (req.params.id.length < 24) {
    connect.connection.close()
    res.status(400).json({ Message: "Bad Request,Invaild ID for an user" })
  }
  const { id } = req.params
  console.log('id', id)
  try {
    const deleteuser = await userInfo.findByIdAndDelete(id)
    if (!deleteuser) {
      connect.connection.close()
      res.status(404).json({ Message: "User Not Found" })
    }
    res.status(200).json(deleteuser)
  } catch (error) {
    connect.connection.close()
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}
module.exports = { GetUserBId, Getuser, Createuser, Edituser, Deleteuser, GenerateToken, Authenticate }



