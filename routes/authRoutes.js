import express from "express"
const router = express.Router()
import authController from "../controllers/authController"
import {userDataValidation} from "../validations/dataValidator"
import {loggedIn} from "../middleware/auth"



router.post('/register',userDataValidation,authController.register)
router.post('/login',authController.login)
router.get('/logout',authController.logout)
router.get('/hi',loggedIn,(req,res)=>{
    res.send('hi')
})


module.exports = router