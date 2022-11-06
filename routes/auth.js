const express = require("express");
const router = express.Router();

const {signup,signin,signout,sendRegisterOTP,verifyOTP,makeAdmin,removeFromAdmin} = require("../controller/auth");
const { userSignupValidator } = require("../validators/index");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.post("/sendOTP/reisterOTP", sendRegisterOTP);
router.post("/sendOTP/verifyOTP", verifyOTP);
router.get("/signout", signout);
router.post("/auth/makeAdmin/:id", makeAdmin);
router.post("/auth/removeAdmin/:id", removeFromAdmin);
module.exports = router;