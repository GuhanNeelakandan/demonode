const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const authorizeForAdmin = require("../middleware/authorizeForAdmin");
const { newOrder, allOrder, deleteOrder, adminOrders } = require("../Controller/order.controller");


router.post('/new/order',auth,newOrder);
router.post('/all/order',auth,allOrder);
router.post('/admin/all/order',authorizeForAdmin,adminOrders);
router.post('/delete/order',authorizeForAdmin,deleteOrder);

module.exports=router