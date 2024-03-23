import mongoose from "mongoose";

//admin data model
const adminSchema = new mongoose.Schema({
    role: {
        type: String,
        default: "admin"
    },
    name:{
        type:String,
        required:true,
        lowercase: true
    },
    email:{
        type: String,
        unique: true,       //email should be unique for every admin
        required: [true,"Please provide your email address"],
        lowercase: true
    },
    password:{
        type:String,
        required:[true,"Please provide a password"]
    },
    profile_photo:{
        data: Buffer,
        type: String,
        image: String
    }
});

export default mongoose.model('admins',adminSchema);