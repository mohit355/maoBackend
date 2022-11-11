const express = require("express");
const router = express.Router();
const {getAllDiscounts,getDiscountById,addDiscount,updateDiscount,deleteDiscount,getDiscountByOrderPriceRange} = require("../controller/discount");
const auth= require("../middleware/auth")
const {isAdmin}= require("../validators/index")

router.get("/discount/all", getAllDiscounts);
router.get("/discount/:id", getDiscountById);
router.post("/discount/discountByOrderPrice", getDiscountByOrderPriceRange);
router.post("/discount/add", auth,isAdmin,addDiscount);
router.post("/discount/update/:id", auth,isAdmin,updateDiscount);
router.delete("/discount/delete/:id", auth,isAdmin,deleteDiscount);
module.exports = router;