import JWT from 'jsonwebtoken';
import adminModel from '../models/adminModel.js';

//Protected routes token base
export const requireSignin = async(req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization,process.env.JWT_SECRET);
        req.user = decode;
        next();
    } 
    catch (error) {
        console.log(error);    
    }
}

//admin access
export const isAdmin = async(req, res, next) => {
    try {
        // console.log("user id: "+ req.user._id);
        const admin = await adminModel.findById(req.user._id);
        console.log("admin: "+admin);
        if(admin==null){
            res.send({
                status:401,
                success: false,
                message: "Unauthorized access admin through normal user"
            });
        }
        else if(admin.role != "admin"){
            res.send({
                status:401,
                success: false,
                message: "Unauthorized access admin"
            });
        }
        else{
            next();
        }
    } 
    catch (error) {
        console.log(error);   
        res.status(402).send({
            success: false,
            error,
            message: "Error in admin middleware"
        }); 
    }
}