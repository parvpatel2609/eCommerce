import { comparePassword, hashedPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import adminModel from "../models/adminModel.js";
import JWT from "jsonwebtoken";
import { transporter } from "./mailSender.js";
import { generateRandomNumber, isExpired } from "./randomNumberGenerate.js";
import { uploadOnCloudinary } from "../helpers/cloudinary.js";


export const registerController = async (req, res) => {
    try {
        // console.log("File: ", req.file);
        //validation
        if (!req.body.name) {
            return res.send({ error: "Name is Required" });
        }
        if (!req.body.email) {
            return res.send({ error: "email is Required" });
        }
        if (!req.body.password) {
            return res.send({ error: "password is Required" });
        }
        if (!req.file) {
            return res.send({ error: "No File is uploaded" });
        }

        //check user is exist or not 
        const existting_user = await userModel.findOne({ email: req.body.email });

        if (existting_user) {
            return res.status(200).send({
                success: false,
                message: 'User Already Exists'
            });
        }

        //hashedPassword before store in database the user
        const hashPassword = await hashedPassword(req.body.password);

        // console.log("File Path to start uploading in serevr: ", req.file.path);
        const upload = await uploadOnCloudinary(req.file.path);
        // console.log("After uploading photo to cloud url of it is : ", upload?.secure_url);

        //save the user in database
        const user = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            address: req.body.address,
            phone: req.body.phone, 
            photo: upload?.secure_url
        });
        user.save();

        //sending success response
        res.status(201).send({
            success: true,
            message: "User register successfully",
            user
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error
        });
    }
}

export const adminregisterController = async (req, res) => {
    try {
        //validation
        if (!req.body.name) {
            return res.send({ error: "Name is Required" });
        }
        if (!req.body.email) {
            return res.send({ error: "email is Required" });
        }
        if (!req.body.password) {
            return res.send({ error: "password is Required" });
        }

        //checking admin is exist or not 
        const exsittingadmin = await adminModel.findOne({ email: req.body.email });

        if (exsittingadmin) {
            return res.status(200).send({
                success: false,
                message: "Admin already exists"
            });
        }

        //hashedPassword before store in database the admin
        const hashPassword = await hashedPassword(req.body.password);

        const admin = await adminModel({

            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        });

        //save admin data using save function
        admin.save();

        //sending success response
        res.status(201).send({
            success: true,
            message: "Admin register successfully",
            admin
        });

    }
    catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error in admin registration",
            error
        });
    }
}

export const loginController = async (req, res) => {
    try {
        //validation
        if (!req.body.email || !req.body.password) {
            // console.log(req.body.email + " " + req.body.password);
            return res.send({ success: false, message: "email or password is invalid" });
        }

        //check it is a User or Admin 
        const check_user = await userModel.findOne({ email: req.body.email });
        const check_admin = await adminModel.findOne({ email: req.body.email });

        if (check_user != null) {
            const match = await comparePassword(req.body.password, check_user.password);
            if (!match) {
                return res.status(200).send({
                    success: false,
                    message: "Invalid user password"
                });
            }

            //assign token
            const token = JWT.sign({ _id: check_user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

            // console.log(check_user);

            //after assign token than send response to frontend
            res.status(200).send({
                success: true,
                message: "Login successfully with user account",
                check_user: {
                    role: check_user.role,
                    name: check_user.name,
                    email: check_user.email,
                    photo: check_user.photo
                },
                token
            });
        }

        else if (check_admin != null) {
            const match = await comparePassword(req.body.password, check_admin.password);
            if (!match) {
                return res.status(200).send({
                    success: false,
                    message: "Invalid admin password"
                });
            }

            //assign token
            const token = JWT.sign({ _id: check_admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            //after assign token than send response to frontend
            res.status(200).send({
                success: true,
                message: "Login successfully with user account",
                check_user: {
                    role: check_admin.role,
                    name: check_admin.name,
                    email: check_admin.email
                },
                token
            });
        }

        else {
            return res.status(401).send({
                success: false,
                message: "Email is not registered"
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error in login",
            error
        });
    }
}

//forgotPassword Controller
let randNumber;
const map = new Map();
export const forgotPasswordController = async (req, res) => {
    try {
        if (!req.body.email) {
            res.status(400).send({ message: "Register email id is required" });
        }

        //check user & admin
        const user = await userModel.findOne({ email: req.body.email });
        const admin = await adminModel.findOne({ email: req.body.email });

        if (!user && !admin) {
            return res.status(404).send({
                success: false,
                message: "User or Admin not found"
            });
        }
        else if (user) {
            // console.log(req.body.email);
            const startTime = Date.now();
            randNumber = generateRandomNumber();
            console.log("Random Number: " + randNumber);

            // Define the email options
            const mailOptions = {
                from: 'unims2407@gmail.com',
                to: req.body.email,
                subject: 'Reset Password OTP of your Amazon Ecommerce App',
                text: `Hello, I hope you are fine. Your reset password otp is: ${randNumber}. OTP is experied in 2 minutes.`
            };

            //send mail
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });

            let exp = false;
            //expired otp error with countdown
            const interval = setInterval(function () {
                if (isExpired(startTime)) {
                    clearInterval(interval);
                    console.log("The OTP has expired.");
                    randNumber = 0;
                    exp = true;
                }
            }, 1000);

            if (exp) {
                return res.status(404).send({
                    success: false,
                    message: "OTP is expired. Please try again after sometime."
                });
            }
            const email = req.body.email;
            map.set(req.body.email, randNumber);
            return res.status(200).send({
                success: true,
                message: "OTP send successfully in your entered account id",
                email
            });
        }
        else {
            const startTime = Date.now();
            randNumber = generateRandomNumber();
            console.log("Random Number: " + randNumber);

            // Define the email options
            const mailOptions = {
                from: 'unims2407@gmail.com',
                to: req.body.email,
                subject: 'Reset Password OTP of your Amazon Ecommerce App',
                text: `Hello, I hope you are fine. Your reset password otp is: ${randNumber}. OTP is experied in 2 minutes.`
            };

            //send mail
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Email sent: ' + info.response);
                }
            });

            let exp = false;
            //expired otp error with countdown
            const interval = setInterval(function () {
                if (isExpired(startTime)) {
                    clearInterval(interval);
                    console.log("The OTP has expired.");
                    randNumber = 0;
                    exp = true;
                }
            }, 1000);

            if (exp) {
                return res.status(404).send({
                    success: false,
                    message: "OTP is expired. Please try again after sometime."
                });
            }
            const email = req.body.email;
            map.set(req.body.email, randNumber);
            return res.status(200).send({
                success: true,
                message: "OTP send successfully in your entered account id",
                email
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error in forgot password page",
            error
        });
    }
}

export const otpController = async (req, res) => {
    try {
        // console.log(map);
        // console.log(req.body);
        console.log("Receive mail: ", req.body.email, " Here received OTP: ", req.body.otp);
        if (map.has(req.body.email)) {
            if (map.get(req.body.email) == req.body.otp) {
                map.delete(req.body.email);
                res.status(200).send({
                    success: true,
                    message: "OTP is perfect",
                    randNumber
                });
            }
            else {
                res.status(206).send({
                    success: false,
                    message: "OTP is wrong"
                });
            }
        }
        else {
            console.log(error);
            res.status(401).send({
                success: false,
                message: "Password of this account request not found.",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(405).send({
            success: false,
            message: "Something went wrong in otp checking"
        });
    }
}

export const updatePasswordController = async (req, res) => {
    try {
        if (!req.body.email) {
            res.status(400).send({ message: "Register email id is required" });
        }
        if (!req.body.password) {
            res.status(400).send({ message: "Password field is required to update the password" });
        }

        //check user & admin
        const user = await userModel.findOne({ email: req.body.email });
        const admin = await adminModel.findOne({ email: req.body.email });

        if (!user && !admin) {
            return res.status(404).send({
                success: false,
                message: "User or Admin not found"
            });
        }

        //updaring user password
        else if (user) {
            const hashPassword = await hashedPassword(req.body.password);
            await userModel.updateOne({ email: req.body.email }, { password: hashPassword });

            res.status(200).send({
                success: true,
                message: "Password reseted successfully in User account"
            });
        }

        //updating admin password
        else {
            const hashPassword = await hashedPassword(req.body.password);
            await adminModel.updateOne({ email: req.body.email }, { password: hashPassword });

            res.status(200).send({
                success: true,
                message: "Password reseted successfully in User account"
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(405).send({
            success: false,
            message: "Something went wrong in updating password"
        });
    }
} 