import express from "express";
import { adminregisterController, forgotPasswordController, loginController, otpController, registerController, updatePasswordController } from "../controllers/authController.js"
import { isAdmin, requireSignin } from './../middlewares/authMiddleware.js';
import { upload } from "../middlewares/multer_middleware.js";

//router object
const router = express.Router();

//Routing

//User Register || Post Method
router.post("/register", upload.single("photo"), async (req, res, next) => {
    if (req.file) {
        next();
        // console.log("Body: ", req.body);
        // res.json({
        //     message: 'File uploaded successfully',
        //     file: req.file
        // });
    } 
    else {
        res.status(400).send('No file uploaded.');
    }
} , registerController);

//Admin Register || Post Method
router.post("/register/admin", adminregisterController);

//Login || Post Method
router.post("/login", loginController);

//forgot-password || Post Method
router.post("/forgot-password", forgotPasswordController);

//compare OTP route
router.post("/compareOTP", otpController);

//updatePassword route || Post Method
router.post("/update-password", updatePasswordController);


//Protectec route auth
router.get("/user-auth", requireSignin, (req, res) => {
    res.status(200).send({ ok: true });
});

//Protectec route auth for admin
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});


export default router;