import express from "express"
const router = express.Router()

import {userProfile,profileUpdate,myOrders} from "../controllers/userController"
import {loggedIn,currentUser} from "../middleware/auth"
import {getUserById} from "../helpers/findById"



router.param('userId',getUserById)


router.get('/user/:userId',loggedIn,currentUser,userProfile)

router.put('/user/:userId',loggedIn,currentUser,profileUpdate)

router.get('/orders/by/user/:userId',loggedIn,currentUser,myOrders)



module.exports = router