import express from "express"
const router = express.Router()

import {viewCategory,
        allCategories,
        viewProduct,
        allMedicines,
        allProductCategories,
        showBySearch,
        imageOfProduct,
        Search} from "../controllers/productController"

import {getUserById,
        getProductById,
        getCategoryById} from "../helpers/findById"

router.param('userId',getUserById)
router.param('productId',getProductById)
router.param('categoryId',getCategoryById)

router.get('/category/:categoryId',viewCategory)
router.get('/categories',allCategories)

router.get('/product/:productId',viewProduct)
router.get('/products',allMedicines)
router.get('/products/categories',allProductCategories)
router.get('/product/photo/:productId',imageOfProduct)
//we are using request body in this so i created it as post method 
router.post("/products/by/search", showBySearch);
router.get("/products/search", Search);

module.exports = router