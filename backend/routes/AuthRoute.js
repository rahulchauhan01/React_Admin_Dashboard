import express from "express";
import {createUser,userChangePassword,userLogin} from "../controller/AuthController.js";
import checkAuth from "../middleware/checkAuth.js";
// import {verifyToken} from '../middleware/jwtToken.js'
const router =express.Router();


router.post("/signup",createUser);
router.post("/login",userLogin)
router.post("/change-password",[checkAuth],userChangePassword)


export default router;