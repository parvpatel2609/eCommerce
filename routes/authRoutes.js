import express from "express";
import {adminregisterController, forgotPasswordController, loginController, registerController} from "../controllers/authController.js"
import { isAdmin, requireSignin } from './../middlewares/authMiddleware.js';

//router object
const router = express.Router();

//Routing

//User Register || Post Method
router.post("/register", registerController);

//Admin Register || Post Method
router.post("/register/admin", adminregisterController);

//Login || Post Method
router.post("/login", loginController);

//forgot-password || Post Method
router.post("/forgot-password", forgotPasswordController);


//Protectec route auth
router.get("/user-auth", requireSignin, (req, res)=> {
    res.status(200).send({ok:true});
});

//Protectec route auth for admin
router.get("/admin-auth", requireSignin, isAdmin, (req, res)=> {
    res.status(200).send({ok:true});
});


export default router;