const express=require("express")
const router=express.Router()
const authcontroller=require('../controllers/auth.controller.js')
const {getProfile}=require('../controllers/courses.controller.js')
const  authMiddleware=require("../middleware/auth.middleware")
router.post("/signup", authcontroller.signup)

router.post("/login", authcontroller.login);

router.get("/logout",authcontroller.logout);
router.get("/get-profile",
    authMiddleware.authMiddleware ,
    getProfile);

module.exports=router
