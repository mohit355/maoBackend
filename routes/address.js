const express = require("express");
const router = express.Router();
const {getAddressById,getAllAddressByUserId,addAddress,updateAddress,DeleteAddress} = require("../controller/address");
const auth= require("../middleware/auth")
// const {isAdmin}= require("../validators/index")

router.get("/address/getByUserId/:userId",auth, getAllAddressByUserId);
router.get("/address/getById/:id",auth, getAddressById);
router.post("/address/add",auth, addAddress);
router.post("/address/update/:id",auth, updateAddress);
router.delete("/address/delete/:id",auth, DeleteAddress);

module.exports = router;