const express = require("express");
const authorizeForAdmin = require("../middleware/authorizeForAdmin");
const { newProduct, allProducts, editProduct, deleteProduct } = require("../Controller/product.controller");
const router = express.Router();


router.post('/new/product',authorizeForAdmin,newProduct);
router.post('/all/product',allProducts);
router.post('/edit/product',authorizeForAdmin,editProduct);
router.post('/delete/product',authorizeForAdmin,deleteProduct);

module.exports=router