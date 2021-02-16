import express from "express"
const router = express.Router()

import {getUserById,getOrderById} from "../helpers/findById"
import {loggedIn,currentUser,Admin} from "../middleware/auth"
import {newOrder,
    newOrderForUser,
    quantityHandler,
    getAllOrders,
    getStatus,
    updateOrder} from "../controllers/orderController"

router.param('userId',getUserById)
router.param('orderId',getOrderById)


router.post('/order/create/:userId',loggedIn
,currentUser,
newOrderForUser,
quantityHandler,
newOrder)

router.get('/order/list/:userId',loggedIn,
currentUser,
Admin,
getAllOrders)

router.get('/order/status-values/:userId',loggedIn,
currentUser,
Admin,
getStatus)

router.put('/order/:orderId/status/:userId',loggedIn,
currentUser,
Admin,
updateOrder)



module.exports = router