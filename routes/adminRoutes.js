import express from "express"
const router = express.Router()

import {addNewCategory,
        addProduct,
        removeProduct,
        updateProduct,
        deleteCategory} from "../controllers/productController"

import {loggedIn,currentUser,Admin} from "../middleware/auth"

import {getUserById,
        getProductById,
        getCategoryById} from "../helpers/findById"

router.param('userId',getUserById)
router.param('productId',getProductById)
router.param('categoryId',getCategoryById)

// for categories
router.post('/category/create/:userId',loggedIn,currentUser,Admin,addNewCategory)
router.delete('/category/:categoryId/:userId',loggedIn,currentUser,Admin,deleteCategory)

// for products
router.post('/product/add/:userId',loggedIn,currentUser,Admin,addProduct)
router.delete('/product/:productId/:userId',loggedIn,currentUser,Admin,removeProduct)
router.put('/product/:productId/:userId',loggedIn,currentUser,Admin,updateProduct)
module.exports = router