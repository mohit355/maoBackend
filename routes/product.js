const express = require("express");
const router = express.Router();
const {getProductById,getAllProduct,getAllAdminViewProduct,addProduct,updateProduct,deleteProduct} = require("../controller/product");
const auth= require("../middleware/auth")
const {isAdmin}= require("../validators/index")

router.get("/product/all", getAllProduct);
router.get("/admin/product/all",auth,isAdmin, getAllAdminViewProduct);
router.get("/product/:id", getProductById);
router.post("/product/add", auth,isAdmin,addProduct);
router.post("/product/update/:id",auth,isAdmin, updateProduct);
router.delete("/product/delete/:id",auth,isAdmin, deleteProduct);
module.exports = router;