const express =require('express')
const bl = require('./UsersRepository.js')
const router =express()
router.use(express.json())

//Route To generate Auth token
router.post('/login',bl.GenerateToken)
//Route To get All the users details
router.get('/',bl.Authenticate,bl.Getuser)

//Route To get Users by ID
router.get('/:id',bl.Authenticate,bl.GetUserBId)

//Route To Create an User in the database
router.post('/create',bl.Authenticate,bl.Createuser)

//Route To Update the user Information
router.put('/update/:id',bl.Authenticate,bl.Edituser)

//Route To delete an User
router.delete('/delete/:id',bl.Authenticate,bl.Deleteuser)




module.exports = router