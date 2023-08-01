const express = require("express");
const router = express.Router();

const {signup,signin,signout,sendRegisterOTP,verifyOTP,makeAdmin,removeFromAdmin,getMe,deleteUser,getAllAdminList} = require("../controller/auth");
const { userSignupValidator } = require("../validators/index");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/auth/me", getMe);
router.post("/sendOTP/reisterOTP", sendRegisterOTP);
router.post("/sendOTP/verifyOTP", verifyOTP);
router.get("/signout", signout);
router.post("/auth/makeAdmin/:id", makeAdmin);
router.post("/auth/removeAdmin/:id", removeFromAdmin);
router.post("/auth/deleteUser/:id", deleteUser);
router.get("/auth/admin/all", getAllAdminList);
module.exports = router;