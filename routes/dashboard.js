const express = require("express");
const router = express.Router();
const {getDashboard} = require("../controller/dashboard");
const auth= require("../middleware/auth")
const {isAdmin}= require("../validators/index")

router.get("/dashboard/all",auth,isAdmin, getDashboard);
module.exports = router;