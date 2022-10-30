const express = require("express");
const router = express.Router();
const {getOrderById,getAllOrders,createOrder} = require("../controller/order");
const auth= require("../middleware/auth")
const {isAdmin}= require("../validators/index")

router.get("/order/all",auth, getAllOrders);
router.get("/order/:id",auth,isAdmin, getOrderById);
router.post("/order/add", auth,createOrder);
module.exports = router;