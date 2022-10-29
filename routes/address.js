const express = require("express");
const router = express.Router();
const {getAddressById,getAllAddressByUserId,addAddress,updateAddress,DeleteAddress} = require("../controller/address");
// const auth= require("../middleware/auth")
// const {isAdmin}= require("../validators/index")

router.get("/address/getByUserId/:userId", getAllAddressByUserId);
router.get("/address/getById/:id", getAddressById);
router.post("/address/add", addAddress);
router.post("/address/update/:id", updateAddress);
router.post("/address/delete/:id", DeleteAddress);

module.exports = router;