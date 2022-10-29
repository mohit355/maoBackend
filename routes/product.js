const express = require("express");
const router = express.Router();
const {getProductById,getAllProduct,getProductByType,addProduct,updateProduct,deleteProduct} = require("../controller/auth");
const auth= require("../middleware/auth")
const {isAdmin}= require("../validators/index")

router.get("/product",auth, getAllProduct);
router.get("/product/:id",auth, getProductById);
router.post("/product/add", auth,isAdmin,addProduct);
router.post("/product/update",auth,isAdmin, updateProduct);
router.post("/product/delete",auth,isAdmin, deleteProduct);
router.param("userId",auth, userById);
module.exports = router;