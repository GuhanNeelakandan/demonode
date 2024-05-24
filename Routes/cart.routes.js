const express = require("express");
const { newCart, allCart, deleteCart } = require("../Controller/cart.controller");
const router = express.Router();
const auth = require("../middleware/auth");


router.post('/new/cart',newCart);
router.post('/all/cart',auth,allCart);
router.post('/delete/cart',deleteCart);

module.exports=router